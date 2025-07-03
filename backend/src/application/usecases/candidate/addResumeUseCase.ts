import mongoose from "mongoose";
import Resume from "../../../domain/entities/candidate/resume";
import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";
import createResumefromDTO from "../../../domain/mappers/candidate/resumeMapper";
import { ResumeSchema } from "../../../presentation/controllers/dtos/candidate/resumeDTO";
import cloudinary from "../../../utilities/cloudinary";
import streamifier from 'streamifier'
import {v4} from 'uuid'

export default class AddResumeUseCase {
    constructor(private _iResumeRepo : IResumeRepo) {}

    async execute(file : any, path : string, candidateId : string) : Promise<boolean> {
        
        const result : any = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                public_id:`candidate/documents/${path}_${new Date()}_${v4()}`,
                resource_type:'auto',
                access_mode:'public'
            }, async (error, result) => {
                if(error) reject(error)
                resolve(result)
                
            })

            streamifier.createReadStream(file).pipe(stream)
        })

        if(result){
            //save the resume
            const addResumeResult = await this._iResumeRepo.addResume(
                {
                    candidateId:new mongoose.Types.ObjectId(candidateId),
                    resumeUrlCoudinary:result?.secure_url,
                    resumePublicIdCloudinary:result?.public_id,
                    resumeFileName:path,
                    createdAt:new Date()
                }
            )
            console.log('Resume saved successfully')
            return addResumeResult
        }
        return false
    }
}