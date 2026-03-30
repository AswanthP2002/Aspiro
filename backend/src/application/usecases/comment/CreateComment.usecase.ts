import { inject, injectable } from 'tsyringe';
import ICreateCommentUsecase from '../../interfaces/usecases/comment/ICreateComment.usecase';
import ICommentRepository from '../../../domain/interfaces/IComment.repository';
import CommentsDTO, { CreateCommentDto } from '../../DTOs/comment/comments.dto';
import mapCreateCommentDtoToComment from '../../mappers/comment/mapCreateCommentDtoToComment.mapper';
import mapCommentToCommentDTO from '../../mappers/comment/mapCommentToCommentDTO.mapper';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';

@injectable()
export default class CreateCommentUsecase implements ICreateCommentUsecase {
  constructor(
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
    @inject('ICommentRepository') private _commentRepo: ICommentRepository
  ) {}

  async execute(createCommentDto: CreateCommentDto): Promise<CommentsDTO | null> {
    let depth = 0;
    if (createCommentDto.parentId) {
      const parentComment = await this._commentRepo.findById(createCommentDto.parentId);
      if (parentComment) {
        depth = (parentComment.depth || 0) + 1;
      }
    }
    const newComment = mapCreateCommentDtoToComment({ ...createCommentDto, depth: depth });
    //  console.log('comment data before saving in the database', newComment)
    const result = await this._commentRepo.create(newComment);

    if (result) {
      const commentDto = mapCommentToCommentDTO(result);
      //   this._realTimeEventEmitter.addPostComment(
      //     commentDto.postId as string,
      //     commentDto.userId as string,
      //     commentDto._id as string,
      //     commentDto.text
      //   );
      return commentDto;
    }

    return result;
  }
}
