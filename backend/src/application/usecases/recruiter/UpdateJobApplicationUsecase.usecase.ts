import { inject, injectable } from "tsyringe";
import IUpdateJobApplicationStatusUsecase from "../../interfaces/usecases/recruiter/IUpdateJobApplicationStatus.usecase";
import { JobApplicationDTO } from "../../DTOs/candidate -LEGACY/jobApplication.dto";
import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";
import mapToJobApplicationDTOFromJobApplication from "../../mappers/user/mapToJobApplicationDTOFromJobApplication.mapper";
import IEmailService from "../../interfaces/services/IEmailService";
import generatedAutomatedEmailContent from "../../Services/automatedEmail.templates";
import UpdateJobApplicationStatusDTO from "../../DTOs/recruiter/UpdateJobApplicationStatus.dto";

@injectable()
export default class UpdateJobApplicationStatusUsecase implements IUpdateJobApplicationStatusUsecase {
    constructor(
        @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo,
        @inject('IEmailService') private _emailService: IEmailService
    ){}
    async execute(updateJobApplicationDto: UpdateJobApplicationStatusDTO): Promise<JobApplicationDTO | null> {
        const {_id, status, candidateEmail, candidateName, jobTitle}: any = updateJobApplicationDto

        try {
            const updatedJobApplication = await this._repo.update(_id as string, {status:status})
    
            if(updatedJobApplication){
                //send status updated email
                const {subject, body} = generatedAutomatedEmailContent(jobTitle, candidateName, status)
                await this._emailService.sendEmail(candidateEmail, subject, body)
                const dto = mapToJobApplicationDTOFromJobApplication(updatedJobApplication)
                return dto
            }
        } catch (error: unknown) {
            throw error
        }

        return null
    }
}