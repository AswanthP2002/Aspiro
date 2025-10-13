import PostsAggregated from '../../domain/entities/PostsAggregated.entity';
import PostsAggregatedDTO from '../DTOs/postsAggregated.dto';

export default function mapPostsAggregatedToDTO(
  postAggregated: PostsAggregated
): PostsAggregatedDTO {
  return {
    _id: postAggregated._id,
    content: postAggregated.content,
    creatorId: postAggregated.creatorId,
    creatorType: postAggregated.creatorType,
    likes: postAggregated.likes,
    media: postAggregated.media,
    createdUserDetails: postAggregated.createdUserDetails,
    profileDetails: postAggregated.profileDetails,
    createdAt: postAggregated.createdAt,
    updatedAt: postAggregated.updatedAt,
  };
}
