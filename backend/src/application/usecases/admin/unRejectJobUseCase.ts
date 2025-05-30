import IJobRepo from "../../../domain/interfaces/IJobRepo";

export class UnRejectJobUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._jobRepo.unrejectJob(id)
        return result
    }
}