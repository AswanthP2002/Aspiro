import Job from "../../domain/entities/job";
import IJobRepo from "../../domain/interfaces/IJobRepo";
import { ObjectId } from "mongodb";
import { CreateJobDTO, CreateJobSchema } from "../../presentation/controllers/dtos/jobDTO";
import { createJobFromDTO } from "../../domain/mappers/jobMapper";


export default class CreateJobUseCase {
    constructor(private jobRepo : IJobRepo){}

    async execute(id : string, job : CreateJobDTO) : Promise<string> {
        const validateJob = CreateJobSchema.parse(job)
        const jobModel = createJobFromDTO(validateJob)
        jobModel.companyId = new ObjectId(id)
        jobModel.createdAt = new Date()
        if (jobModel.expiresAt) {
            jobModel.expiresAt = new Date(jobModel.expiresAt);
        } else {
 
            jobModel.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        }
        jobModel.isBlocked = false
        jobModel.isRejected = false
        jobModel.updatedAt = new Date()

        console.log('job modal before creating the job', jobModel)
        
        const result = await this.jobRepo.create(jobModel)
        return `Job created successfully ${result.insertedId}`
    }
}