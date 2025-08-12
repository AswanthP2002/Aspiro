import { Db, OptionalUnlessRequiredId } from "mongodb";
import IBaseRepo from "../../domain/interfaces/IBaseRepo";
import mongoose from "mongoose";

export default class BaseRepository<T> implements IBaseRepo<T> {
    constructor(private _db : Db, private _collec : string) {} //changed the collection name for testing error

    async create(data: OptionalUnlessRequiredId<T>): Promise<string | null> {
        const result = await this._db.collection(this._collec).insertOne(data)
        return result.insertedId.toString() ?? null
    }

    async findWithCandidateId(id: string): Promise<any[] | null> {
        const result = await this._db.collection(this._collec).find({candidateId:new mongoose.Types.ObjectId(id)}).toArray()
        return result
    }

    async delete(id: string): Promise<boolean> {
        const result = await this._db.collection(this._collec).deleteOne({_id:new mongoose.Types.ObjectId(id)})
        return result.acknowledged
    }
}