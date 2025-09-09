import { Db, OptionalUnlessRequiredId } from "mongodb";
import IBaseRepo from "../../domain/interfaces/IBaseRepo";
import mongoose, { Document, Model } from "mongoose";

export default class BaseRepository<T> implements IBaseRepo<T> {
    private readonly _model : Model<T>
    constructor(model : Model<T>) {
        this._model = model
    } //changed the collection name for testing error

    async create(entity : T): Promise<T | null> {
        const result = await this._model.insertOne(entity)
        //const result = await this._db.collection(this._collec).insertOne(data)
        return result.toObject()
    }

    async findWithCandidateId(id: string): Promise<T[] | null> { // not applicable
        const result = await this._model.find({candidateId : new mongoose.Types.ObjectId(id)})
        // const result = await this._db.collection(this._collec).find({candidateId:new mongoose.Types.ObjectId(id)}).toArray()
        return result
    }

    async delete(id: string): Promise<void> {
        await this._model.deleteOne({_id:new mongoose.Types.ObjectId(id)})
        // const result = await this._db.collection(this._collec).deleteOne({_id:new mongoose.Types.ObjectId(id)})
    }
}