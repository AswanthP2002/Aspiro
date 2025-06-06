import IJobRepo from "../../../domain/interfaces/IJobRepo";

export default class LoadJobsCandidateSideUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(search : string = "", page : number = 1, limit : number = 1) : Promise<any>{
        const result = await this._jobRepo.getJobs(search, page, limit)
        return result
    }
}