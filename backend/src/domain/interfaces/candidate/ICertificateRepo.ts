import Certificates from "../../entities/candidate/certificates";

export default interface ICertificateRepo {
    addCertificate(certificate : Certificates) : Promise<boolean>
    loadCertificates(candidateId : string) : Promise<Certificates[] | null>
}