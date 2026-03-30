import { inject, injectable } from 'tsyringe';
import IFollowRepo from '../../../domain/interfaces/IFollowRepo';
import { UnFollowUserDTO } from '../../DTOs/follow/follow.dto';
import IUnFollowUserUsercase from '../interfaces/IUnFollowUser.usecase';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';

@injectable()
export default class UnfollowUserUseCase implements IUnFollowUserUsercase {
  constructor(
    @inject('IFollowRepository') private _followRepo: IFollowRepo,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo,
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter
  ) {}

  async execute(unfollowuserDto: UnFollowUserDTO): Promise<void> {
    const { follower, following } = unfollowuserDto;

    await this._followRepo.unfollow(follower, following);
    const removableNotification =
      await this._notificationRepo.getANotificationBySendReceiverCategory(
        following as string,
        follower as string,
        'FOLLOW'
      );

    if (removableNotification) {
      await this._notificationRepo.deleteFollowNotification(follower, following);
      this._realTimeEventEmitter.removeNotification(
        following as string,
        removableNotification._id as string
      );
    }
  }
}
