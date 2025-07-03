import Job from "../../../domain/entities/job";
import IJobRepo from "../../../domain/interfaces/IJobRepo";

export default class LoadJobsUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(search : string, page : number, limit : number, sort : string, filter : any) : Promise<any> { //change strict later
        const result = await this._jobRepo.getJobs(search, page, limit, sort, filter)
        return result
    }
}