import IFollowRepo from "../../domain/interfaces/IFollowRepo";
import { UnFollowUserDTO } from "../DTOs/FollowDTO";
import IUnFollowUserUsercase from "./interfaces/IUnFollowUserUseCase";

export default class UnfollowUserUseCase implements IUnFollowUserUsercase {
    constructor(private _repo : IFollowRepo) {}

    async execute(unfollowuserDto: UnFollowUserDTO): Promise<void> {
        await this._repo.unfollow(unfollowuserDto.follower, unfollowuserDto.following)
    }
}