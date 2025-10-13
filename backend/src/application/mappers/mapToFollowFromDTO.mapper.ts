import Follow from '../../domain/entities/follow.entity';
import FollowUserDTO from '../DTOs/follow.dto';

export default function mapToFollowFromDTO(followDto: FollowUserDTO): Follow {
  return {
    type: followDto.type,
    follower: followDto.follower,
    following: followDto.following,
  };
}
