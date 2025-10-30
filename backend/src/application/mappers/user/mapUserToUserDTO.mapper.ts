import User, { Role } from '../../../domain/entities/user/User';
import UserDTO from '../../DTOs/user/user.dto';

export default function mapUserToUserDTO(user: User): UserDTO {
  return {
    _id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    role:user.role,
    isBlocked:user.isBlocked,
    isVerified:user.isVerified,
    createdAt:user.createdAt,
    updatedAt:user.updatedAt,
    coverPhoto:user.coverPhoto,
    profilePicture:user.profilePicture,
    isAdmin:user.isAdmin,
    isRecruiter:user.isRecruiter,
    verificationToken:user.verificationToken,
    dateOfBirth:user.dateOfBirth,
    socialLinks:user.socialLinks,
    location:user.location,
    facebookId:user.facebookId,
    linkedinId:user.linkedinId,
    googleId:user.googleId,
    headline:user.headline,
    summary:user.summary,
  };
}
