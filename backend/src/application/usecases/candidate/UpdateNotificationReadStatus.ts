import Notifications from "../../../domain/entities/notifications";
import INotificationRepo from "../../../domain/interfaces/INotificationRepo";
import IUpdateNotificationReadStatus from "./interface/IUpdateNotificationReadStatus";

export default class UpdateNotificationReadStatus implements IUpdateNotificationReadStatus {
    constructor(private _repository : INotificationRepo) {}

    async execute(id: string): Promise<Notifications | null> {
        const result = await this._repository.updateReadStatus(id)
        return result
    }
}