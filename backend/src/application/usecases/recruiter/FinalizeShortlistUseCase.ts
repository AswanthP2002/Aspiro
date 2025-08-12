import mongoose from "mongoose";
import Shortlist from "../../../domain/entities/recruiter/shortlist";
import IShortlistRepo from "../../../domain/interfaces/recruiter/IShortlistRepo";
import IFinalizeShortlist from "./interface/IFinalizeShortlist";

export default class FinalizeShortlistUseCase implements IFinalizeShortlist {
    constructor(private _iShortlistRepo : IShortlistRepo){}

    async execute(jobId: string, recruiterId: string, applications: any): Promise<string | null> {
        const saveShortList : Shortlist = {
            jobId:new mongoose.Types.ObjectId(jobId),
            recruiterId:new mongoose.Types.ObjectId(recruiterId),
            applicationIds:applications,
            createdAt:new Date()
        }

        const result = await this._iShortlistRepo.create(saveShortList)

        return result
    }
}