import PostsAggregated from '../../domain/entities/PostsAggregated.entity';
import IPostRepo from '../../domain/interfaces/IPostRepo';
import PostsAggregatedDTO from '../DTOs/postsAggregated.dto';
import mapPostsAggregatedToDTO from '../mappers/mapPostsAggregatedToDTO.mapper';
import IGetPosts from './interfaces/IGetPosts.usecase';

export default class GetPosts implements IGetPosts {
  constructor(private _repo: IPostRepo) {}

  async execute(): Promise<PostsAggregatedDTO[] | null> {
    const result = await this._repo.getPosts();
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
