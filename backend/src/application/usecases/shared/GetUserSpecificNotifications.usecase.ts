import { inject, injectable } from "tsyringe";
import IGetUserSpecificNotificationUsecase from "../../interfaces/usecases/shared/IGetUserSpecificNotifications.usecase";
import INotificationRepo from "../../../domain/interfaces/INotificationRepo";
import { NotificationDTO } from "../../DTOs/notifications.dto";
import mapToNotificationDTO from "../../mappers/mapToCreateNotificationDTO.mapper";
import Notification from "../../../domain/entities/notification.entity";

@injectable()
export default class GetUserSpecificNotificationsUsecase implements IGetUserSpecificNotificationUsecase {
    constructor(
        @inject('INotificationRepository') private _notificationRep: INotificationRepo
    ){}
    async execute(userId: string): Promise<NotificationDTO[] | null> {
        const notifications = await this._notificationRep.getNotificationsByUserId(userId)

        if(notifications){
            const notificationDto : NotificationDTO[] = []
            
            notifications.forEach((notification: Notification) => {
                notificationDto.push(mapToNotificationDTO(notification))
            })

            return notificationDto
        }
        return null
    }
}