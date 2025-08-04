import IJobRepo from "../../../domain/interfaces/IJobRepo";
import IUnrejectJobUseCase from "./interfaces/IUnrejectJobUseCase";

export class UnRejectJobUseCase implements IUnrejectJobUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._jobRepo.unrejectJob(id)
        return result
    }
}