import Follow from '../../domain/entities/follow.entity';
import FollowUserDTO from '../DTOs/follow/follow.dto';

export default function mapToFollowFromDTO(followDto: FollowUserDTO): Follow {
  return {
    follower: followDto.follower,
    following: followDto.following,
  };
}
