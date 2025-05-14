import Job from "../../../domain/entities/job";
import IJobRepo from "../../../domain/interfaces/IJobRepo";

export class LoadCompanyPostedJobs {
    constructor(private jobRepo : IJobRepo){}

    async execute(id : string) : Promise<Job[]>{
        const jobs = await this.jobRepo.findCompanyJobsById(id)
        return jobs
    }
}