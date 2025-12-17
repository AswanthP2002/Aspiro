

export default interface CertificateDTO {
    _id? : string
    candidateId? : string
    issuedOrganization : string
    issuedDate : Date
    certificateId? : string
    certificateUrl? : string
    certificatePublicId? : string
    createdAt? : Date
}



export interface CreateCertificateDTO {
    candidateId? : string
    issuedOrganization : string
    issuedDate : Date
    certificateId? : string
    file : any
    path : any
}