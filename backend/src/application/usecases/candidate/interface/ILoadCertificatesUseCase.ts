import Certificates from "../../../../domain/entities/candidate/certificates";

export default interface ILoadCertificateUseCase {
    execute(candidateId : string) : Promise<Certificates[] | null>
}