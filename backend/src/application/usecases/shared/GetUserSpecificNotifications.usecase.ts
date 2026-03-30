import { inject, injectable } from 'tsyringe';
import IGetUserSpecificNotificationUsecase from '../../interfaces/usecases/notification/IGetUserSpecificNotifications.usecase';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import { NotificationDTO } from '../../DTOs/notification/notifications.dto';
// import mapToNotificationDTO from '../../mappers/notification/mapToCreateNotificationDTO.mapper';
import Notification from '../../../domain/entities/notification/notification.entity';
import GetNotificationsDTO from '../../DTOs/notification/getNotifications.dto';
import NotificationMapper from '../../mappers/notification/Notification.mapperClass';

@injectable()
export default class GetUserSpecificNotificationsUsecase implements IGetUserSpecificNotificationUsecase {
  constructor(
    @inject('INotificationRepository') private _notificationRep: INotificationRepo,
    @inject('NotificationMapper') private _mapper: NotificationMapper
  ) {}
  async execute(dto: GetNotificationsDTO): Promise<{ notifications: NotificationDTO[] } | null> {
    const { type, status, limit, page, logedUserId, offSet } = dto;
    let notificationTypes = [
      'LIKE',
      'COMMENT',
      'FOLLOW',
      'CONNECTION_REQUEST',
      'CONNECTION_ACCEPTED',
      'COMMENT_REPLY',
      'SHARE',
    ];

    let notificationStatus = [true, false];

    switch (type) {
      case 'LIKE':
        notificationTypes = ['LIKE'];
        break;
      case 'COMMENT':
        notificationTypes = ['COMMENT'];
        break;
      case 'FOLLOW':
        notificationTypes = ['FOLLOW'];
        break;
      case 'CONNECTION_REQUEST':
        notificationTypes = ['CONNECTION_REQUEST'];
        break;
      case 'CONNECTION_ACCEPTED':
        notificationTypes = ['CONNECTION_ACCEPTED'];
        break;
      case 'COMMENT_REPLY':
        notificationTypes = ['COMMENT_REPLY'];
        break;
      case 'SHARE':
        notificationTypes = ['SHARE'];
        break;
      default:
        notificationTypes = [
          'LIKE',
          'COMMENT',
          'FOLLOW',
          'CONNECTION_REQUEST',
          'CONNECTION_ACCEPTED',
          'COMMENT_REPLY',
          'SHARE',
        ];
    }

    switch (status) {
      case 'READ':
        notificationStatus = [true];
        break;
      case 'UNREAD':
        notificationStatus = [false];
        break;
      default:
        notificationStatus = [true, false];
    }

    const notifications = await this._notificationRep.getNotificationsByUserId({
      limit,
      logedUserId,
      offSet,
      page,
      status: notificationStatus,
      type: notificationTypes,
    });

    if (notifications) {
      const notificationDto: NotificationDTO[] = [];

      notifications.notifications.forEach((notification: Notification) => {
        notificationDto.push(
          this._mapper.notificationWithActorDetailsToNotificationDTO(notification)
        );
      });

      return {
        notifications: notificationDto,
      };
    }
    return null;
  }
}
