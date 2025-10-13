import IFollowRepo from '../../domain/interfaces/IFollowRepo';
import { UnFollowUserDTO } from '../DTOs/follow.dto';
import IUnFollowUserUsercase from './interfaces/IUnFollowUser.usecase';

export default class UnfollowUserUseCase implements IUnFollowUserUsercase {
  constructor(private _repo: IFollowRepo) {}

  async execute(unfollowuserDto: UnFollowUserDTO): Promise<void> {
    await this._repo.unfollow(
      unfollowuserDto.follower,
      unfollowuserDto.following
    );
  }
}
