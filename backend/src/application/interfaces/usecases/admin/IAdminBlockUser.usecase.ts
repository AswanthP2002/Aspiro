import UserDTO from "../../../DTOs/user/user.dto";

export default interface IAdminBlockUserUsecase {
  execute(userId: string): Promise<UserDTO | null>;
}
