import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IAdminUnblockUserUsecase {
  execute(userId: string): Promise<UserDto | null>;
}
