import mongoose from "mongoose";
import JobApplication from "../../domain/entities/candidate/jobApplication";
import IJobApplicationRepo from "../../domain/interfaces/IJobApplicationRepo";
import { createJobApplicationFromDTO } from "../../domain/mappers/candidate/jobApplicationMapper";
import { JobApplicationSchema } from "../../presentation/controllers/dtos/candidate/jobApplicationDTO";
import ISaveJobApplicationUseCase from "./candidate/interface/ISaveJobApplicationUseCase";

export default class SaveJobApplicationUseCase implements ISaveJobApplicationUseCase {
    constructor(private _iJobApplicationRepo : IJobApplicationRepo){}

    async execute(jobApplication : JobApplication, jobId : string, candidateId : string, resumeId : string) : Promise<string | null> {
        console.log('Request reached here for saving job application')
        const parsedJobApplication = JobApplicationSchema.parse(jobApplication)
        const jobApplicationModal = createJobApplicationFromDTO(parsedJobApplication)
        jobApplicationModal.candidateId = new mongoose.Types.ObjectId(candidateId)
        jobApplicationModal.jobId = new mongoose.Types.ObjectId(jobId)
        jobApplicationModal.resumeId = new mongoose.Types.ObjectId(resumeId)
        console.log('Everything is working fine going to call the createFunction', jobApplicationModal)

        const result = await this._iJobApplicationRepo.create(jobApplicationModal)
        return result
    }
}