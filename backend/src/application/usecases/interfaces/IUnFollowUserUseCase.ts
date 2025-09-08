import { UnFollowUserDTO } from "../../DTOs/FollowDTO";

export default interface IUnFollowUserUsercase {
    execute(unfollowuserDto : UnFollowUserDTO) : Promise<void>
}