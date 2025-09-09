import Notifications from "../../../../domain/entities/notifications";


export default interface IGetNotificationsUseCase {
    execute(userId : string) : Promise<Notifications[] | null>
}