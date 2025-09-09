import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";

export default function mapToCandidateDTO(candidate : Candidate) : CandidateDTO {
    return {
        name:candidate.name,
        email:candidate.email,
        phone:candidate.phone,
        password:candidate.password,
        about:candidate.about,
        _id:candidate._id,
        coverPhoto:candidate.coverPhoto,
        createdAt:candidate.createdAt,
        currentSubscription:candidate.currentSubscription,
        dateOfBirth:candidate.dateOfBirth,
        facebookid:candidate.facebookid,
        googleid:candidate.googleid,
        isAdmin:candidate.isAdmin,
        isBlocked:candidate.isBlocked,
        isVerified:candidate.isVerified,
        location:candidate.location,
        otpExpiresAt:candidate.otpExpiresAt,
        profilePicture:candidate.profilePicture,
        role:candidate.role,
        socialLinks:candidate.socialLinks,
        updatedAt:candidate.updatedAt,
        verificationToken:candidate.verificationToken
    }
}