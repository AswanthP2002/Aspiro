import UpdateUserDTO from '../../../DTOs/user/updateUser.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IEditProfileUseCase {
  execute(editUserDto: UpdateUserDTO): Promise<UserDto | null>;
}
