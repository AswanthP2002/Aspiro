import mongoose from "mongoose";
import Certificates from "../../../domain/entities/candidate/certificates";
import ICertificateRepo from "../../../domain/interfaces/candidate/ICertificateRepo";
import ILoadCertificateUseCase from "./interface/ILoadCertificatesUseCase";
import CertificateDTO from "../../DTOs/candidate/certificateDTO";
import mapToCertificateDTOFromCertificate from "../../mappers/candidate/mapToCertificateDTOFromCertificate";

export default class GetCertificatesUseCase implements ILoadCertificateUseCase{
    constructor(private _iCertificateRepo : ICertificateRepo) {}

    async execute(candidateId : string) : Promise<CertificateDTO[] | null> {
        const result = await this._iCertificateRepo.findWithCandidateId(candidateId) //changed method to base repository method
        if(result){
            const dto : CertificateDTO[] = []
            result.forEach((certificate : Certificates) => {
                dto.push(mapToCertificateDTOFromCertificate(certificate))
            })

            return dto
        }
        return null
    }
}