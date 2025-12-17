import PostsAggregatedDTO from '../../../DTOs/postsAggregated.dto';

export default interface IGetPostsUsecase {
  execute(): Promise<PostsAggregatedDTO[] | null>;
}
