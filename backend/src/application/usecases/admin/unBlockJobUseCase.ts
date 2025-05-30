import IJobRepo from "../../../domain/interfaces/IJobRepo";

export class UnblockJobUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._jobRepo.unblockJob(id)
        return result
    }
}