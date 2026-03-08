import { inject, injectable } from 'tsyringe';
import ICommentRepository from '../../../domain/interfaces/IComment.repository';
import CommentsDTO from '../../DTOs/comments.dto';
import mapCommentToCommentDTO from '../../mappers/user/mapCommentToCommentDTO.mapper';
import IUnlikeCommentUsecase from '../../interfaces/usecases/user/IUnlikeComment.usecase';
import UnlikeCommentDTO from '../../DTOs/user/unlikeComment.dto';

@injectable()
export default class UnlikeCommentUsecase implements IUnlikeCommentUsecase {
  constructor(@inject('ICommentRepository') private _commentRepo: ICommentRepository) {}

  async execute(dto: UnlikeCommentDTO): Promise<CommentsDTO | null> {
    const { actorId, commentId, postId, postOwnerId } = dto;
    const result = await this._commentRepo.decreaseCommentLike(commentId);

    if (result) {
      const dto = mapCommentToCommentDTO(result);
      return dto;
    }

    return null;
  }
}
