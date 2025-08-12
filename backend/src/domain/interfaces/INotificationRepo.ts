import Notifications from "../entities/notification";
import IBaseRepo from "./IBaseRepo";

export default interface INotificationRepo extends IBaseRepo<Notifications> {
    getNotifications(userId : string) : Promise<Notifications[] | null>
}