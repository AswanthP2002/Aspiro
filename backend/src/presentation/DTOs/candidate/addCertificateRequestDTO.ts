export interface AddCertificateRequestDTO {
    candidateId? : string
    issuedOrganization : string
    issuedDate : Date
    certificateId? : string
    file : any
    path : any
}