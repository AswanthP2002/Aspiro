import PostsAggregatedDTO from '../../../DTOs/postsAggregated.dto';

export default interface IGetPostsUsecase {
  execute(userId: string): Promise<PostsAggregatedDTO[] | null>;
}
