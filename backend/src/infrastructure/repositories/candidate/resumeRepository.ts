import mongoose from "mongoose";
import Resume from "../../../domain/entities/candidate/resume";
import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";
import { connectDb } from "../../database/connection";
import BaseRepository from "../baseRepository";
import { Db } from "mongodb";

export default class ResumeRepository extends BaseRepository<Resume> implements IResumeRepo {
    private _collection
    constructor(db : Db){
        super(db, 'resume')
        this._collection = 'resume'
    }

    // async addResume(resume: Resume): Promise<boolean> {
    //     const db = await connectDb()
    //     const result = await db.collection<Resume>(this._collection).insertOne(resume)
    //     return result.acknowledged
    // }

    // async loadResumes(candidateId: string): Promise<Resume[] | null> {
    //     const db = await connectDb()
    //     const result = await db.collection<Resume>(this._collection).find({candidateId:new mongoose.Types.ObjectId(candidateId)}).toArray()
    //     return result
    // }

    // async deleteResume(resumeId: string): Promise<boolean> {
    //     const db = await connectDb()
    //     const result = await db.collection<Resume>(this._collection).deleteOne({_id:new mongoose.Types.ObjectId(resumeId)})
    //     return result.acknowledged
    // }
}