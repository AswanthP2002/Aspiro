import CandidateAggregated from '../../../domain/entities/user/candidateAggregated.entity';
import CandidateAggregatedDTO from '../../DTOs/candidate/candidateAggregated.dto';

export default function mapCandidateAggToOverviewData(
  aggData: CandidateAggregated
): CandidateAggregatedDTO {
  return {
    _id: aggData._id,
    about: aggData.about,
    name: aggData.name,
    jobTitle: aggData.jobTitle,
    socialLinks: aggData.socialLinks,
    userId: aggData.userId,
    userDetails: aggData.userDetails,
    education: aggData.education,
    experience: aggData.experience,
    followers: aggData.followers,
    following: aggData.following,
    posts: aggData.posts,
    skills: aggData.skills,
    createdAt: aggData.createdAt,
    updatedAt: aggData.updatedAt,
    dateOfBirth: aggData.dateOfBirth,
    currentSubscription: aggData.currentSubscription,
    location: aggData.location,
    // _id:aggData._id,
    // name:aggData.name,
    // about:aggData.about,
    // coverPhoto:aggData.userDetails.coverPhoto,
    // profilePicture:aggData.profilePicture,
    // email:aggData.email,
    // role:aggData.role,
    // currentSubscription:aggData.currentSubscription,
    // facebookid:aggData.facebookid,
    // googleid:aggData.googleid,
    // isAdmin:aggData.isAdmin,
    // isBlocked:aggData.isBlocked,
    // isVerified:aggData.isVerified,
    // location:aggData.location,
    // phone:aggData.phone,
    // followers:aggData.followers,
    // following:aggData.following,
    // posts:aggData.posts,
    // socialLinks:aggData.socialLinks,
  };
}
