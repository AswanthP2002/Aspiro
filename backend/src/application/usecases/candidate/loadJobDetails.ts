import IJobRepo from "../../../domain/interfaces/IJobRepo";

export default class LoadJobDetailsCandidateSide {
    constructor(private _jobRepo : IJobRepo){}

    async execute(jobId : string) : Promise<any> {
        const result = await this._jobRepo.getJobDetails(jobId)
        return result[0]
    }
}