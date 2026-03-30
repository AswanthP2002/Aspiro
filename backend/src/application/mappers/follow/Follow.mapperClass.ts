import Follow from '../../../domain/entities/follow/follow.entity';
import FollowerUserDetails from '../../../domain/entities/follow/followerUserDetails.entity';
import FollowingUserDetails from '../../../domain/entities/follow/followingUserDetails..entity';
import FollowUserDTO, {
  FollowersDTO,
  FollowingsDTO,
  FollowUserResDTO,
} from '../../DTOs/follow/follow.dto';

export default class FollowMapper {
  public followDTOtoFollowEntity(dto: FollowUserDTO): Follow {
    return {
      follower: dto.follower,
      following: dto.following,
    };
  }

  public followEntityToFollowResponseDTO(data: Follow): FollowUserResDTO {
    return {
      _id: data._id,
      follower: data.follower,
      following: data.following,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public followerUserDetailsToFollowerDTO(data: FollowerUserDetails): FollowersDTO {
    return {
      _id: data._id,
      follower: data.follower,
      following: data.following,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      userDetails: {
        _id: data.userDetails?._id,
        name: data.userDetails?.name,
        headline: data.userDetails?.headline,
        profilePicture: data.userDetails?.profilePicture?.cloudinarySecureUrl,
      },
    };
  }

  public followingUserDetailsToFolloingDTO(data: FollowingUserDetails): FollowingsDTO {
    return {
      _id: data._id,
      follower: data.follower,
      following: data.following,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      userDetails: {
        _id: data.userDetails?._id,
        name: data.userDetails?.name,
        headline: data.userDetails?.headline,
        profilePicture: data.userDetails?.profilePicture?.cloudinarySecureUrl,
      },
    };
  }
}
