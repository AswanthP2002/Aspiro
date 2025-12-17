import { CreateCommentDto } from "../../../application/DTOs/comments.dto";
import CreateCommentRequestDTO from "../../DTOs/user/createCommentRequestDTO";

export default function mapCreateCommentReqToDTO(requestDto: CreateCommentRequestDTO) : CreateCommentDto{
    return {
        postId: requestDto.postId,
        userId: requestDto.userId,
        text: requestDto.text
    }
}