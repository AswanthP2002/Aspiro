import IJobRepo from "../../../domain/interfaces/IJobRepo";

export class RejectJobUseCase {
    constructor(private _jobRepo : IJobRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._jobRepo.rejectJob(id)
        return result
    }
}