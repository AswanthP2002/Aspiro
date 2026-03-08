import MyProfileAggregated from '../../../domain/entities/user/myProfileAggregated.entity';
import UserCachedData from '../../../domain/entities/user/user.cachedData.entity';
import User from '../../../domain/entities/user/User.FIX';
import UserProfileAggregated from '../../../domain/entities/userProfileAggregated';
import { CreateUserDto } from '../../DTOs/user/createUser.dto.FIX';
import ProfilePictureUPloadResponseDTO from '../../DTOs/user/profileUploadResponse.dto';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto.FIX';
import UploadCoverPhotoResponseDTO from '../../DTOs/user/uploadCoverPhotoResponse.dto';
import UserDTO, { MyProfileDTO } from '../../DTOs/user/user.dto.FIX';
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
      connectionRequests: data.connectionRequests,
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
    };
  }
}
