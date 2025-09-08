import Post from "../../domain/entities/Post";
import IPostRepo from "../../domain/interfaces/IPostRepo";
import ILikePost from "./interfaces/IlikePostUseCase";

export default class LIkePost implements ILikePost {
    constructor(private _repo : IPostRepo) {}

    async execute(postId: string, userId: string): Promise<Post | null> {
        const result = await this._repo.likePost(postId, userId)
        return result
    }
}