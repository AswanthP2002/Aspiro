import { inject, injectable } from 'tsyringe';
import IFollowRepo from '../../domain/interfaces/IFollowRepo';
import { UnFollowUserDTO } from '../DTOs/follow.dto';
import IUnFollowUserUsercase from './interfaces/IUnFollowUser.usecase';
import INotificationRepo from '../../domain/interfaces/INotificationRepo';

@injectable()
export default class UnfollowUserUseCase implements IUnFollowUserUsercase {
  constructor(
    @inject('IFollowRepository') private _followRepo: IFollowRepo,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo
  ) {}

  async execute(unfollowuserDto: UnFollowUserDTO): Promise<void> {
    const {follower, following, acted_by, acted_user_avatar} = unfollowuserDto


    try {
      await this._followRepo.unfollow(
        follower,
        following
      );

      //currently unfollow does not have a notification :: may implement in the future

    } catch (error: unknown) {
      throw error
    }
  }
}
