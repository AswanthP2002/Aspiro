import { UpdateNotificationDTO } from '../../../DTOs/notifications.dto';

export default interface ISoftDeleteNotificationUsecase {
  execute(updateNotificationDto: UpdateNotificationDTO): Promise<void>;
}
