import AdminUserListDTO from '../../../domain/entities/user/AdminUserList.entity';
import MyProfileAggregated from '../../../domain/entities/user/myProfileAggregated.entity';
import UserCachedData from '../../../domain/entities/user/user.cachedData.entity';
import User from '../../../domain/entities/user/User.FIX';
import UserFullProfileData from '../../../domain/entities/user/userFullProfile.entity';
import UserProfileAggregated from '../../../domain/entities/user/userProfileAggregated';
import { JobApplicationDTO } from '../../DTOs/jobApplication/jobApplication.dto.FIX';
import { CreateUserDto } from '../../DTOs/user/createUser.dto.FIX';
import FavoriteJobDTO from '../../DTOs/user/favoriteJob.dto.FIX';
import ProfilePictureUPloadResponseDTO from '../../DTOs/user/profileUploadResponse.dto';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto.FIX';
import UploadCoverPhotoResponseDTO from '../../DTOs/user/uploadCoverPhotoResponse.dto';
import UserDTO, { MyProfileDTO, SimilarSkillUserDTO } from '../../DTOs/user/user.dto.FIX';
import UserFullProfileDataDTO from '../../DTOs/user/user.fullProfileData.dto';
import UserMetaDataDTO from '../../DTOs/user/userMetaData.dto.FIX';
import UserOverviewForPublicDTO from '../../DTOs/user/userOverviewForPublic.dto';
import {
  AdminUserDetailsDTO,
  UserPublicProfileDTO,
} from '../../DTOs/user/userProfileAggregated.dto.FIX';

export default class UserMapper {
  public dtoToUser(userDto: CreateUserDto): User {
    return {
      name: userDto.name,
      email: userDto.email,
      phone: userDto.phone,
      password: userDto.password,
      googleId: userDto.googleId,
      linkedinId: userDto.linkedinId,
      facebookId: userDto.facebookId,
    };
  }

  public updateDtoToUser(updateDto: UpdateUserDTO): User {
    return {
      ...updateDto,
    };
  }

  public userToUserDto(user: User): UserDTO {
    return {
      _id: user._id?.toString(),
      name: user.name,
      connections: user.connections,
      coverPhoto: user.coverPhoto,
      email: user.email,
      headline: user.headline,
      location: user.location,
      phone: user.phone,
      profilePicture: user.profilePicture,
      role: user.role,
      socialLinks: user.socialLinks,
      summary: user.summary,
      createdAt: user.createdAt,
      dateOfBirth: user.dateOfBirth,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
      isRecruiter: user.isRecruiter,
      isVerified: user.isVerified,
      updatedAt: user.updatedAt,
      isDeleted: user.isDeleted,
      isBanned: user.isBanned,
      accountActions: user.accountActions,
    };
  }

  public userProfileAggregatedDataToUserOverviewToPublicDTO(
    data: UserProfileAggregated
  ): UserOverviewForPublicDTO {
    return {
      _id: data._id,
      name: data.name,
      headline: data.headline,
      role: data.role,
      summary: data.summary,
      profilePicture: data.profilePicture,
      connections: data.connections,
      followers: data.followers,
      skills: data.skills,
      experience: data.experiences,
      isRecruiter: data.isRecruiter,
      connectionRequests: data.connectionRequests,
      isVerifiedRecruiter: data.recruiterProfile?.isVerified ? true : false,
    };
  }

  public userToMyProfileDTO(data: User): MyProfileDTO {
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      headline: data.headline,
      socialLinks: data.socialLinks,
      profilePicture: data.profilePicture,
      connections: data.connections?.length,
      coverPhoto: data.coverPhoto,
      summary: data.summary,
      location: data.location,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public myProfileAggregatedToDTO(data: MyProfileAggregated): MyProfileDTO {
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      headline: data.headline,
      socialLinks: data.socialLinks,
      profilePicture: data.profilePicture,
      connections: data.connections?.length,
      coverPhoto: data.coverPhoto,
      summary: data.summary,
      location: data.location,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      followers: data.followers?.length,
      applicationsCount: data.applicationsCount as JobApplicationDTO[],
      savedJobs: data.savedJobs as FavoriteJobDTO[],
      views: data.views,
    };
  }

  public userAggregatedToPublicProfileDTO(data: UserProfileAggregated): UserPublicProfileDTO {
    return {
      _id: data._id as string,
      name: data.name as string,
      certificates: data.certificates,
      connections: data.connections as string[],
      educations: data.educations,
      experiences: data.experiences,
      followers: data.followers,
      following: data.following,
      headline: data.headline as string,
      jobs: data.jobs,
      posts: data.posts,
      recruiterProfile: data.recruiterProfile,
      skills: data.skills,
      summary: data.summary as string,
      profilePicture: data.profilePicture,
      coverPhoto: data.coverPhoto,
      email: data.email,
      location: data.location,
      isRecruiter: data.isRecruiter,
      role: data.role,
      socialLinks: data.socialLinks,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      connectionRequests: data.connectionRequests,
    };
  }

  public userToUserMetaDataDTO(data: UserCachedData): UserMetaDataDTO {
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
      headline: data.headline,
      role: data.role,
      profilePicture: data.profilePicture,
      subscription: {
        name: data.subscription.name,
        planId: data.subscription.planId,
        subscriptionId: data.subscription.planId,
      },
    };
  }

  public userToProfilePictureUploadResponseDTO(data: User): ProfilePictureUPloadResponseDTO {
    return {
      url: data.profilePicture?.cloudinarySecureUrl as string,
      publicId: data.profilePicture?.cloudinaryPublicId as string,
    };
  }

  public userToCoverPhotoUploadResponseDTO(data: User): UploadCoverPhotoResponseDTO {
    return {
      url: data.coverPhoto?.cloudinarySecureUrl as string,
      publicId: data.profilePicture?.cloudinaryPublicId as string,
    };
  }

  public userProfileAggregatedToAdminUserDetailsDTO(
    data: UserProfileAggregated
  ): AdminUserDetailsDTO {
    return {
      _id: data._id as string,
      name: data.name as string,
      summary: data.summary as string,
      role: data.role,
      educations: data.educations,
      experiences: data.experiences,
      skills: data.skills,
      posts: data.posts,
      isBanned: data.isBanned,
      isBlocked: data.isBlocked,
      profilePicture: data.profilePicture,
      email: data.email as string,
      isRecruiter: data.isRecruiter,
      isVerified: data.isVerified,
      location: data.location,
      lastLogin: data.lastLogin,
      createdAt: data.createdAt,
      accountActions: data.accountActions,
      googleId: data.googleId,
    };
  }

  public userEntityToAdminUserListDTO(data: User): AdminUserListDTO {
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
      isBanned: data.isBanned,
      isVerified: data.isVerified,
      isBlocked: data.isBlocked,
      isDeleted: data.isDeleted,
      profilePicture: data.profilePicture,
      role: data.role,
      createdAt: data.createdAt,
    };
  }

  public UserToSimilarUserDTO(data: User): SimilarSkillUserDTO {
    return {
      _id: data._id as string,
      name: data.name as string,
      headline: data.headline as string,
      profilePicture: data.profilePicture?.cloudinarySecureUrl as string,
    };
  }

  public userFullProfileEntityToDTO(data: UserFullProfileData): UserFullProfileDataDTO {
    return {
      _id: data._id,
      name: data.name,
      summary: data.summary,
      headline: data.headline,
      email: data.email,
      phone: data.phone,
      location: {
        city: data.location?.city as string,
        district: data.location?.district as string,
        state: data.location?.state as string,
        country: data.location?.country as string,
        pincode: data.location?.pincode as string,
      },
      educations: data.educations,
      experiences: data.experiences,
      skills: data.skills,
      certificates: data.certificates,
    };
  }
}
