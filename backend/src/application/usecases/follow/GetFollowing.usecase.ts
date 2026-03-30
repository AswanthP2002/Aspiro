import Follow from '../../domain/entities/follow.entity';
import IFollowRepo from '../../domain/interfaces/IFollowRepo';
import IGetFollowingUseCase from './interfaces/IGetFollowing.usecase';

export default class GetFollowingUseCase implements IGetFollowingUseCase {
  constructor(private _repo: IFollowRepo) {}

  async execute(userId: string): Promise<Follow[] | null> {
    const result = await this._repo.getFollowing(userId);
    return result;
  }
}
