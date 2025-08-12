import Notifications from "../../../../domain/entities/notification";

export default interface ICreateNotification {
    execute(notification : Notifications, userId : string) : Promise<string | null>
}