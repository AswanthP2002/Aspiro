import mongoose from "mongoose";
import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import ISaveFavoriteJobUseCase from "./interface/ISaveFavoriteJobsUseCase";
import FavoriteJobs from "../../../domain/entities/candidate/favoriteJobs";
import AddJobFavoriteDTO from "../../DTOs/candidate/addJobFavoriteDTO";

export default class SaveFavoriteJobUseCase implements ISaveFavoriteJobUseCase {
    constructor(private _IFavoriteJobRepo : IFavoriteJobsRepo){}

    async execute(savefavoriteJobDto : AddJobFavoriteDTO): Promise<FavoriteJobs | null> {

        const result = await this._IFavoriteJobRepo.create({candidateId:savefavoriteJobDto.candidateId, jobId:savefavoriteJobDto.jobId})
        return result
    }
}