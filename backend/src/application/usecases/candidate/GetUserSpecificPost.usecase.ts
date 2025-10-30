import Post from '../../../domain/entities/user/Post';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import { CreatePostResDTO } from '../../DTOs/post.dto';
import mapToPostDTOFromPost from '../../mappers/mapToPostDTOFromPost.mapper';
import IGetUserSpecificPosts from './interface/IGetUserSpecificPosts.usecase';

export default class GetUserSpecificPost implements IGetUserSpecificPosts {
  constructor(private _repo: IPostRepo) {}

  async execute(userId: string): Promise<any[] | null> {
    const result = await this._repo.getPostByUserId(userId);
    if (result) {
      const postDto: CreatePostResDTO[] = [];
      result.forEach((post: Post) => {
        postDto.push(mapToPostDTOFromPost(post));
      });

      return result;
    }

    return null;
  }
}
