import { Db } from "mongodb";
import Favorites from "../../../domain/entities/candidate/favorites";
import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import IFavoriteJobs from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import BaseRepository from "../baseRepository";
import FavoriteJobs from "../../../domain/entities/candidate/favoriteJobs";
import mongoose from "mongoose";
import { FavoriteJobsDAO } from "../../database/DAOs/candidate/faovriteJobs.dao";

export default class FavoriteJobsRepsitory extends BaseRepository<FavoriteJobs> implements IFavoriteJobsRepo {
    constructor(){
        super(FavoriteJobsDAO)
    }
    // db : Db
    // collection : string
    // constructor(db : Db){
    //     super(db, 'favoriteJobs')
    //     this.db = db
    //     this.collection = 'favoriteJobs'
    // }

    async getFavoriteJobWithDetails(candidateId: string): Promise<any[] | null> {
        const result = await FavoriteJobsDAO.aggregate([
            { $match: { candidateId: new mongoose.Types.ObjectId(candidateId) } },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            { $unwind: '$jobDetails' }

        ])

        return result
    }

    async deleteFavoriteJob(jobId: string, candidateId: string): Promise<void> {
       const result = await FavoriteJobsDAO.deleteOne({candidateId:new mongoose.Types.ObjectId(candidateId), jobId:new mongoose.Types.ObjectId(jobId)})
       console.log('result object', result)
    }
    
    async findWithCandidateId(id: string): Promise<FavoriteJobs[] | null> {
        const result = await FavoriteJobsDAO.find({candidateId:new mongoose.Types.ObjectId(id)})
        return result   
    }
}