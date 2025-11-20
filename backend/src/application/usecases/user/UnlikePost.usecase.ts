import { inject, injectable } from 'tsyringe';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import IUnlikePostUsecase from '../../interfaces/usecases/user/IUnlikePost.usecase';
import { PostDTO } from '../../DTOs/post.dto';
import mapToPostDTOFromPost from '../../mappers/mapToPostDTOFromPost.mapper';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';


@injectable()
export default class UnlikePostUsecase implements IUnlikePostUsecase {
  constructor(
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter : IRealTimeEventEmitter,
    @inject('IPostRepository') private _postRepo: IPostRepo
  ) {}

  async execute(postId: string, userId: string): Promise<PostDTO | null> {
    const result = await this._postRepo.unlikePost(postId, userId);
    
    if(result){
      const postDto = mapToPostDTOFromPost(result)
      
      //brodcast the like event to all users
      this._realTimeEventEmitter.postUnliked(postId, userId)


      return postDto
    }

    return result
  }
}
