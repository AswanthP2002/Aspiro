import Notifications from '../../../../domain/entities/notifications.entity';

export default interface IUpdateNotificationReadStatus {
  execute(id: string): Promise<Notifications | null>;
}
