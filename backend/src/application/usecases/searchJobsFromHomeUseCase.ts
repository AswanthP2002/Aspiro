import Job from "../../domain/entities/job";
import IJobRepo from "../../domain/interfaces/IJobRepo";

export default class SearchJobsFromHomeUseCase {
    constructor(private _iJobRepo : IJobRepo) {} 

    async execute(search : string) : Promise<Job[]> {
        const result = await this._iJobRepo.searchJobsFromHome(search)
        return result
    }
}