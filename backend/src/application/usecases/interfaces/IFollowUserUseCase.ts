import FollowUserDTO, { FollowUserResDTO } from "../../DTOs/FollowDTO";

export default interface IFollowUserUseCase {
    execute(followUserDto : FollowUserDTO) : Promise<FollowUserResDTO | null>
}