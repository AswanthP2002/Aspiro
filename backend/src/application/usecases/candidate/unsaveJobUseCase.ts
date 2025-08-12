import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import IUnsaveJobUseCase from "./interface/IUnsaveJobUseCase";

export default class UnsaveJobUseCase implements IUnsaveJobUseCase {
    constructor(private _iFavoriteJobRepo : IFavoriteJobsRepo){}

    async execute(id: string, jobId: string): Promise<boolean> {
        const result = await this._iFavoriteJobRepo.delete(id)
        return result
    }
}