import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IAdminBlockUserUsecase {
  execute(userId: string): Promise<UserDto | null>;
}
