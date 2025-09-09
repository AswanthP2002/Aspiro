import mongoose from "mongoose";
import Resume from "../../../domain/entities/candidate/resume";
import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";
import createResumefromDTO from "../../../domain/mappers/candidate/resumeMapper";
import { ResumeDTO, ResumeSchema } from "../../../presentation/controllers/dtos/candidate/resumeDTO";
import cloudinary from "../../../utilities/cloudinary";
import streamifier from 'streamifier'
import {v4} from 'uuid'
import IAddResumeUseCase from "./interface/IAddResumeUseCase";
import CreateResumeDTO from "../../DTOs/candidate/resumeDTO";
import { UploadApiResponse } from "cloudinary";
import mapToResumeDTOFromResume from "../../mappers/candidate/mapToResumeDTOFromResume";

// interface CloudinaryResponse {
//     secure_url : string
//     public_id : string
// }

export default class AddResumeUseCase implements IAddResumeUseCase {
    constructor(private _iResumeRepo : IResumeRepo) {}

    async execute(addResumeDto : CreateResumeDTO) : Promise<ResumeDTO | null> {
        
        const result : UploadApiResponse | undefined = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                public_id:`candidate/documents/${addResumeDto.path}_${new Date()}_${v4()}`,
                resource_type:'auto',
                access_mode:'public'
            }, async (error, result) => {
                if(error) reject(error)
                resolve(result)
                
            })

            streamifier.createReadStream(addResumeDto.file).pipe(stream)
        })

        if(result){
            //save the resume
            const addResumeResult = await this._iResumeRepo.create(
                {
                    candidateId:addResumeDto.candidateId,
                    resumeUrlCoudinary:result.secure_url,
                    resumePublicIdCloudinary:result?.public_id,
                    resumeFileName:addResumeDto.path
                }
            )

            if(addResumeResult){
                const dto = mapToResumeDTOFromResume(addResumeResult)
                return dto
            }
        }
        return null
    }
}