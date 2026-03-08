import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IAdminBlockUserUsecase {
  execute(userId: string): Promise<UserDTO | null>;
}
