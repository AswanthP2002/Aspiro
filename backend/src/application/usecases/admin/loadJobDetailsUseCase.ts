import IJobRepo from "../../../domain/interfaces/IJobRepo";

export class LoadJobDetailsUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<any[]> {
        const result = await this._jobRepo.getJobDetails(id)
        return result
    }
}