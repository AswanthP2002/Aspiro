import PostsAggregated from '../../../domain/entities/post/PostsAggregated.entity';
import PostsAggregatedDTO from '../../DTOs/post/postsAggregated.dto';

export default function mapPostsAggregatedToDTO(
  postAggregated: PostsAggregated
): PostsAggregatedDTO {
  return {
    _id: postAggregated._id,
    description: postAggregated.description,
    userId: postAggregated.creatorId,
    likes: postAggregated.likes,
    mediaType: postAggregated.mediaType,
    media: postAggregated.media,
    userDetails: postAggregated.userDetails,
    createdAt: postAggregated.createdAt,
    updatedAt: postAggregated.updatedAt,
    comments: postAggregated.comments,
    shares: postAggregated.shares,
    views: postAggregated.views,
  };
}
