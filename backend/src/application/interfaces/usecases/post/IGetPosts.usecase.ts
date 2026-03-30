import { FetchPostsRequestDTO } from '../../../DTOs/post/fetchPost.request.dto';
import PostsAggregatedDTO from '../../../DTOs/post/postsAggregated.dto';

export default interface IGetPostsUsecase {
  execute(dto: FetchPostsRequestDTO): Promise<PostsAggregatedDTO[] | null>;
}
