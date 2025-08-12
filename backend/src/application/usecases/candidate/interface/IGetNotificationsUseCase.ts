import Notifications from "../../../../domain/entities/notification";

export default interface IGetNotificationsUseCase {
    execute(userId : string) : Promise<Notifications[] | null>
}