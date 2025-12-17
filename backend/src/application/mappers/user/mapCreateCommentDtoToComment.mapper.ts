import Comments from "../../../domain/entities/user/comments.entity";
import { CreateCommentDto } from "../../DTOs/comments.dto";

export default function mapCreateCommentDtoToComment(createCommentDto: CreateCommentDto) : Comments {
    return {
        postId: createCommentDto.postId,
        userId: createCommentDto.userId,
        text: createCommentDto.text,
    }
}