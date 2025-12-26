import { inject, injectable } from "tsyringe";
import IUpdateCandidateNotes from "../../interfaces/usecases/recruiter/IUpdateCandidateNotes.usecase";
import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";
import { JobApplicationDTO } from "../../DTOs/candidate -LEGACY/jobApplication.dto.FIX";
import mapToJobApplicationDTOFromJobApplication from "../../mappers/user/mapToJobApplicationDTOFromJobApplication.mapper";

@injectable()
export default class UpdateCandidateNotesUsecase implements IUpdateCandidateNotes {
    constructor(
        @inject('IJobApplicationRepository') private _repo: IJobApplicationRepo
    ){}

    async execute(dto: JobApplicationDTO): Promise<JobApplicationDTO | null> {
        const {notes, _id} = dto

        const updatedApplication = await this._repo.update(_id as string, {notes}) //changed update argument partial in the repo
        if(updatedApplication){
            const dto = mapToJobApplicationDTOFromJobApplication(updatedApplication)
            return dto
        }

        return null
    }
}