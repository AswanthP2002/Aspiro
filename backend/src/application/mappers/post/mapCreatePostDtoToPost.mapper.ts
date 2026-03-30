import Post from '../../../domain/entities/post/Post';

export default function mapCreatePostDtoToPost(createPostDto: {
  description: string;
  userId: string;
  media: { cloudUrl: string; publicId: string };
  mediaType: string;
}): Post {
  return {
    description: createPostDto.description,
    userId: createPostDto.userId,
    media: {
      cloudUrl: createPostDto.media.cloudUrl,
      publicId: createPostDto.media.publicId,
    },
    mediaType: createPostDto.mediaType,
    likes: [],
  };
}

// used empty strings for testing purpose
