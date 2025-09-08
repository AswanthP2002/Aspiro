import Notifications from "../../../../domain/entities/notifications";

export default interface IUpdateNotificationReadStatus {
    execute(id : string) : Promise<Notifications | null>
}