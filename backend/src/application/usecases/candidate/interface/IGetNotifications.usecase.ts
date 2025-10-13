import Notifications from '../../../../domain/entities/notifications.entity';

export default interface IGetNotificationsUseCase {
  execute(userId: string): Promise<Notifications[] | null>;
}
