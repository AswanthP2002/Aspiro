import PostsAggregated from '../../../domain/entities/post/PostsAggregated.entity';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import PostsAggregatedDTO from '../../DTOs/post/postsAggregated.dto';
import mapPostsAggregatedToDTO from '../../mappers/post/mapPostsAggregatedToDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IGetPostsUsecase from '../../interfaces/usecases/post/IGetPosts.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { FetchPostsRequestDTO } from '../../DTOs/post/fetchPost.request.dto';

@injectable()
export default class GetPostsUsecase implements IGetPostsUsecase {
  constructor(
    @inject('IPostRepository') private _postRepository: IPostRepo,
    @inject('IUserRepository') private _userRepository: IUserRepository
  ) {}

  async execute(dto: FetchPostsRequestDTO): Promise<PostsAggregatedDTO[] | null> {
    const { userId, limit, page } = dto;
    const userDetails = await this._userRepository.findById(userId);
    const result = await this._postRepository.getPosts(userDetails?.hiddenPosts || [], page, limit);

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
