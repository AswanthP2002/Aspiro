import { UnFollowUserDTO } from '../../DTOs/follow/follow.dto';

export default interface IUnFollowUserUsercase {
  execute(unfollowuserDto: UnFollowUserDTO): Promise<void>;
}
