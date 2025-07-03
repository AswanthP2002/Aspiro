import { certificateDTO } from "../../../presentation/controllers/dtos/candidate/certificateDTO";
import Certificates from "../../entities/candidate/certificates";

export default function createCertificatefromDTO(dto : certificateDTO) : Certificates {
    return {
        ...dto
    }
}