import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import Candidate from "../../../domain/entities/candidate/candidates";
import { connectDb } from "../../database/connection";
import { Db, ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";
import { after } from "node:test";
import { SaveCandidate } from "../../../domain/interfaces/candidate/createCandidateRequest";

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
}