import { UpdateNotificationDTO } from '../../../DTOs/notification/notifications.dto';

export default interface ISoftDeleteNotificationUsecase {
  execute(updateNotificationDto: UpdateNotificationDTO): Promise<void>;
}
