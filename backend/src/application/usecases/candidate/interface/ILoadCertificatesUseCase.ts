import Certificates from "../../../../domain/entities/candidate/certificates";
import CertificateDTO from "../../../DTOs/candidate/certificateDTO";

export default interface ILoadCertificateUseCase {
    execute(candidateId : string) : Promise<CertificateDTO[] | null>
}