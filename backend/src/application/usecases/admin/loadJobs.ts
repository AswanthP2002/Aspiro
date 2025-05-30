import Job from "../../../domain/entities/job";
import IJobRepo from "../../../domain/interfaces/IJobRepo";

export default class LoadJobsUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute() : Promise<Job[] | null> {
        const result = await this._jobRepo.getJobs()
        return result
    }
}