import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import Candidate from "../../../domain/entities/candidate/candidates";
import { connectDb } from "../../database/connection";
import { Db, ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";
import { after } from "node:test";
import { SaveCandidate } from "../../../domain/interfaces/candidate/saveResponses";

export default class CandidateRepository implements CandidateRepo {
    private collection = "candidate"

    async create(candidate: Candidate): Promise<SaveCandidate> {
        const db = await connectDb()
        const result = await db.collection(this.collection).insertOne(candidate)
        console.log('Candidate repo.ts :: ', result)
        console.log('Candidate repo.ts :: ', typeof result.insertedId)
        return result
    }
    
    async findByEmail(email: string): Promise<Candidate | null> {
        console.log('Requested mail id in the repository side', email)
        const db = await connectDb()
        const candidate = await db.collection<Candidate>(this.collection).findOne({email:email})
        console.log('Candidate founded from the respository side', candidate)
        return candidate
    }

    async findByUsername(username: string): Promise<Candidate | null> {
        const db = await connectDb()
        return await db.collection<Candidate>(this.collection).findOne({username:username})
    }

    async findById(id: string): Promise<Candidate | null> {
        const db = await connectDb()
        return await db.collection<Candidate>(this.collection).findOne({_id:new ObjectId(id)})
    }

    async findByGoogleId(googleId: string): Promise<Candidate | null> {
        const db = await connectDb()
        return await db.collection<Candidate>(this.collection).findOne({googleId:googleId})
    }

    async findByToken(token: string): Promise<Candidate | null> {
        const db = await connectDb()
        const candidate = await db.collection<Candidate>(this.collection).findOne({verificationToken:token})
        return candidate
    }

    async updateCandidate(email : string, field: string, value: boolean): Promise<Candidate | null> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this.collection).findOneAndUpdate(
            {email:email},
            {$set:{[field]:value}},
            {returnDocument:"after"}
        )

        return result
    }

    async updateIntroDetails(id: string, role: string, city: string, district: string, state: string, country: string, pincode: string, summary: string): Promise<Candidate | null> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this.collection).findOneAndUpdate(
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

    async editProfile(id: string, name: string, role: string, city: string, district: string, state: string, country: string): Promise<Candidate | null> {
        const db = await connectDb()
        const doc = await db.collection<Candidate>(this.collection).findOneAndUpdate(
            {_id:new ObjectId(id)},
            {$set:{
                name:name,
                role:role,
                "location.city":city,
                "location.district":district,
                "location.state":state,
                "location.country":country
            }},
            {returnDocument:'after'}
        )

        return doc
    }

    async findCandidates(search : string = "", page : number = 1, limit : number = 1): Promise<any | null> {
        const db = await connectDb()
        const skip = (page - 1) * limit
        const query = search ? { name: { $regex: new RegExp(search, 'i') }, isAdmin:false } : {isAdmin:false}
        const candidates = await db.collection<Candidate>(this.collection).find(query).skip(skip).limit(limit).toArray()
        const totalDocuments = await db.collection<Candidate>(this.collection).countDocuments(query)
        const totalPages = Math.ceil(totalDocuments / limit)
        return {candidates, currentPage:page, totalPages}
    }

    async blockCandidate(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this.collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{isBlocked:true}}
        )

        return result.acknowledged
    }

    async unblockCandidate(id: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this.collection).updateOne(
            {_id:new ObjectId(id)},
            {$set:{isBlocked:false}}
        )

        return result.acknowledged
    }

    async isCandidateBlocked(id: string): Promise<boolean | undefined> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this.collection).findOne({_id:new ObjectId(id)})
        return result?.isBlocked
    }

    async candidateAggregatedData(candidateId: string): Promise<any> {
        const db = await connectDb()
        const result = await db.collection<Candidate>(this.collection).aggregate([
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
            }}
        ]).toArray()

        return result[0]
    }
}