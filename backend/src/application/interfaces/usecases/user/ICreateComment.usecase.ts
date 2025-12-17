import CommentsDTO, { CreateCommentDto } from "../../../DTOs/comments.dto";

export default interface ICreateCommentUsecase {
    execute(createCommentDto: CreateCommentDto) : Promise<CommentsDTO | null>
}