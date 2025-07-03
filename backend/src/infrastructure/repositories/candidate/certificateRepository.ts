import mongoose from "mongoose";
import Certificates from "../../../domain/entities/candidate/certificates";
import ICertificateRepo from "../../../domain/interfaces/candidate/ICertificateRepo";
import { connectDb } from "../../database/connection";

export default class CertificateRepository implements ICertificateRepo {
    private _collection : string
    constructor(){
        this._collection = 'certificate'
    }

    async addCertificate(certificate: Certificates): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Certificates>(this._collection).insertOne(certificate)
        return result.acknowledged
    }

    async loadCertificates(candidateId: string): Promise<Certificates[] | null> {
        const db = await connectDb()
        const result = await db.collection<Certificates>(this._collection).find({candidateId:new mongoose.Types.ObjectId(candidateId)}).toArray()
        return result
    }
}