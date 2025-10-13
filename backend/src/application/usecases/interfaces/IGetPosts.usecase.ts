import PostsAggregatedDTO from '../../DTOs/postsAggregated.dto';

export default interface IGetPosts {
  execute(): Promise<PostsAggregatedDTO[] | null>;
}
