import UserProfileAggregatedAdmin from "../../../domain/entities/userProfileAggregated";
import userProfileAggregatedAdminDTO from "../../DTOs/userProfileAggregatedDTO";

export default function mapToUserProfileAggregatedDTO(data: UserProfileAggregatedAdmin): userProfileAggregatedAdminDTO {
    return {
     _id: data._id,
     certificates:data.certificates,
     educations:data.educations,
     experiences:data.experiences,
     posts:data.posts,
     skills:data.skills,
     coverPhoto:data.coverPhoto,
     profilePicture:data.profilePicture,
     email:data.email,
     createdAt:data.createdAt,
     dateOfBirth:data.dateOfBirth,
     facebookId:data.facebookId,
     googleId:data.googleId,
     headline:data.headline,
     isAdmin:data.isAdmin,
     isBlocked:data.isBlocked,
     isRecruiter:data.isRecruiter,
     isVerified:data.isVerified,
     linkedinId:data.linkedinId,
     location:data.location,
     name:data.name,
     otpExpiresAt:data.otpExpiresAt,
     password:data.password,
     phone:data.phone,
     role:data.role,
     socialLinks:data.socialLinks,
     summary:data.summary,
     updatedAt:data.updatedAt,
     verificationToken:data.verificationToken,
     jobs:data.jobs,
     recruiterProfile:data.recruiterProfile,
     followers:data.followers
    }
}