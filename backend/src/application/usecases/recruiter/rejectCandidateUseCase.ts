import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";
import { JobApplicationDTO } from "../../DTOs/candidate/jobApplicationDTO";
import mapToJobApplicationDTOFromJobApplication from "../../mappers/candidate/mapToJobApplicationDTOFromJobApplication";
import IRejectCandidateUseCase from "./interface/IRejectCandidateUseCase";

export default class RejectCandidateUseCase implements IRejectCandidateUseCase {
    constructor(private _jobApplicationRepo : IJobApplicationRepo){}

    async execute(applicationId: string): Promise<JobApplicationDTO | null> {
        const rejectResult = await this._jobApplicationRepo.rejectJobApplication(applicationId)
        if(rejectResult){
            const dto = mapToJobApplicationDTOFromJobApplication(rejectResult)
            return dto
        }
        return null
    }
}