import PostsAggregated from '../../../domain/entities/PostsAggregated.entity';
import PostsAggregatedDTO from '../../DTOs/postsAggregated.dto';

export default function mapPostsAggregatedToDTO(
  postAggregated: PostsAggregated
): PostsAggregatedDTO {
  return {
    _id: postAggregated._id,
    description: postAggregated.description,
    creatorId: postAggregated.creatorId,
    likes: postAggregated.likes,
    media: postAggregated.media,
    userDetails: postAggregated.userDetails,
    createdAt: postAggregated.createdAt,
    updatedAt: postAggregated.updatedAt,
    comments: postAggregated.comments
  };
}
