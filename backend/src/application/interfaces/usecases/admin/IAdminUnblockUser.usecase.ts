import UserDTO from "../../../DTOs/user/user.dto";

export default interface IAdminUnblockUserUsecase {
    execute(userId : string) : Promise<UserDTO | null>
}