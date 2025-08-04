import mongoose from "mongoose";
import Certificates from "../../../domain/entities/candidate/certificates";
import ICertificateRepo from "../../../domain/interfaces/candidate/ICertificateRepo";
import createCertificatefromDTO from "../../../domain/mappers/candidate/certificateMapper";
import { CertificateSchema } from "../../../presentation/controllers/dtos/candidate/certificateDTO";
import streamifier from 'streamifier'
import cloudinary from "../../../utilities/cloudinary";
import { v4 } from "uuid";
import IAddCertificateUseCase from "./interface/IAddCertificateUseCase";

export default class AddCertificateUseCase implements IAddCertificateUseCase {
    constructor(private _iCertificateRepo : ICertificateRepo) {}

    async execute(certificate : Certificates, fileBuffer : any,  path : string, candidateId : string) : Promise<string | null> {
        const parsedCertificate = CertificateSchema.parse(certificate)
        const certificateModal = createCertificatefromDTO(parsedCertificate)
        certificateModal.candidateId = new mongoose.Types.ObjectId(candidateId)

        let result : any = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                public_id:`candidate/documents/${path}_${new Date()}_${v4()}.pdf`,
                resource_type:'raw',
                type:'upload',
                access_mode:'public'
            }, (err, result) => {
                if(err) reject(err)
                
                resolve(result)
            })

            streamifier.createReadStream(fileBuffer).pipe(stream)
        })
        if(result){
            const {secure_url, public_id} = result
            certificateModal.certificateUrl = secure_url
            certificateModal.certificatePublicId = public_id

            return await this._iCertificateRepo.create(certificateModal)
        }

        return null

    }
}