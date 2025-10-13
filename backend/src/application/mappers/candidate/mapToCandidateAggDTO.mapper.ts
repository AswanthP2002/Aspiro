import CandidateAggregatedDTO from '../../DTOs/candidate/candidateAggregated.dto';
import CandidateAggregated from '../../DTOs/candidate/candidateAggregated.dto';

export default function mapToCandidateAggDTO(
  candidateAggData: CandidateAggregated
): CandidateAggregatedDTO {
  return {
    _id: candidateAggData._id,
    about: candidateAggData.about,
    createdAt: candidateAggData.createdAt,
    currentSubscription: candidateAggData.currentSubscription,
    dateOfBirth: candidateAggData.dateOfBirth,
    name: candidateAggData.name,
    jobTitle: candidateAggData.jobTitle,
    socialLinks: candidateAggData.socialLinks,
    updatedAt: candidateAggData.updatedAt,
    userDetails: candidateAggData.userDetails,
    userId: candidateAggData.userId,
    education: candidateAggData.education,
    experience: candidateAggData.experience,
    followers: candidateAggData.followers,
    following: candidateAggData.following,
    posts: candidateAggData.posts,
    skills: candidateAggData.skills,
    location: candidateAggData.location,
    // _id:candidateAggData._id,
    // about:candidateAggData.about,
    // certificates:candidateAggData.certificates,
    // coverPhoto:candidateAggData.coverPhoto,
    // currentSubscription:candidateAggData.currentSubscription,
    // education:candidateAggData.education,
    // email:candidateAggData.email,
    // experience:candidateAggData.experience,
    // facebookid:candidateAggData.facebookid,
    // favorites:candidateAggData.favorites,
    // googleid:candidateAggData.googleid,
    // isAdmin:candidateAggData.isAdmin,
    // isBlocked:candidateAggData.isBlocked,
    // isVerified:candidateAggData.isVerified,
    // location:candidateAggData.location,
    // name:candidateAggData.name,
    // phone:candidateAggData.phone,
    // profilePicture:candidateAggData.profilePicture,
    // resume:candidateAggData.resume,
    // role:candidateAggData.role,
    // skills:candidateAggData.skills,
    // socialLinks:candidateAggData.socialLinks,
    // posts:candidateAggData.posts,
    // followers:candidateAggData.followers,
    // following:candidateAggData.following
  };
}
