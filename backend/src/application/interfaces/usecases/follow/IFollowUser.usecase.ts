import FollowUserDTO, { FollowUserResDTO } from '../../../DTOs/follow/follow.dto';

export default interface IFollowUserUseCase {
  execute(followUserDto: FollowUserDTO): Promise<FollowUserResDTO | null>;
}
