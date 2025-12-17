import { inject, injectable } from "tsyringe";
import IApproveRecruiterApplicationUsecase from "../../interfaces/usecases/admin/IApproveRecruiterApplication.usecase";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import IEmailService from "../../interfaces/services/IEmailService";
import { RecruiterDTO } from "../../DTOs/recruiter/recruiter.dto";

@injectable()
export default class ApproveRecruiterApplicationUsecase implements IApproveRecruiterApplicationUsecase {
    constructor(
        @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo,
        @inject('IEmailService') private _emailService: IEmailService
    ) {}

    async execute(id: string): Promise<RecruiterDTO | null> {
        const subject = 'Application Approved'
        const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Aspiro!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #28a745;">Welcome to the Aspiro Recruiter Network!</h2>
        <p>Dear [Recruiter Name],</p>
        <p>Congratulations! We are thrilled to inform you that your application to become a recruiter on the Aspiro platform has been approved.</p>
        <p>Your profile is now active, and you have full access to our suite of powerful recruitment tools. You can now start connecting with top-tier talent right away.</p>
        <h3 style="color: #333;">What's Next?</h3>
        <p>Here are a few things you can do to get started:</p>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Post Your First Job:</strong> Start attracting candidates by posting your open roles.</li>
            <li style="margin-bottom: 10px;"><strong>Explore Your Dashboard:</strong> Familiarize yourself with your dashboard to manage jobs and applications seamlessly.</li>
        </ul>
        <p style="text-align: center; margin: 30px 0;">
            <a href="[Your-Dashboard-Link]" style="background-color: #007bff; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Your Dashboard</a>
        </p>
        <p>We are excited to have you on board and look forward to helping you find the perfect candidates.</p>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        <p>Best regards,</p>
        <p><strong>The Aspiro Team</strong></p>
    </div>
</body>
</html>`
        try {
            const updatedRecruiter = await this._recruiterRepo.update(id, { profileStatus: 'approved' });
            if (updatedRecruiter) {
                const recruiterDetails = await this._recruiterRepo.getRecruiterProfileOverview(id);
                const email = recruiterDetails?.userProfile.email;
                const personalizedBody = body.replace('[Recruiter Name]', recruiterDetails?.userProfile.name || 'Recruiter');
                if (email) {
                    await this._emailService.sendEmail(email, subject, personalizedBody);
                }
                return updatedRecruiter as RecruiterDTO;
            }
            return null;
        } catch (error) {
            console.error("Error in ApproveRecruiterApplicationUsecase:", error);
            throw new Error('Failed to approve recruiter application.');
        }
    }
}