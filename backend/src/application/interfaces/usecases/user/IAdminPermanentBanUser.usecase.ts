import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IAdminPermanentBanUserUsecase {
  execute(userId: string): Promise<UserDTO | null>;
}
