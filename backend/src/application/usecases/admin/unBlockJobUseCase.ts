import IJobRepo from "../../../domain/interfaces/IJobRepo";
import IUnblockJobUseCase from "./interfaces/IUnblockJobUseCase";

export class UnblockJobUseCase implements IUnblockJobUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._jobRepo.unblockJob(id)
        return result
    }
}