import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface ILoadUserProfileUsecase {
  execute(id: string): Promise<UserDto | null>;
}
