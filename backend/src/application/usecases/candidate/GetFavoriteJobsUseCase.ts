import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import IGetFavoriteJobUseCase from "./interface/IGetFavoriteJobDetailsUseCase";

export default class GetFavoriteJobUseCase implements IGetFavoriteJobUseCase {
    constructor(private _iFavoriteJobsRepo : IFavoriteJobsRepo){}

    async execute(candidateId: string): Promise<any[] | null> {
        const result = await this._iFavoriteJobsRepo.getFavoriteJobWithDetails(candidateId)
        return result
    }
}