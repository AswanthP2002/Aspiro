import mongoose from "mongoose";
import JobApplication from "../../domain/entities/candidate/jobApplication";
import IJobApplicationRepo from "../../domain/interfaces/IJobApplicationRepo";
import { connectDb } from "../database/connection";

export default class JObApplicationRepository implements IJobApplicationRepo {
    private _collection : string
    constructor(){
        this._collection = 'jobApplication'
    }

    async saveJobApplication(jobApplication: JobApplication): Promise<boolean> {
        const db = await connectDb()

        const result = await db.collection<JobApplication>(this._collection).insertOne(jobApplication)
        return result.acknowledged
    }

    async getApplicationsByJobId(jobId: string): Promise<JobApplication[] | any> {
        const db = await connectDb()
        const result = await db.collection<JobApplication>(this._collection).aggregate([
            {
                $lookup: {
                    from: 'candidate',
                    localField: 'candidateId',
                    foreignField: '_id',
                    as: 'candidateDetails'
                }
            },
            {
                $lookup: {
                    from: 'job',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            {$unwind:'$jobDetails'}
        ]).toArray()

        return result
    }
}