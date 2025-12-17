import Follow from '../../domain/entities/follow.entity';
import { FollowUserResDTO } from '../DTOs/follow.dto';

export default function mapToFollowDTOFromFollow(
  follow: Follow
): FollowUserResDTO {
  return {
    _id: follow._id,
    follower: follow.follower,
    following: follow.following,
    createdAt: follow.createdAt,
    updatedAt: follow.updatedAt,
  };
}
