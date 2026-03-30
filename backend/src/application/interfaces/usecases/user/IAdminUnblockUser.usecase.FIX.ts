import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IAdminUnblockUserUsecase {
  execute(userId: string): Promise<UserDTO | null>;
}
