import Certificates from "../../../../domain/entities/candidate/certificates";
import CertificateDTO, { CreateCertificateDTO } from "../../../DTOs/candidate/certificateDTO";


export default interface IAddCertificateUseCase {
    execute(createCertificateDto : CreateCertificateDTO) : Promise<CertificateDTO | null>
}