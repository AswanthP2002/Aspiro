export const NotificationEndpoints = {
  LOAD_NOTIFICATIONS: '/v2/notifications',
  CHANGE_NOTIFICATION_STATUS_BY_NOTIFICATION_ID: (notificationId: string) => `/v2/notifications/${notificationId}`,
  GET_UNREAD_NOTIFICATIONS_COUNT: '/v2/notifications/unread-count',
  MARK_ALL_NOTIFICATION_READ: '/v2/notifications/mark-all-read',
  DELETE_NOTIFICATION_BY_NOTIFICATION_ID: (notificationId?: string) => `/v2/notifications/${notificationId}/delete`
} as const;
