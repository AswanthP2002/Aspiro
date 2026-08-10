import { UpdataeUserDto } from '../../../DTOs/user/updateUser.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IEditProfileUseCase {
  execute(editUserDto: UpdataeUserDto): Promise<UserDTO | null>;
}
