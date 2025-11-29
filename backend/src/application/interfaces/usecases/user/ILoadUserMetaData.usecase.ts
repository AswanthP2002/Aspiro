import UserMetaData from "../../../DTOs/user/userMetaData.dto";

export default interface ILoadUserMetaDataUsecase {
    execute(userId: string): Promise<UserMetaData | null>
}