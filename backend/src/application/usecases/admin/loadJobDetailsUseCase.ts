import IJobRepo from "../../../domain/interfaces/IJobRepo";
import ILoadJobDetailsUseCase from "./interfaces/ILoadJobDetailsUseCase";

export class LoadJobDetailsUseCase implements ILoadJobDetailsUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<any[]> {
        const result = await this._jobRepo.getJobDetails(id)
        return result
    }
}