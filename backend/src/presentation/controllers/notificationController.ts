import { inject, injectable } from 'tsyringe';
import IGetUserSpecificNotificationUsecase from '../../application/interfaces/usecases/shared/IGetUserSpecificNotifications.usecase';
import { Auth } from '../../middlewares/auth';
import { NextFunction, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import IChangeNotificationStatusUsecase from '../../application/interfaces/usecases/shared/IChangeNotificationStatus.usecase';
import ISoftDeleteNotificationUsecase from '../../application/interfaces/usecases/shared/ISoftDeleteNotification.usecase';
import IGetUnReadNotificationsCountUsecase from '../../application/interfaces/usecases/shared/IGetUnreadNotificationsCount.usecase';
import IMarkReadAllNotificationsUsecase from '../../application/interfaces/usecases/user/IMarkReadAllNotifications.usecase';
import { IDeleteNotificationsUsecase } from '../../application/interfaces/usecases/user/IDeleteAllNotifications.usecase';

@injectable()
export default class NotificationController {
  constructor(
    @inject('IGetUserSpecificNotificationsUsecase')
    private _getUserSpecificNotifications: IGetUserSpecificNotificationUsecase,
    @inject('IChangeNotificationStatusUsecae')
    private _changeNotificationStatus: IChangeNotificationStatusUsecase,
    @inject('ISoftDeleteNotificationUsecase')
    private _softDeleteNotification: ISoftDeleteNotificationUsecase,
    @inject('IGetUnReadNotificationsCount')
    private _getUnReadNotificationsCount: IGetUnReadNotificationsCountUsecase,
    @inject('IMarkReadAllNotificationsUsecase')
    private _markReadAllNotifications: IMarkReadAllNotificationsUsecase,
    @inject('IDeleteNotificationsUsecase') private _deleteNotifications: IDeleteNotificationsUsecase
  ) {}

  async getUserSpecificNotifications(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    const status = (req.query.status as string) || 'ALL';
    const page = parseInt(req.query.page as string) || 1;
    const type = (req.query.type as string) || 'ALL';
    const limit = parseInt(req.query.limit as string) || 10;
    const offSet = parseInt(req.query.offSet as string) || 0;

    try {
      const result = await this._getUserSpecificNotifications.execute({
        logedUserId: userId,
        limit,
        status,
        page,
        type,
        offSet,
      });
      if (result) {
        const { notifications, unRead, hasMore } = result;
        res.status(StatusCodes.OK).json({
          success: true,
          message: 'Fetched notifications',
          notifications,
          unRead,
          hasMore,
        });
        return;
      }
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'OK', notifications: [], unRead: 0, hasMore: false });
    } catch (error: unknown) {
      next(error);
    }
  }

  async changeNotificationStatus(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const notificationId = req.params.notificationId;
    try {
      const result = await this._changeNotificationStatus.execute({ _id: notificationId });

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Notification status changed', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async markReadAllNotification(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._markReadAllNotifications.execute();
      res.status(StatusCodes.OK).json({ success: true, message: 'Updated', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async softDeleteNotification(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const notificationId = req.params.notificationId;
    try {
      await this._softDeleteNotification.execute({ _id: notificationId });

      res.status(StatusCodes.OK).json({ success: true, message: 'Notification Deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getUnreadNotificationsCount(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._getUnReadNotificationsCount.execute(userId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Unread notifications count', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteNotifications(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const notificationId = req.params.notificationId as string;
    const action = req.query.action as 'BULCK' | 'SINGLE';

    try {
      await this._deleteNotifications.execute(action, notificationId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });
    } catch (error) {
      next(error);
    }
  }
}
