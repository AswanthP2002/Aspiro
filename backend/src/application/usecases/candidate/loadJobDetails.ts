import IJobRepo from "../../../domain/interfaces/IJobRepo";
import ILoadJobDetailsCandidateSideUseCase from "./interface/ILoadJobDetailsCandidateSideUseCase";

export default class LoadJobDetailsCandidateSide implements ILoadJobDetailsCandidateSideUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(jobId : string) : Promise<any> {
        const result = await this._jobRepo.getJobDetails(jobId)
        return result[0]
    }
}