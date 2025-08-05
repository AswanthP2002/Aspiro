import mongoose from "mongoose";
import Experience from "../../../domain/entities/candidate/experience";
import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import { SaveExperience } from "../../../domain/interfaces/candidate/saveResponses";
import { connectDb } from "../../database/connection";
import BaseRepository from "../baseRepository";
import { Db } from "mongodb";
const {ObjectId} = mongoose.Types

export default class ExperienceRepository extends BaseRepository<Experience> implements IExperienceRepo {
    private _collection = "experience"

    constructor(db : Db){
        super(db, 'experience')
    }

    // async addExperience(experience: Experience): Promise<SaveExperience> {
    //     const db = await connectDb()
    //     const result = await db.collection<Experience>(this._collection).insertOne(experience)
    //     return result
    // }

    // async getExperiences(candidateIdd: string): Promise<Experience[]> {
    //     const db = await connectDb()
    //     const result = await db.collection<Experience>(this._collection).find({ candidateId: new ObjectId(candidateIdd) }).sort({startdate:-1}).toArray()
    //     return result
    // }

    // async deleteExperience(experienceId: string): Promise<boolean> {
    //     const db = await connectDb()
    //     const result = await db.collection<Experience>(this._collection).deleteOne({_id:new ObjectId(experienceId)})
    //     return result.acknowledged
    // }

    async editExperience(experienceId: string, editData : any): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Experience>(this._collection).updateOne(
            {_id:new ObjectId(experienceId)},
            {$set:{
                role:editData.role,
                jobtype:editData.jobtype,
                organization:editData.organization,
                ispresent:editData.ispresent,
                startdate:editData.startdate,
                enddate:editData.enddate,
                location:editData.location,
                locationtype:editData.locationtype
            }}
        )
        return result.acknowledged
    }
}