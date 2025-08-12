import mongoose from "mongoose";
import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import ISaveFavoriteJobUseCase from "./interface/ISaveFavoriteJobsUseCase";
import FavoriteJobs from "../../../domain/entities/candidate/favoriteJobs";

export default class SaveFavoriteJobUseCase implements ISaveFavoriteJobUseCase {
    constructor(private _IFavoriteJobRepo : IFavoriteJobsRepo){}

    async execute(candidateId: string, jobId: string): Promise<string | null> {
        const convertedCandidateId = new mongoose.Types.ObjectId(candidateId)
        const convertedJobId = new mongoose.Types.ObjectId(jobId)
        const savedJob : FavoriteJobs = {
            candidateId:convertedCandidateId,
            jobId:convertedJobId,
            createdAt:new Date()
        }

        const result = await this._IFavoriteJobRepo.create(savedJob)
        return result
    }
}