import Certificates from "../../../domain/entities/candidate/certificates";
import CertificateDTO from "../../DTOs/candidate/certificateDTO";

export default function mapToCertificateDTOFromCertificate(certificate : Certificates) : CertificateDTO {
    return {
        _id:certificate._id,
        certificateId:certificate.certificateId,
        issuedOrganization:certificate.issuedOrganization,
        issuedDate:certificate.issuedDate,
        certificateUrl:certificate.certificateUrl,
        certificatePublicId:certificate.certificatePublicId,
        candidateId:certificate.candidateId,
        createdAt:certificate.createdAt
    }
}