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
}