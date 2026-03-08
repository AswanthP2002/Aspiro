import PostsAggregated from '../../domain/entities/PostsAggregated.entity';
import IPostRepo from '../../domain/interfaces/IPostRepo';
import PostsAggregatedDTO from '../DTOs/postsAggregated.dto';
import mapPostsAggregatedToDTO from '../mappers/user/mapPostsAggregatedToDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IGetPostsUsecase from '../interfaces/usecases/user/IGetPosts.usecase';
import IUserRepository from '../../domain/interfaces/IUserRepo';

@injectable()
export default class GetPostsUsecase implements IGetPostsUsecase {
  constructor(
    @inject('IPostRepository') private _postRepository: IPostRepo,
    @inject('IUserRepository') private _userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<PostsAggregatedDTO[] | null> {
    const userDetails = await this._userRepository.findById(userId)
    const result = await this._postRepository.getPosts(userDetails?.hiddenPosts || []);
    
    if (result) {
      const dto: PostsAggregatedDTO[] = [];
      result.forEach((postsAgg: PostsAggregated) => {
        dto.push(mapPostsAggregatedToDTO(postsAgg));
      });

      return dto;
    }
    return result;
  }
}
