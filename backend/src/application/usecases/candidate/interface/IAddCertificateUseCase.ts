import Certificates from "../../../../domain/entities/candidate/certificates";


export default interface IAddCertificateUseCase {
    execute(certificate : Certificates, fileBuffer : any, path : string, candidateId : string) : Promise<string | null>
}