import Post from "../../domain/entities/Post";
import { CreatePostResDTO } from "../DTOs/PostDTO";

export default function mapToPostDTOFromPost(post : Post) : CreatePostResDTO {
    return {
        _id:post._id,
        content:post.content,
        creatorType:post.creatorType,
        media:post.media,
        likes:post.likes,
        createdAt:post.createdAt,
        updatedAt:post.updatedAt,
        creatorId:post.creatorId
    }
}