import IJobRepo from "../../../domain/interfaces/IJobRepo";
import ILoadJobCandidateSideUseCase from "./interface/ILoadJobCandidateSideUseCase";

export default class LoadJobsCandidateSideUseCase implements ILoadJobCandidateSideUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(search : string = "", page : number = 1, limit : number = 1, sort : string = 'job-latest', filters : any) : Promise<any>{
        const result = await this._jobRepo.getJobs(search, page, limit, sort, filters)
        return result
    }
}