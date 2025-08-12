import mongoose from "mongoose";
import JobApplication from "../../domain/entities/candidate/jobApplication";
import IJobApplicationRepo from "../../domain/interfaces/IJobApplicationRepo";
import { connectDb } from "../database/connection";
import BaseRepository from "./baseRepository";
import { Db } from "mongodb";

export default class JObApplicationRepository extends BaseRepository<JobApplication> implements IJobApplicationRepo {
    private _collection : string
    constructor(db : Db){
        super(db, 'jobApplication')
        this._collection = 'jobApplication'
    }

    // async saveJobApplication(jobApplication: JobApplication): Promise<boolean> {
    //     const db = await connectDb()

    //     const result = await db.collection<JobApplication>(this._collection).insertOne(jobApplication)
    //     return result.acknowledged
    // }

    async getApplicationsByJobId(jobId: string): Promise<JobApplication[] | any> {
        const db = await connectDb()
        const result = await db.collection<JobApplication>(this._collection).aggregate([
            {$match:{jobId:new mongoose.Types.ObjectId(jobId)}},
            {$lookup: {
                from: 'candidate',
                localField: 'candidateId',
                foreignField: '_id',
                as: 'applicantDetails'
            }},
            {
                $lookup: {
                from: 'resume',
                localField: 'resumeId',
                foreignField: '_id',
                as: 'resume'
                }
            },
            {$unwind:'$applicantDetails'},
            {$unwind:'$resume'}
        ]).toArray()

        return result
    }

    async rejectJobApplication(applicationId: string): Promise<boolean> {
        const db = await connectDb()
        const updateResult = await db.collection<JobApplication>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(applicationId)},
            {$set:{status:'rejected'}}
        )

        return updateResult.modifiedCount === 1
    }
}