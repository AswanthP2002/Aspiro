import Recruiter from "../../../domain/entities/recruiter/recruiter";
import { RecruiterDTO } from "../../DTOs/recruiter/recruiterDTO";

export default function mapToRecruiterDtoFromRecruiter(recruiter : Recruiter) : RecruiterDTO {
    return {
        _id:recruiter._id,
        email:recruiter.email,
        password:recruiter.password,
        username:recruiter.username,
        about:recruiter.about,
        benefit:recruiter.benefit,
        companyName:recruiter.companyName,
        companyType:recruiter.companyType,
        coverphoto:recruiter.coverphoto,
        foundIn:recruiter.foundIn,
        industry:recruiter.industry,
        isBlocked:recruiter.isBlocked,
        isVerified:recruiter.isVerified,
        location:recruiter.location,
        logo:recruiter.logo,
        otpExpiresAt:recruiter.otpExpiresAt,
        phone:recruiter.phone,
        socialLinks:recruiter.socialLinks,
        teamStrength:recruiter.teamStrength,
        currentSubscription:recruiter.currentSubscription,
        verificationToken:recruiter.verificationToken,
        vision:recruiter.vision,
        website:recruiter.website,
        createdAt:recruiter.createdAt,
        updatedAt:recruiter.updatedAt
    }
}