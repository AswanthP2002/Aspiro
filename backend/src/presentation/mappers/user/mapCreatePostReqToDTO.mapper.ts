import CreatePostDTO from "../../../application/DTOs/post.dto";
import CreatePostRequestDto from "../../DTOs/user/createPostRequest.dto";

export default function mapCreatePostReqToDTO(requestDto : CreatePostRequestDto) : CreatePostDTO {
    return {
        creatorId:requestDto.creatorId,
        media:requestDto.media,
        description:requestDto.description
    }
}