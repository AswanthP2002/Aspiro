import Post from '../../domain/entities/Post.entity';
import IPostRepo from '../../domain/interfaces/IPostRepo';
import imgUploadToCloudinary from '../../services/uploadToCloudinary';
import CreatePostDTO, { CreatePostResDTO } from '../DTOs/post.dto';
import mapToPostDTOFromPost from '../mappers/mapToPostDTOFromPost.mapper';
import mapToPostFromDTO from '../mappers/mapToPostsFromDTO.mapper';
import ICreatPost from './interfaces/ICreatePost.usecase';

export default class CreatePost implements ICreatPost {
  constructor(private _repo: IPostRepo) {}

  async execute(
    createPostDto: CreatePostDTO
  ): Promise<CreatePostResDTO | null> {
    const cloudinaryUplodResult: any = await imgUploadToCloudinary(
      createPostDto.media,
      'posts',
      ''
    );
    const { secure_url, public_id } = cloudinaryUplodResult;

    const newPost: Post = {
      content: createPostDto.content,
      creatorType: createPostDto.creatorType,
      media: {
        url: secure_url,
        publidId: public_id,
      },
      likes: [],
      creatorId: createPostDto.creatorId,
    };
    const result = await this._repo.create(newPost);
    if (result) {
      const dto = mapToPostDTOFromPost(result);
      return dto;
    }
    return null;
  }
}
