import mongoose from "mongoose";
import Certificates from "../../../domain/entities/candidate/certificates";
import ICertificateRepo from "../../../domain/interfaces/candidate/ICertificateRepo";

export default class GetCertificatesUseCase {
    constructor(private _iCertificateRepo : ICertificateRepo) {}

    async execute(candidateId : string) : Promise<Certificates[] | null> {
        const result = await this._iCertificateRepo.loadCertificates(candidateId)
        return result
    }
}