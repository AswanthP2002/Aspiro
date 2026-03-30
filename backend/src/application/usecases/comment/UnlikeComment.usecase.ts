import { inject, injectable } from 'tsyringe';
import ICommentRepository from '../../../domain/interfaces/IComment.repository';
import CommentsDTO from '../../DTOs/comment/comments.dto';
import mapCommentToCommentDTO from '../../mappers/comment/mapCommentToCommentDTO.mapper';
import IUnlikeCommentUsecase from '../../interfaces/usecases/comment/IUnlikeComment.usecase';
import UnlikeCommentDTO from '../../DTOs/comment/unlikeComment.dto';

@injectable()
export default class UnlikeCommentUsecase implements IUnlikeCommentUsecase {
  constructor(@inject('ICommentRepository') private _commentRepo: ICommentRepository) {}

  async execute(dto: UnlikeCommentDTO): Promise<CommentsDTO | null> {
    const { commentId } = dto;
    const result = await this._commentRepo.decreaseCommentLike(commentId);

    if (result) {
      const dto = mapCommentToCommentDTO(result);
      return dto;
    }

    return null;
  }
}
