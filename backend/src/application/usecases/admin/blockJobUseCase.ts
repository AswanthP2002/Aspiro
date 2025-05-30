import IJobRepo from "../../../domain/interfaces/IJobRepo";

export class BlockJobUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._jobRepo.blockJob(id)
        return result
    }
}