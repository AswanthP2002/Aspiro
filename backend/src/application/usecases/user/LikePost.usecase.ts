import { inject, injectable } from 'tsyringe';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import ILikePostUsecase from '../../interfaces/usecases/user/ILikePost.usecase';
import { PostDTO } from '../../DTOs/post.dto';
import mapToPostDTOFromPost from '../../mappers/mapToPostDTOFromPost.mapper';

@injectable()
export default class LikePostUsecase implements ILikePostUsecase {
  constructor(@inject('IPostRepository') private _postRepo : IPostRepo) {}

  async execute(postId: string, userId: string): Promise<PostDTO | null> {
    const result = await this._postRepo.likePost(postId, userId);

    if(result){
      const postDto = mapToPostDTOFromPost(result)
      return postDto
    }
    
    return result;
  }
}
