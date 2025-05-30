import Job from "../../domain/entities/job";
import IJobRepo from "../../domain/interfaces/IJobRepo";
import { connectDb } from "../database/connection";
import { SaveJob } from "../../domain/interfaces/IJobRepo";
import { ObjectId } from "mongodb";

export default class JobRepository implements IJobRepo {
    private collection = 'job'
    
    async create(job: Job): Promise<SaveJob> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).insertOne(job)
        return result
    }

    async findCompanyJobsById(id: string): Promise<Job[]> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).find({companyId:new ObjectId(id)}).toArray()
        return result
    }

    async getJobs(): Promise<any[]> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).aggregate([
                             {$lookup: {
                                 from: 'recruiter',
                                 localField: 'companyId',
                                 foreignField: '_id',
                                 as: 'companyDetails'
                             }},
                             {$unwind:'$companyDetails'}
                             ]).toArray()
        return result
    }

    async getJobDetails(id: string): Promise<any[]> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).aggregate([
                            {$lookup: {
                                from: 'recruiter',
                                localField: 'companyId',
                                foreignField: '_id',
                                as: 'companyDetails'
                            }},
                            {$unwind:'$companyDetails'},
                            {$match:{_id:new ObjectId(id)}}
                            ]).toArray()
        return result
    }

    async blockJob(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:true
            }}
        )

        return result.acknowledged
    }

    async unblockJob(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:false
            }}
        )

        return result.acknowledged
    }

    async rejectJob(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isRejected:true
            }}
        )

        return result.acknowledged
    }

    async unrejectJob(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Job>(this.collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isRejected:false
            }}
        )

        return result.acknowledged
    }
}