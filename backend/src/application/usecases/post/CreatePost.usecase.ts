import { inject, injectable } from 'tsyringe';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import CreatePostDTO, { PostDTO } from '../../DTOs/post/post.dto';
import mapToPostDTOFromPost from '../../mappers/post/mapToPostDTOFromPost.mapper';
import ICloudStroageService from '../../interfaces/services/ICloudStorageService';
import mapCreatePostDtoToPost from '../../mappers/post/mapCreatePostDtoToPost.mapper';
import ICreatePostUsecase from '../../interfaces/usecases/post/ICreatePost.usecase';

type UploadResult = {
  secure_url: string;
  public_id: string;
};

@injectable()
export default class CreatePostUseCase implements ICreatePostUsecase {
  constructor(
    @inject('IPostRepository') private _postRepo: IPostRepo,
    @inject('ICloudStorageService') private _cloudStorage: ICloudStroageService
  ) {}

  async execute(createPostDto: CreatePostDTO): Promise<PostDTO | null> {
    const { description, userId, media, mediaType } = createPostDto;

    //only upload if a media exist
    let uploadResult;
    if (media) {
      uploadResult = (await this._cloudStorage.upload(media, 'posts')) as UploadResult;
    }

    //const { secure_url, public_id } = uploadResult;

    const newPost = mapCreatePostDtoToPost({
      userId: userId as string,
      description: description,
      media: {
        cloudUrl: uploadResult?.secure_url || '',
        publicId: uploadResult?.public_id || '',
      },
      mediaType: mediaType || 'image',
    });

    const result = await this._postRepo.create(newPost);

    if (result) {
      const dto = mapToPostDTOFromPost(result);
      return dto;
    }
    return null;
  }
}

//stoped at post implementation
