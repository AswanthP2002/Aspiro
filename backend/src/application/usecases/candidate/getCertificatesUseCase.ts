import mongoose from "mongoose";
import Certificates from "../../../domain/entities/candidate/certificates";
import ICertificateRepo from "../../../domain/interfaces/candidate/ICertificateRepo";
import ILoadCertificateUseCase from "./interface/ILoadCertificatesUseCase";

export default class GetCertificatesUseCase implements ILoadCertificateUseCase{
    constructor(private _iCertificateRepo : ICertificateRepo) {}

    async execute(candidateId : string) : Promise<Certificates[] | null> {
        const result = await this._iCertificateRepo.findWithCandidateId(candidateId) //changed method to base repository method
        return result
    }
}