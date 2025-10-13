import { UnFollowUserDTO } from '../../DTOs/follow.dto';

export default interface IUnFollowUserUsercase {
  execute(unfollowuserDto: UnFollowUserDTO): Promise<void>;
}
