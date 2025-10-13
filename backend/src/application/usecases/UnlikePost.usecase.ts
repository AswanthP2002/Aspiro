import Post from '../../domain/entities/Post.entity';
import IPostRepo from '../../domain/interfaces/IPostRepo';
import IUnlikePost from './interfaces/IUnlikePost.usecase';

export default class UnlikePost implements IUnlikePost {
  constructor(private _repo: IPostRepo) {}

  async execute(postId: string, userId: string): Promise<Post | null> {
    const result = await this._repo.unlikePost(postId, userId);
    return result;
  }
}
