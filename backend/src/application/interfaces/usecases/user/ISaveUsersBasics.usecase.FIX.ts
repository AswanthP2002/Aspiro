import { UpdataeUserDto } from '../../../DTOs/user/updateUser.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface ISaveUserBasicsUsecase {
  execute(updateUserDto: UpdataeUserDto): Promise<UserDto | null>;
}
