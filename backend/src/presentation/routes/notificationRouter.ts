import express from 'express';
import { container } from 'tsyringe';
import NotificationController from '../controllers/notificationController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { NotificationApiRoutes } from '../../constants/Apis/notification.routes';

function createNotificationRouter() {
  const notificationRouter = express.Router();

  const notificationController = container.resolve(NotificationController);

  notificationRouter.get(
    NotificationApiRoutes.LOAD_NOTIFICATIONS,
    centralizedAuthentication,
    authorization(['user', 'admin', 'recruiter']),
    notificationController.getUserSpecificNotifications.bind(notificationController)
  );

  notificationRouter.patch(
    NotificationApiRoutes.CHANGE_NOTIFICATION_STATUS_BY_NOTIFICATION_ID,
    centralizedAuthentication,
    authorization(['user']),
    notificationController.changeNotificationStatus.bind(notificationController)
  );

  // notificationRouter.delete(
  //   '/v1/notifications/:notificationId',
  //   centralizedAuthentication,
  //   authorization(['user']),
  //   notificationController.softDeleteNotification.bind(notificationController)
  // );

  notificationRouter.get(
    NotificationApiRoutes.GET_UNREAD_NOTIFICATIONS_COUNT,
    centralizedAuthentication,
    authorization(['user', 'recruiter', 'admin']),
    notificationController.getUnreadNotificationsCount.bind(notificationController)
  );

  notificationRouter.put(
    NotificationApiRoutes.MARK_ALL_NOTIFICATION_READ,
    centralizedAuthentication,
    authorization(['user']),
    notificationController.markReadAllNotification.bind(notificationController)
  );

  notificationRouter.delete(
    NotificationApiRoutes.DELETE_NOTIFICATION_BY_NOTIFICATION_ID,
    centralizedAuthentication,
    authorization(['user']),
    notificationController.deleteNotifications.bind(notificationController)
  );

  return notificationRouter;
}

export default createNotificationRouter;
