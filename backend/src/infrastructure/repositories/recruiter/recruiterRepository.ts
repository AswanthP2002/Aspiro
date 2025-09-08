import Recruiter from "../../../domain/entities/recruiter/recruiter";
import { SaveRecruiter } from "../../../domain/interfaces/recruiter/createRecruiterRequest";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import { Db, ObjectId } from "mongodb";
import BaseRepository from "../baseRepository";
import { RecruiterDAO } from "../../database/DAOs/recruiter/recruiter.dao";
import RecruiterProfileAggregated from "../../../application/DTOs/recruiter/recruiterProfileAggregatedData";

export default class RecruiterRespository extends BaseRepository<Recruiter> implements IRecruiterRepo{
    constructor(){
        super(RecruiterDAO)
    }
//    async create(recruiter: Recruiter): Promise<SaveRecruiter> {
//         const db = await connectDb()
//         const result = await db.collection<Recruiter>(this._collection).insertOne(recruiter)
//         return result
//     }

    async findByEmail(email: string): Promise<Recruiter | null> {
        const result = await RecruiterDAO.findOne({email:email})
        return result
    }

    async findRecruiters(search : string = "", page : number = 1, limit : number = 1, sort : string): Promise<any | null> {
        const skip = (page - 1) * limit
        const query = search ? {companyName : {$regex:new RegExp(search, 'i')}} : {}
        let currentSort : string = sort
        const sortOptions : any = {}

        switch(sort){
            case 'joined-latest' :
                sortOptions.createdAt = -1
                currentSort = 'joined-latest'
                break
            case 'joined-oldest' :
                sortOptions.createdAt = 1
                currentSort = 'joined-oldest'
                break
            case  'name-a-z' : 
                sortOptions.companyName = 1
                currentSort = 'name-a-z'
                break
            case 'name-z-a' :
                sortOptions.companyName = -1
                currentSort = 'name-z-a'
                break
            default :
                sortOptions.createdAt = -1
        }
        const recruiters = await RecruiterDAO.find(query).sort(sortOptions).skip(skip).limit(limit).lean()
        const totalRecruiters = await RecruiterDAO.countDocuments(query)
        const totalPages = Math.ceil(totalRecruiters / limit)
        return {recruiters, page, totalPages, currentSort}
    }

    async findById(id: string): Promise<Recruiter | null> {
        const result = RecruiterDAO.findOne({_id:new ObjectId(id)})
        return result
    }

    async findByUserName(username: string): Promise<Recruiter | null> {
        const result = await RecruiterDAO.findOne({username:username})
        return result
    }

    async verifyRecruiter(email: string): Promise<Recruiter | null> {
        
        const result = await RecruiterDAO.findOneAndUpdate(
            {email:email},
            {$set:{isVerified:true}},
            {returnDocument:'after'}
        )
        return result
    }

    async updateIntroDetails(
        id: string, 
        companyName: string, 
        about: string, 
        benefits: string, 
        companyType: string, 
        industryType: string, 
        teamStrength: string, 
        yearOfEstablishment: string, 
        website: string, 
        vision: string, 
        country: string, 
        state: string, 
        city: string, 
        mobile: string): Promise<Recruiter | null> {
        
        const result = await RecruiterDAO.findOneAndUpdate(
            {_id:new ObjectId(id)},
            {$set:{
                companyName:companyName,
                about:about,
                benefit:benefits,
                companyType:companyType,
                industry:industryType,
                teamStrength:teamStrength,
                foundIn:yearOfEstablishment,
                website:website,
                vision:vision,
                "location.country":country,
                "location.city":city,
                "location.state":state,
                phone:mobile
            }},
            {returnDocument:'after'}
        )
        
        return result
    }

    async blockRecruiter(id: string): Promise<boolean> {
        
        const blockResult = await RecruiterDAO.updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:true
            }}
        )

        return blockResult.acknowledged

    }

    async unblockRecruiter(id: string): Promise<boolean> {
    
        const unblockResult = await RecruiterDAO.updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:false
            }}
        )

        return unblockResult.acknowledged
    }

    async deleteRecruiter(id: string): Promise<boolean> {
        
        const deleteResult = await RecruiterDAO.deleteOne({_id:new ObjectId(id)})
        return deleteResult.acknowledged
    }

    async aggregateRecruiterProfile(id: string): Promise<RecruiterProfileAggregated | null> {
       
        const result = await RecruiterDAO.aggregate([
            {
                $match: {
                    _id:new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'jobs',
                    let: { recruiterId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$companyId', '$$recruiterId'] }
                            }
                        },
                        {
                            $lookup: {
                                from: 'jobapplications',
                                let: { jobId: '$_id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ['$jobId', '$$jobId'] }
                                        }
                                    }
                                ],
                                as: 'applications'
                            }
                        },
                        {
                            $addFields: {
                                applicantCount: { $size: '$applications' }
                            }
                        },
                        {
                            $project: {
                                applications: 0 
                            }
                        }
                    ],
                    as: 'jobs'
                }
            }
        ]
        )

        return result[0]
    }

}