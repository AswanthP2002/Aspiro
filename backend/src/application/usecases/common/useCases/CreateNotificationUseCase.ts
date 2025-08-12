import mongoose from "mongoose";
import Notifications from "../../../../domain/entities/notification";
import INotificationRepo from "../../../../domain/interfaces/INotificationRepo";
import { createNotificationFromDTO } from "../../../../domain/mappers/notificationMapper";
import { NotificationSchema } from "../../../../presentation/controllers/dtos/notificationDTO";
import ICreateNotification from "../interface/ICreateNotificationUseCase";

export default class CreateNotification implements ICreateNotification {
    constructor(private _iNotificationRepo : INotificationRepo){}

    async execute(notification : Notifications, userId : string): Promise<string | null> {
        const parsedNotification = NotificationSchema.parse(notification)
        const notificationModal = createNotificationFromDTO(parsedNotification)
        notificationModal.userId = new mongoose.Types.ObjectId(userId)
        const result = await this._iNotificationRepo.create(notificationModal)
        return result
    }
}