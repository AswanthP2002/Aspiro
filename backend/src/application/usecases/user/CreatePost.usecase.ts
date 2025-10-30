import { inject, injectable } from 'tsyringe';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import CreatePostDTO, { PostDTO } from '../../DTOs/post.dto';
import mapToPostDTOFromPost from '../../mappers/mapToPostDTOFromPost.mapper';
import ICloudStroageService from '../../interfaces/services/ICloudStorageService';
import mapCreatePostDtoToPost from '../../mappers/user/mapCreatePostDtoToPost.mapper';
import ICreatePostUsecase from '../../interfaces/usecases/user/ICreatePost.usecase';

@injectable()
export default class CreatePostUseCase implements ICreatePostUsecase {
  constructor(
    @inject('IPostRepository') private _postRepo : IPostRepo,
    @inject('ICloudStorageService') private _cloudStorage : ICloudStroageService
  ) {}

  async execute(createPostDto: CreatePostDTO): Promise<PostDTO | null> {
    const {description, creatorId, media, likes} = createPostDto
    
    const uploadResult = await this._cloudStorage.upload(media, 'posts')
    const { secure_url, public_id } = uploadResult;

    const newPost = mapCreatePostDtoToPost({
      creatorId:creatorId as string,
      description:description,
      media:{
        cloudUrl:secure_url,
        publicId:public_id
      },
      likes:[]
    })

    const result = await this._postRepo.create(newPost)
    
    if (result) {
      const dto = mapToPostDTOFromPost(result);
      return dto;
    }
    return null;
  }
}
