import IJobRepo from "../../../domain/interfaces/IJobRepo";
import IRejectJobUseCase from "./interfaces/IRejectJobUseCase";

export class RejectJobUseCase implements IRejectJobUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._jobRepo.rejectJob(id)
        return result
    }
}