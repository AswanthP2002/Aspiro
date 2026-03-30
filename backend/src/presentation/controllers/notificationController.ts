import { inject, injectable } from 'tsyringe';
import IGetUserSpecificNotificationUsecase from '../../application/interfaces/usecases/notification/IGetUserSpecificNotifications.usecase';
// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import IChangeNotificationStatusUsecase from '../../application/interfaces/usecases/notification/IChangeNotificationStatus.usecase';
import ISoftDeleteNotificationUsecase from '../../application/interfaces/usecases/notification/ISoftDeleteNotification.usecase';
import IGetUnReadNotificationsCountUsecase from '../../application/interfaces/usecases/notification/IGetUnreadNotificationsCount.usecase';
import IMarkReadAllNotificationsUsecase from '../../application/interfaces/usecases/notification/IMarkReadAllNotifications.usecase';
import { IDeleteNotificationsUsecase } from '../../application/interfaces/usecases/notification/IDeleteAllNotifications.usecase';
import { StatusMessage } from '../../constants/Messages/statusMessages';

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

  async getUserSpecificNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user?.id as string;
    const status = (req.query.status as string) || 'ALL';
    const page = parseInt(req.query.page as string) || 1;
    const type = (req.query.type as string) || 'ALL';
    const limit = parseInt(req.query.limit as string) || 7;
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
        const { notifications } = result;
        res.status(StatusCodes.OK).json({
          success: true,
          message: 'Fetched notifications',
          notifications,
        });
        return;
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Notifications'),
        notifications: [],
        unRead: 0,
        hasMore: false,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async changeNotificationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const notificationId = req.params.notificationId;
    try {
      const result = await this._changeNotificationStatus.execute({ _id: notificationId });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Notification read status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async markReadAllNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._markReadAllNotifications.execute();
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Notification read status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async softDeleteNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    const notificationId = req.params.notificationId;
    try {
      await this._softDeleteNotification.execute({ _id: notificationId });

      res.status(StatusCodes.OK).json({ success: true, message: 'Notification Deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getUnreadNotificationsCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user?.id as string;

    try {
      const result = await this._getUnReadNotificationsCount.execute(userId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Unread notifications count', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
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
