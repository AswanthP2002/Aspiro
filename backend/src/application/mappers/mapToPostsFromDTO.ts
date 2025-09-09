import Post from "../../domain/entities/Post";
import CreatePostDTO from "../DTOs/PostDTO";

export default function mapToPostFromDTO(createPostDto : CreatePostDTO) : Post {
    return{
        content:createPostDto.content,
        media:createPostDto.media,
        creatorType:createPostDto.creatorType,
        likes:createPostDto.likes,
        creatorId:createPostDto.creatorId
    }
}