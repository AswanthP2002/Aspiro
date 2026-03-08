export interface IDeleteNotificationsUsecase {
  execute(action: 'BULCK' | 'SINGLE', notificationId?: string): Promise<void>;
}
