import UpdateUserDTO from '../../../DTOs/user/updateUser.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface ISaveUserBasicsUsecase {
  execute(updateUserDto: UpdateUserDTO): Promise<UserDTO | null>;
}
