import { inject, injectable } from 'tsyringe';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import ILikePostUsecase from '../../interfaces/usecases/user/ILikePost.usecase';
import { PostDTO } from '../../DTOs/post.dto';
import mapToPostDTOFromPost from '../../mappers/mapToPostDTOFromPost.mapper';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';

@injectable()
export default class LikePostUsecase implements ILikePostUsecase {
  constructor(
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter : IRealTimeEventEmitter,
    @inject('IPostRepository') private _postRepo : IPostRepo
  ) {}

  async execute(postId: string, userId: string): Promise<PostDTO | null> {
    const result = await this._postRepo.likePost(postId, userId);

    if(result){
      const postDto = mapToPostDTOFromPost(result)

      //brodcast the like event to all users
      this._realTimeEventEmitter.postLiked(postId, userId)

      return postDto
    }
    
    return result;
  }
}
