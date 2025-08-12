import Notifications from "../../../domain/entities/notification";
import INotificationRepo from "../../../domain/interfaces/INotificationRepo";
import IGetNotificationsUseCase from "./interface/IGetNotificationsUseCase";

export default class GetNotificationsUseCase implements IGetNotificationsUseCase {
    constructor(private _iNotificationRepo : INotificationRepo) {}

    async execute(userId: string): Promise<Notifications[] | null> {
        const result = await this._iNotificationRepo.getNotifications(userId)
        return result
    }
}