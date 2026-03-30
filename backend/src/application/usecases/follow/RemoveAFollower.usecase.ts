import { inject, injectable } from 'tsyringe';
import IFollowRepo from '../../../domain/interfaces/IFollowRepo';
import { RemoveAFollowerDTO } from '../../DTOs/follow/follow.dto';
import IRemoveAFollowerUsecase from '../../interfaces/usecases/follow/IRemoveAFollower.usecase';

@injectable()
export default class RemoveAFollowerUsecase implements IRemoveAFollowerUsecase {
  constructor(@inject('IFollowRepository') private _repo: IFollowRepo) {}

  async execute(dto: RemoveAFollowerDTO): Promise<void> {
    const { followerId, followingId } = dto;
    await this._repo.removeAFollower(followingId, followerId);
  }
}
