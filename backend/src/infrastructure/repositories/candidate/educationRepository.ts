import mongoose from "mongoose";
import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import { connectDb } from "../../database/connection";

export default class EducationRepository implements IEducationRepo {
    private _collection : string
    constructor(){
        this._collection = 'education'
    }
    async addEducation(education: Education): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Education>(this._collection).insertOne(education)
        return result.acknowledged
    }

    async getEducations(candidateId : string): Promise<Education[]> {
        const db = await connectDb()
        const result = await db.collection<Education>(this._collection).find({candidateId:new mongoose.Types.ObjectId(candidateId)}).toArray()
        return result

    }

    async deleteEducation(educationId: string): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Education>(this._collection).deleteOne({_id:new mongoose.Types.ObjectId(educationId)})
        return result.acknowledged
    }

    async editEducation(educationId: string, education: Education): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Education>(this._collection).updateOne(
            {_id:new mongoose.Types.ObjectId(educationId)},
            {$set:education}
        )

        return result.acknowledged
    }
}