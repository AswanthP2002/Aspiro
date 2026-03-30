import { inject, injectable } from 'tsyringe';
import IDeletePostUsecase from '../../interfaces/usecases/post/IDeletePost.usecase';
import IPostRepo from '../../../domain/interfaces/IPostRepo';

@injectable()
export default class DeletePostUsecase implements IDeletePostUsecase {
  constructor(@inject('IPostRepository') private _repo: IPostRepo) {}

  async execute(postId: string): Promise<void> {
    await this._repo.delete(postId);
  }
}
