import CommentsDTO, { CreateCommentDto } from '../../../DTOs/comment/comments.dto';

export default interface ICreateCommentUsecase {
  execute(createCommentDto: CreateCommentDto): Promise<CommentsDTO | null>;
}
