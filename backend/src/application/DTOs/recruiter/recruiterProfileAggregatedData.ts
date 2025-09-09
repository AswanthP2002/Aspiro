import Job from "../../../domain/entities/job"
import SocialLinks from "../../../domain/entities/socialLinks"

export default interface RecruiterProfileAggregated {
    _id?: string
    username: string
    email: string
    password: string
    about: string
    benefit: string
    companyName: string
    companyType: string
    coverphoto: string
    createdAt?: Date
    foundIn: string
    industry: string
    lcoation: {
        city: string
        country: string
        state: string
        pinCode: string
    },
    phone: string
    logo: {
        cloudinaryPublicId: string,
        cloudinarySecureUrl: string
    }
    socialLinks: SocialLinks[]
    teamStrength: string
    updatedAt?: Date
    vision: string
    website: string
    isVerified: boolean
    isBlocked: boolean
    verificationToken: string
    otpExpiresAt: Date
    jobs: Job[]
}


export interface RecruiterProfileAggregatedDTO {
    _id?: string
    username: string
    email: string
    password: string
    about: string
    benefit: string
    companyName: string
    companyType: string
    coverphoto: string
    createdAt?: Date
    foundIn: string
    industry: string
    lcoation: {
        city: string
        country: string
        state: string
        pinCode: string
    },
    phone: string
    logo: {
        cloudinaryPublicId: string,
        cloudinarySecureUrl: string
    }
    socialLinks: SocialLinks[]
    teamStrength: string
    updatedAt?: Date
    vision: string
    website: string
    isVerified: boolean
    isBlocked: boolean
    verificationToken: string
    otpExpiresAt: Date
    jobs: Job[]
}