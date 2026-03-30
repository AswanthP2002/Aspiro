import { inject, injectable } from 'tsyringe';
import ILikePostCommentUsecase from '../../interfaces/usecases/comment/ILikePostComment.usecase';
import ICommentRepository from '../../../domain/interfaces/IComment.repository';
import CommentsDTO from '../../DTOs/comment/comments.dto';
import LikeCommentDTO from '../../DTOs/comment/likecomment.dto';
import mapCommentToCommentDTO from '../../mappers/comment/mapCommentToCommentDTO.mapper';

@injectable()
export default class LikeCommentUsecase implements ILikePostCommentUsecase {
  constructor(@inject('ICommentRepository') private _commentRepo: ICommentRepository) {}

  async execute(dto: LikeCommentDTO): Promise<CommentsDTO | null> {
    const { actorId, commentId, postId, postOwnerId } = dto;
    const result = await this._commentRepo.increaseCommentLike(commentId);
    console.log(actorId, postId, postOwnerId);
    if (result) {
      const dto = mapCommentToCommentDTO(result);
      return dto;
    }

    return null;
  }
}
