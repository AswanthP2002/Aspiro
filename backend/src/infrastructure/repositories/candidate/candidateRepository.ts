import CandidateRepo from "../../../domain/interfaces/candidate/candidateRepo";
import Candidate from "../../../domain/entities/candidate/candidates";
import { connectDb } from "../../database/connection";
import { ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";
import { after } from "node:test";

export default class CandidateRepository implements CandidateRepo {
    private collection = "candidate"

    async create(candidate: Candidate): Promise<string> {
        const db = await connectDb()
        const result = await db.collection(this.collection).insertOne(candidate)
        return `Candidate created with verification pending status with id : ${(await result).insertedId.toHexString()}`
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
}