import Skills from "../../../domain/entities/candidate/skills";
import ISkillRepo from "../../../domain/interfaces/candidate/ISkillRepo";
import { connectDb } from "../../database/connection";
import mongoose, { mongo } from "mongoose";
import BaseRepository from "../baseRepository";
import { Db } from "mongodb";

export default class SkillRepsitory extends BaseRepository<Skills> implements ISkillRepo {
    private _collection : string
    constructor(db : Db){
        super(db, 'skill')
        this._collection = 'skill'
    }
    // async saveSkill(skill: Skills): Promise<boolean> {
    //     const db = await connectDb()
    //     const result = await db.collection<Skills>(this._collection).insertOne(skill)
    //     return result.acknowledged
    // }

    // async getSkills(candidateId: string): Promise<Skills[]> {
    //     const db = await connectDb()
    //     const result = await db.collection<Skills>(this._collection).find({candidateID:new mongoose.Types.ObjectId(candidateId)}).toArray()
    //     return result
    // }

    // async deleteSkill(skillId: string): Promise<boolean> {
    //     const db = await connectDb()
    //     const deleteResult = await db.collection<Skills>(this._collection).deleteOne({_id:new mongoose.Types.ObjectId(skillId)})
    //     return deleteResult.acknowledged
    // }
    
}