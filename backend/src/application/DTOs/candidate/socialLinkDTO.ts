//candidateId: string, domain: string, url: string

export default interface AddSocialLinkDTO {
    candidateId : string
    domain : string
    url : string
}

export interface RemoveSocialLinkDTO {
    candidateId: string
    domain: string
}