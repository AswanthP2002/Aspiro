import { inject, injectable } from 'tsyringe';
import ILikePostCommentUsecase from '../../interfaces/usecases/user/ILikePostComment.usecase';
import ICommentRepository from '../../../domain/interfaces/IComment.repository';
import CommentsDTO from '../../DTOs/comments.dto';
import LikeCommentDTO from '../../DTOs/user/likecomment.dto';
import mapCommentToCommentDTO from '../../mappers/user/mapCommentToCommentDTO.mapper';

@injectable()
export default class LikeCommentUsecase implements ILikePostCommentUsecase {
  constructor(@inject('ICommentRepository') private _commentRepo: ICommentRepository) {}

  async execute(dto: LikeCommentDTO): Promise<CommentsDTO | null> {
    const { actorId, commentId, postId, postOwnerId } = dto;
    const result = await this._commentRepo.increaseCommentLike(commentId);

    if (result) {
      const dto = mapCommentToCommentDTO(result);
      return dto;
    }

    return null;
  }
}
