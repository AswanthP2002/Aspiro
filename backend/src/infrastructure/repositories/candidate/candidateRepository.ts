import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import Candidate from "../../../domain/entities/candidate/candidates";
import { connectDb } from "../../database/connection";
import { Db, ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";
import { after } from "node:test";
import { SaveCandidate } from "../../../domain/interfaces/candidate/saveResponses";
import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import BaseRepository from "../baseRepository";
import SocialLinks from "../../../domain/entities/socialLinks";

export default class CandidateRepository extends BaseRepository<Candidate> implements ICandidateRepo {
    private _collection : string
    db : Db
    constructor(db : Db){
        super(db, 'candidate')
        this.db = db
        this._collection = 'candidate'
    }

    // async create(candidate: Candidate): Promise<SaveCandidate | null> {
    //     const db = await connectDb()
    //     const result = await db.collection(this._collection).insertOne(candidate)
    //     console.log('Candidate repo.ts :: ', result)
    //     console.log('Candidate repo.ts :: ', typeof result.insertedId)
    //     return result
    // }
    
    async findByEmail(email: string): Promise<Candidate | null> {
        console.log('Requested mail id in the repository side', email)
        const db = await connectDb()
        const candidate = await db.collection<Candidate>(this._collection).findOne({email:email})
        console.log('Candidate founded from the respository side', candidate)
        return candidate
    }

    async findByUsername(username: string): Promise<Candidate | null> {
        const db = await connectDb()
        return await db.collection<Candidate>(this._collection).findOne({username:username})
    }

    async findById(id: string): Promise<Candidate | null> {
        const db = await connectDb()
        return await db.collection<Candidate>(this._collection).findOne({_id:new ObjectId(id)})
    }

    async findByGoogleId(googleId: string): Promise<Candidate | null> {
        const db = await connectDb()
        return await db.collection<Candidate>(this._collection).findOne({googleId:googleId})
    }

    async findByToken(token: string): Promise<Candidate | null> {
        const db = await connectDb()
        const candidate = await db.collection<Candidate>(this._collection).findOne({verificationToken:token})
        return candidate
    }

    async updateCandidate(email : string, field: string, value: boolean): Promise<Candidate | null> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this._collection).findOneAndUpdate(
            {email:email},
            {$set:{[field]:value}},
            {returnDocument:"after"}
        )

        return result
    }

    async updateIntroDetails(id: string, role: string, city: string, district: string, state: string, country: string, pincode: string, summary: string): Promise<Candidate | null> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this._collection).findOneAndUpdate(
            {_id:new ObjectId(id)},
            {$set:{
                role:role,
                "location.city":city,
                "location.district":district,
                "location.state":state,
                "location.country":country,
                "location.pincode":pincode,
                about:summary
            }},
            {returnDocument:'after'}
        )

        return result

        
    }

    async editProfile(id: string, name: string, role: string, city: string, district: string, state: string, country: string, about : string): Promise<Candidate | null> {
        const db = await connectDb()
        const doc = await db.collection<Candidate>(this._collection).findOneAndUpdate(
            {_id:new ObjectId(id)},
            {$set:{
                name:name,
                role:role,
                "location.city":city,
                "location.district":district,
                "location.state":state,
                "location.country":country,
                about:about
            }},
            {returnDocument:'after'}
        )

        return doc
    }

    async findCandidates(search : string = "", page : number = 1, limit : number = 1, sort : string = 'joined-latest', filter : any): Promise<any | null> {
        const db = await connectDb()
        const skip = (page - 1) * limit
        //const query = search ? { name: { $regex: new RegExp(search, 'i') }, isAdmin:false } : {isAdmin:false}
        const currentSort = sort
        const sortOption : any = {}
        const matchFilter : any = {isAdmin:false}

        console.log(`Filter content from the client side :: CandidateRepository.ts`, filter)


        if(search){
            matchFilter.name = {$regex:new RegExp(search, 'i')}
        }

        if(filter?.jobRole.length > 0){
            console.log('Content exist in the jobRole :: filter')
            matchFilter.role = {$in:filter?.jobRole}
        }

        if(filter?.status.length > 0) {
            console.log('Content exist in the status :: filter')
            matchFilter.isBlocked = {$in:filter?.status}
        }

        switch (sort) {
            case 'joined-latest' :
                sortOption['createdAt'] = -1
                break
            case 'joined-oldest' :
                sortOption['createdAt'] = 1 
                break
            case 'name-a-z' :
                sortOption['name'] = 1
                break
            case 'name-z-a' :
                sortOption['name'] = -1
                break
            default :
                sortOption['createdAt'] = -1 
        }

        console.log('Match query before applying', matchFilter)

        const candidates = await db.collection<Candidate>(this._collection).find(matchFilter).sort(sortOption).skip(skip).limit(limit).toArray()
        const totalDocuments = await db.collection<Candidate>(this._collection).countDocuments(matchFilter)
        const totalPages = Math.ceil(totalDocuments / limit)
        return {candidates, currentPage:page, totalPages, currentSort}
    }

    async blockCandidate(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{isBlocked:true}}
        )

        return result.acknowledged
    }

    async unblockCandidate(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this._collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{isBlocked:false}}
        )

        return result.acknowledged
    }

    async isCandidateBlocked(id: string): Promise<boolean | undefined> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this._collection).findOne({_id:new ObjectId(id)})
        return result?.isBlocked
    }

    async candidateAggregatedData(candidateId: string): Promise<any> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this._collection).aggregate([
            {$match:{_id:new ObjectId(candidateId)}},
            {$lookup:{
                from:'experience',
                foreignField:'candidateId',
                localField:'_id',
                as:'experience'
            }},
            {$lookup:{
                from:'skill',
                foreignField:'candidateID',
                localField:'_id',
                as:'skills'
            }},
            {$lookup:{
                from:'education',
                foreignField:'candidateId',
                localField:'_id',
                as:'education'
            }}
        ]).toArray()

        return result[0]
    }

    async addSocialLink(candidateId: string, socialLink: SocialLinks): Promise<boolean | null> {
        //find the domain is already exist or not
        const isExist = await this.db.collection<Candidate>(this._collection).findOne({
            _id:new mongoose.Types.ObjectId(candidateId),
            socialLinks:{$elemMatch:{domain:socialLink.domain}}
        })
        if(isExist) return false
        
        const updateResult = await this.db.collection<Candidate>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$push:{socialLinks:socialLink}}
        )

        return updateResult.modifiedCount === 1
    }

    async getSocialLinks(candidateId: string): Promise<SocialLinks[] | null> {
        const result = await this.db.collection<Candidate>(this._collection).findOne(
            {_id:new mongoose.Types.ObjectId(candidateId)}
        )

        return result ? result.socialLinks : []
    }

    async deleteSocialLink(candidateId: string, domain: string): Promise<boolean | null> {
        const result = await this.db.collection<Candidate>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$pull:{socialLinks:{domain:domain}}}
        )

        return result.modifiedCount === 1
    }

    async uploadProfilePhoto(candidateId: string, cloudinaryUrl: string, cloudinaryPublicId: string): Promise<boolean | null> {
        const result = await this.db.collection<Candidate>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{profilePicture:{cloudinarySecureUrl:cloudinaryUrl, cloudinaryPublicId:cloudinaryPublicId}}}
        )
        return result.modifiedCount > 0
    }

    async removeProfilePhoto(candidateId: string): Promise<boolean | null> {
        const result = await this.db.collection<Candidate>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{
                profilePicture:{cloudinaryPublicId:"", cloudinarySecureUrl:""}
            }}
        )

        return result.modifiedCount > 0
    }

    async uploadCoverPhoto(candidateId: string, cloudinaryUrl: string, cloudinaryPublicId: string): Promise<boolean | null> {
        const result = await this.db.collection<Candidate>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{
                coverPhoto:{cloudinaryPublicId:cloudinaryPublicId, cloudinarySecureUrl:cloudinaryUrl}
            }}
        )

        return result?.modifiedCount > 0
    }

    async removeCoverPhoto(candidateId: string): Promise<boolean | null> {
        const result = await this.db.collection<Candidate>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{
                coverPhoto:{cloudinaryPublicId:"", cloudinarySecureUrl:""}
            }}
        )

        return result.modifiedCount > 0
    }
}