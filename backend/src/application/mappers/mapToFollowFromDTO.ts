import Follow from "../../domain/entities/Follow";
import FollowUserDTO from "../DTOs/FollowDTO";

export default function mapToFollowFromDTO(followDto : FollowUserDTO) : Follow {
    return {
        type:followDto.type,
        follower:followDto.follower,
        following:followDto.following
    }
}