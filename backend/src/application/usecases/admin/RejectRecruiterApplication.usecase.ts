import { inject, injectable } from "tsyringe";
import IRejectRecruiterApplication from "../../interfaces/usecases/admin/IRejectRecruiterApplication.usecase";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import { RecruiterDTO } from "../../DTOs/recruiter/recruiter.dto";
import IEmailService from "../../interfaces/services/IEmailService";
import RejectRecruiterApplicationDTO from "../../DTOs/admin/rejectRecruiter.dto";

@injectable()
export default class RejectRecruiterApplicationUsecase implements IRejectRecruiterApplication {
    constructor(
        @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo,
        @inject('IEmailService') private _emailService: IEmailService
    ) {}

    async execute(rejectRecruiterApplicationDto: RejectRecruiterApplicationDTO): Promise<RecruiterDTO | null> {
        const {id, reason} = rejectRecruiterApplicationDto
        
        const subject = 'Application Not Approved'
        const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update on Your Aspiro Recruiter Application</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #d9534f;">Update on Your Aspiro Recruiter Application</h2>
        <p>Dear [Recruiter Name],</p>
        <p>Thank you for your interest in becoming a recruiter on the Aspiro platform and for taking the time to submit your application.</p>
        <p>After a careful review, we regret to inform you that we are unable to approve your application at this time. Our review process is designed to ensure all recruiters on our platform meet specific criteria to maintain the quality and integrity of our network.</p>
        <p>The primary reason for this decision is: <strong>${reason}</strong></p>
        <p>Common reasons for non-approval include incomplete profiles, unverified professional credentials, or a mismatch with our current industry focus. We encourage you to review your profile and consider reapplying in the future.</p>
        <p>You will be eligible to submit a new application after 30 days.</p>
        <p>We wish you the best in your professional endeavors.</p>
        <p>Sincerely,</p>
        <p><strong>The Aspiro Team</strong></p>
    </div>
</body>
</html>`
        try {
            const updatedRecruiter = await this._recruiterRepo.update(id, {
                profileStatus:'rejected'
            })

            if (updatedRecruiter) {
                // Assuming you have a way to get the recruiter's email and name from the updatedRecruiter object
                // For example: const recruiterEmail = updatedRecruiter.userProfile.email;
                // await this._emailService.sendEmail(recruiterEmail, subject, body);
                const recruiterDetails = await this._recruiterRepo.getRecruiterProfileOverview(id)
                const email = recruiterDetails?.userProfile.email

                if(email){
                    await this._emailService.sendEmail(email, subject, body)
                }

                return updatedRecruiter as RecruiterDTO;
            }

            return null
        } catch (error: unknown) {
            // It's a good practice to log the error
            console.error("Error in RejectRecruiterApplicationUsecase:", error);
            throw new Error('Failed to reject recruiter application.');
        }
    }
}