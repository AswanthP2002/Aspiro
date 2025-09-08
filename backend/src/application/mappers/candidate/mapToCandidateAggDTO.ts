import CandidateAggregatedDTO from "../../DTOs/candidate/candidateAggregatedDTO";
import CandidateAggregated from "../../DTOs/candidate/candidateAggregatedDTO";

export default function mapToCandidateAggDTO(candidateAggData : CandidateAggregated) : CandidateAggregatedDTO {
    return {
        _id:candidateAggData._id,
        about:candidateAggData.about,
        certificates:candidateAggData.certificates,
        coverPhoto:candidateAggData.coverPhoto,
        currentSubscription:candidateAggData.currentSubscription,
        education:candidateAggData.education,
        email:candidateAggData.email,
        experience:candidateAggData.experience,
        facebookid:candidateAggData.facebookid,
        favorites:candidateAggData.favorites,
        googleid:candidateAggData.googleid,
        isAdmin:candidateAggData.isAdmin,
        isBlocked:candidateAggData.isBlocked,
        isVerified:candidateAggData.isVerified,
        location:candidateAggData.location,
        name:candidateAggData.name,
        phone:candidateAggData.phone,
        profilePicture:candidateAggData.profilePicture,
        resume:candidateAggData.resume,
        role:candidateAggData.role,
        skills:candidateAggData.skills,
        socialLinks:candidateAggData.socialLinks
    }
}