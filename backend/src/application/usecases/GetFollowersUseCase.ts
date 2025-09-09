import Follow from "../../domain/entities/Follow";
import IFollowRepo from "../../domain/interfaces/IFollowRepo";
import IGetFollowersUseCase from "./interfaces/IGetFollowersUseCase";

export default class GetFollowersUseCase implements IGetFollowersUseCase {
    constructor(private _repo : IFollowRepo) {} 

    async execute(userId: string): Promise<Follow[] | null> {
        const result = await this._repo.getFollowers(userId)
        return result
    }
}