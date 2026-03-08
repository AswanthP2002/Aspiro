import Follow from '../../../domain/entities/follow.entity';
import FollowUserDTO, { FollowUserResDTO } from '../../DTOs/follow.dto';

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
}
