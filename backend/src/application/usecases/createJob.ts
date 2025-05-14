import Job from "../../domain/entities/job";
import IJobRepo from "../../domain/interfaces/IJobRepo";
import { ObjectId } from "mongodb";


export default class CreateJob {
    constructor(private jobRepo : IJobRepo){}

    async execute(id : string, job : Job) : Promise<string> {
        job.companyId = new ObjectId(id)
        job.createdAt = new Date()
        if (job.expiresAt) {
            job.expiresAt = new Date(job.expiresAt);
        } else {
 
            job.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        }
        job.isBlocked = false
        job.isRejected = false
        job.updatedAt = new Date()
        
        const result = await this.jobRepo.create(job)
        return `Job created successfully ${result.insertedId}`
    }
}