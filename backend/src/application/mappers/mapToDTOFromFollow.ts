import Follow from "../../domain/entities/Follow";
import { FollowUserResDTO } from "../DTOs/FollowDTO";

export default function mapToFollowDTOFromFollow(follow : Follow) : FollowUserResDTO {
    return {
        _id:follow._id,
        follower:follow.follower,
        following:follow.following,
        type:follow.type,
        createdAt:follow.createdAt,
        updatedAt:follow.updatedAt
    }
}