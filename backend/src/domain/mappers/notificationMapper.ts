import { CreateNotificationDTO } from "../../presentation/controllers/dtos/notificationDTO";
import Notifications from "../entities/notification";

export function createNotificationFromDTO(dto : CreateNotificationDTO) : Notifications {
    return {
       ...dto,
       createdAt:new Date,
       isRead:false
    }
}