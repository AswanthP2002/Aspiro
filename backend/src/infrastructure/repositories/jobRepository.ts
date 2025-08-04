import Job from "../../domain/entities/job";
import IJobRepo from "../../domain/interfaces/IJobRepo";
import { connectDb } from "../database/connection";
import { SaveJob } from "../../domain/interfaces/IJobRepo";
import { Db, ObjectId } from "mongodb";
import BaseRepository from "./baseRepository";

export default class JobRepository extends BaseRepository<Job> implements IJobRepo {
    private _collection = 'job'

    constructor(db : Db){
        super(db, 'job')
    }
    
    // async create(job: Job): Promise<SaveJob> {
    //     const db = await connectDb()
    //     const result = await db.collection<Job>(this._collection).insertOne(job)
    //     return result
    // }

    async findCompanyJobsById(id: string): Promise<Job[]> {
        const db = await connectDb()
        const result = await db.collection<Job>(this._collection).find({companyId:new ObjectId(id)}).toArray()
        return result
    }

    async getJobs(search : string = '', page : number = 1, limit : number = 3, sort : string = 'job-latest', filters : any): Promise<any> { //change strict to later
        const db = await connectDb()
        const prelookupMatch : any = {}
        const postlookupMatch : any = {}

        if(search){
            prelookupMatch.jobTitle = {$regex: new RegExp(search, 'i')}
        }

        if(filters?.industry.length > 0){
            postlookupMatch['companyDetails.industry'] = {$in:filters?.industry}
        }

        if(filters?.jobType.length > 0) {
            prelookupMatch.jobType = {$in:filters?.jobType}
        }

        if(filters?.locationType.length > 0) {
            prelookupMatch.locationType = {$in:filters?.locationType}
        }

        if(filters?.minSalary){
            prelookupMatch.minSalary = {$gte:Number(filters?.minSalary)}
        }

        if(filters?.maxSalary){
            prelookupMatch.maxSalary = {$lte:Number(filters?.maxSalary)}
        }

        //const match = search ? {$match:{jobTitle:{$regex: new RegExp(search, 'i')}}} : {$match:{}}
        const skip = (page - 1) * limit
        const currentSort = sort
        let sortData : any = {}
        const filterData : any = {}
        switch(sort){
            case 'salary-high' : 
                sortData['minSalary'] = -1
                break
            case 'salary-low' :
                sortData['maxSalary'] = 1
                break
            case 'job-latest' :
                sortData['createdAt'] = -1
                break
            case 'job-oldest' :
                sortData['createdAt'] = 1
                break
            case 'Name A - Z' :
                sortData['JobTitle'] = 1
                break
            case 'Name Z - A' :
                sortData['JobTitle'] = -1
                break
            default :
                sortData = {}
                break
        }


        const pipeline: any[] = [
            {$match:prelookupMatch},
            { $lookup: {
                from: 'recruiter',
                localField: 'companyId',
                foreignField: '_id',
                as: 'companyDetails'
                             } },
            { $unwind:'$companyDetails'},
            {$match:postlookupMatch},
            { $skip: skip },
            { $limit: limit }
        ]

        if(Object.keys(sortData).length > 0){
            pipeline.push({$sort:sortData})
        }

        const countPipeLine = [
            { $match: prelookupMatch },
            {
                $lookup: {
                    from: 'recruiter',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companyDetails',
                }
            },
            { $unwind: '$companyDetails' },
            { $match: postlookupMatch },
            { $count: 'count' }
        ]


        const jobs = await db.collection<Job>(this._collection).aggregate(pipeline).toArray()
        const totalDocumentsArray = await db.collection<Job>(this._collection).aggregate(countPipeLine).toArray()
        const totalDocumentsCount = totalDocumentsArray[0]?.count || 0
        const totalPages = totalDocumentsArray.length > 0 ? Math.ceil(totalDocumentsCount / limit) : 0
        return {jobs, page, totalPages, currentSort:sort}
    }

    async getJobDetails(id: string): Promise<any[]> {
        const db = await connectDb()
        const result = await db.collection<Job>(this._collection).aggregate([
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
        const result = await db.collection<Job>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:true
            }}
        )

        return result.acknowledged
    }

    async unblockJob(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Job>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:false
            }}
        )

        return result.acknowledged
    }

    async rejectJob(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Job>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isRejected:true
            }}
        )

        return result.acknowledged
    }

    async unrejectJob(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Job>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isRejected:false
            }}
        )

        return result.acknowledged
    }

    async searchJobsFromHome(search: string = ''): Promise<Job[] | any[]> {
        const db = await connectDb()
        const result = await db.collection<Job>(this._collection).aggregate([
            {$lookup:{
                from:'recruiter',
                localField:'companyId',
                foreignField:'_id',
                as:'companyDetails'
            }},
            {$unwind:'$companyDetails'},
            {$match:{jobTitle:{$regex:new RegExp(search, 'i')}}}
        ]).toArray()
        return result
    }
}