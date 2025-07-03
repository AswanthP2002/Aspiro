import mongoose from "mongoose";
import JobApplication from "../../domain/entities/candidate/jobApplication";
import IJobApplicationRepo from "../../domain/interfaces/IJobApplicationRepo";
import { createJobApplicationFromDTO } from "../../domain/mappers/candidate/jobApplicationMapper";
import { JobApplicationSchema } from "../../presentation/controllers/dtos/candidate/jobApplicationDTO";

export default class SaveJobApplicationUseCase {
    constructor(private _iJobApplicationRepo : IJobApplicationRepo){}

    async execute(jobApplication : JobApplication, jobId : string, candidateId : string) : Promise<boolean> {
        const parsedJobApplication = JobApplicationSchema.parse(jobApplication)
        const jobApplicationModal = createJobApplicationFromDTO(parsedJobApplication)
        jobApplicationModal.candidateId = new mongoose.Types.ObjectId(candidateId)
        jobApplicationModal.jobId = new mongoose.Types.ObjectId(jobId)

        const result = await this._iJobApplicationRepo.saveJobApplication(jobApplicationModal)
        return result
    }
}