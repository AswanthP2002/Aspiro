import { Db } from "mongodb";
import Favorites from "../../../domain/entities/candidate/favorites";
import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import IFavoriteJobs from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import BaseRepository from "../baseRepository";
import FavoriteJobs from "../../../domain/entities/candidate/favoriteJobs";
import mongoose from "mongoose";

export default class FavoriteJobsRepsitory extends BaseRepository<FavoriteJobs> implements IFavoriteJobsRepo {
    db : Db
    collection : string
    constructor(db : Db){
        super(db, 'favoriteJobs')
        this.db = db
        this.collection = 'favoriteJobs'
    }

    async getFavoriteJobWithDetails(candidateId: string): Promise<any[] | null> {
        const result = await this.db.collection<FavoriteJobs>(this.collection).aggregate([
            { $match: { candidateId: new mongoose.Types.ObjectId(candidateId) } },
            {
                $lookup: {
                    from: 'job',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            { $unwind: '$jobDetails' }

        ]).toArray()

        return result
    }
}