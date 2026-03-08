import { UpdataeUserDto } from '../../../DTOs/user/updateUser.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IEditProfileUseCase {
  execute(editUserDto: UpdataeUserDto): Promise<UserDTO | null>;
}
