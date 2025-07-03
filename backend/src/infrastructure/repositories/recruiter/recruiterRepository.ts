import Recruiter from "../../../domain/entities/recruiter/recruiter";
import { SaveRecruiter } from "../../../domain/interfaces/recruiter/createRecruiterRequest";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import { connectDb } from "../../database/connection";
import { ObjectId } from "mongodb";

export default class RecruiterRespository implements IRecruiterRepo{
   private _collection = 'recruiter'
   
   async create(recruiter: Recruiter): Promise<SaveRecruiter> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this._collection).insertOne(recruiter)
        return result
    }

    async findByEmail(email: string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this._collection).findOne({email:email})
        console.log('recruiter find request reached here, from recruiter repository side', result)
        return result
    }

    async findRecruiters(search : string = "", page : number = 1, limit : number = 1): Promise<any | null> {
        const db = await connectDb()
        const skip = (page - 1) * limit
        const query = search ? {companyName : {$regex:new RegExp(search, 'i')}} : {}
        const recruiters = await db.collection<Recruiter>(this._collection).find(query).skip(skip).limit(limit).toArray()
        const totalRecruiters = await db.collection<Recruiter>(this._collection).countDocuments(query)
        const totalPages = Math.ceil(totalRecruiters / limit)
        return {recruiters, page, totalPages}
    }

    async findById(id: string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this._collection).findOne({_id:new ObjectId(id)})
        return result
    }

    async findByUserName(username: string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this._collection).findOne({username:username})
        return result
    }

    async verifyRecruiter(email: string, field: string, update: boolean): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this._collection).updateOne(
            {email:email},
            {$set:{isVerified:update}}
        )
        if(result.matchedCount > 0) return true
        return false
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
        mobile: string, 
        logo : string, 
        coverphoto : string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this._collection).findOneAndUpdate(
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
                phone:mobile,
                logo:logo,
                coverphoto:coverphoto
            }},
            {returnDocument:'after'}
        )
        
        return result
    }

    async blockRecruiter(id: string): Promise<boolean> {
        const db = await connectDb()
        const blockResult = await db.collection<Recruiter>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:true
            }}
        )

        return blockResult.acknowledged

    }

    async unblockRecruiter(id: string): Promise<boolean> {
        const db = await connectDb()
        const unblockResult = await db.collection<Recruiter>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                isBlocked:false
            }}
        )

        return unblockResult.acknowledged
    }

    async deleteRecruiter(id: string): Promise<boolean> {
        const db = await connectDb()
        const deleteResult = await db.collection<Recruiter>(this._collection).deleteOne({_id:new ObjectId(id)})
        return deleteResult.acknowledged
    }

    async aggregateRecruiterProfile(id: string): Promise<any> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this._collection).aggregate([
            {
                $match: {
                    _id:new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'job',
                    let: { recruiterId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$companyId', '$$recruiterId'] }
                            }
                        },
                        {
                            $lookup: {
                                from: 'jobApplication',
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
                                applications: 0 // remove full application data if not needed
                            }
                        }
                    ],
                    as: 'jobs'
                }
            }
        ]
        ).toArray()

        return result[0]
    }

}