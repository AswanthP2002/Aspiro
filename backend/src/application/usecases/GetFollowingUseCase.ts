import Follow from "../../domain/entities/Follow";
import IFollowRepo from "../../domain/interfaces/IFollowRepo";
import IGetFollowingUseCase from "./interfaces/IGetFollowingUseCase";

export default class GetFollowingUseCase implements IGetFollowingUseCase {
    constructor(private _repo : IFollowRepo){}

    async execute(userId: string): Promise<Follow[] | null> {
        const result = await this._repo.getFollowing(userId)
        return result
    }
}