import { NotificationDTO } from "../../../DTOs/notifications.dto";

export default interface IGetUserSpecificNotificationUsecase {
    execute(userId: string): Promise<NotificationDTO[] | null>
}