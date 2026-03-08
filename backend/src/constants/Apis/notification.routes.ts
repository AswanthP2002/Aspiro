export const NotificationApiRoutes = {
  LOAD_NOTIFICATIONS: '/v1/notifications',
  CHANGE_NOTIFICATION_STATUS_BY_NOTIFICATION_ID: '/v1/notifications/:notificationId',
  GET_UNREAD_NOTIFICATIONS_COUNT: '/v1/notifications/unread-count',
  MARK_ALL_NOTIFICATION_READ: '/v1/notifications/mark-all-read',
  DELETE_NOTIFICATION_BY_NOTIFICATION_ID: '/v1/notifications/:notificationId/delete'
} as const;
