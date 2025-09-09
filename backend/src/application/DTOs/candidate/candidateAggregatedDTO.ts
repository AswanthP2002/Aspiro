import Certificates from "../../../domain/entities/candidate/certificates"
import Education from "../../../domain/entities/candidate/educations"
import Experience from "../../../domain/entities/candidate/experience"
import FavoriteJobs from "../../../domain/entities/candidate/favoriteJobs"
import Resume from "../../../domain/entities/candidate/resume"
import Skills from "../../../domain/entities/candidate/skills"
import SocialLinks from "../../../domain/entities/socialLinks"

export default interface CandidateAggregatedDTO {
    _id: string
    name: string
    email: string
    phone: string
    about: string
    certificates: Certificates[]
    coverPhoto: {
        cloudinaryPublicId: string
        cloudinarySecureUrl: string
    },
    currentSubscription: string
    education: Education[]
    experience: Experience
    favorites: FavoriteJobs[]
    role: string
    isBlocked: boolean
    location: {
        city: string
        district: string
        state: string
        pincode: string
        country: string
    },
    profilePicture: {
        cloudinaryPublicId: string
        cloudinarySecureUrl: string
    },
    resume: Resume[]
    socialLinks: SocialLinks[]
    isVerified: boolean
    verificationToken?: string
    isAdmin: boolean
    otpExpiresAt?: Date
    googleid: string
    facebookid: string
    skills: Skills[]
}