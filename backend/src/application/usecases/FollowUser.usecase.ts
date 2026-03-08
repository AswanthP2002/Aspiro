import IFollowRepo from '../../domain/interfaces/IFollowRepo';
import FollowUserDTO, { FollowUserResDTO } from '../DTOs/follow.dto';
import IFollowUserUseCase from '../interfaces/usecases/user/IFollowUser.usecase';
import { inject, injectable } from 'tsyringe';
import INotificationRepo from '../../domain/interfaces/INotificationRepo';
import IRealTimeEventEmitter from '../interfaces/services/IRealTimeEventEmitter';
import FollowMapper from '../mappers/user/Follow.mapperClass';
import NotificationMapper from '../mappers/user/Notification.mapperClass';

@injectable()
export default class FollowUseruseCse implements IFollowUserUseCase {
  constructor(
    @inject('IFollowRepository') private _repo: IFollowRepo,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo,
    @inject('IRealTimeEventEmitter') private _eventEmitter: IRealTimeEventEmitter,
    @inject('FollowMapper') private _mapper: FollowMapper,
    @inject('NotificationMapper') private _notificationMapper: NotificationMapper
  ) {}

  async execute(followUserDto: FollowUserDTO): Promise<FollowUserResDTO | null> {
    const { follower, following, acted_by, acted_user_avatar } = followUserDto;

    if (follower === following) {
      throw new Error('Duplicate : You cant follow yourself');
    }
    const newFollow = this._mapper.followDTOtoFollowEntity(followUserDto);

    //follow user
    const result = await this._repo.create(newFollow);

    //create notification and store it
    const notify = await this._notificationRepo.create({
      recepientId: following,
      category: 'FOLLOW',
      actorId: follower,
      message: `${acted_by} started following you`,
      targetType: 'USER',
      targetId: follower,
      targetUrl: `http://localhost:5173/users/${follower}`,
      metadata: {
        acted_by,
        acted_user_avatar,
      },
      isRead: false,
    });

    //here i need to call the notification event !
    //live notification testing
    if (notify) {
      this._eventEmitter.follow({
        _id: notify._id,
        recepientId: following,
        actorId: follower,
        category: notify.category,
        message: notify.message,
        targetId: notify.targetId,
        targetUrl: notify.targetUrl,
        targetType: notify.targetType,
        isDeleted: notify.isDeleted,
        isRead: notify.isRead,
        metadata: notify.metadata,
        createdAt: notify.createdAt
      });
    }

    if (result) {
      const dto = this._mapper.followEntityToFollowResponseDTO(result);
      return dto;
    }

    return null;
  }
}
