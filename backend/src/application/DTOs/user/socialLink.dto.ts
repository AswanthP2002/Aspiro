//candidateId: string, domain: string, url: string

export default interface AddSocialLinkDTO {
    userId? : string
    domain : string
    url : string
}

export interface RemoveSocialLinkDTO {
    userId?: string
    domain: string
}