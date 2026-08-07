import { UpdataeUserDto } from '../../../DTOs/user/updateUser.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface ISaveUserBasicsUsecase {
  execute(updateUserDto: UpdataeUserDto): Promise<UserDTO | null>;
}
