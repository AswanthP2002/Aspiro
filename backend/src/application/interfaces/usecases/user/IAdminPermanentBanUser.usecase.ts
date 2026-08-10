import UserDTO from '../../../DTOs/user/user.dto';

export default interface IAdminPermanentBanUserUsecase {
  execute(userId: string): Promise<UserDTO | null>;
}
