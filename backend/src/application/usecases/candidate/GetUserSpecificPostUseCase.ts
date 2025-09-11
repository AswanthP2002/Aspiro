import Post from "../../../domain/entities/Post";
import IPostRepo from "../../../domain/interfaces/IPostRepo";
import { CreatePostResDTO } from "../../DTOs/PostDTO";
import mapToPostDTOFromPost from "../../mappers/mapToPostDTOFromPost";
import IGetUserSpecificPosts from "./interface/IGetUserSpecificPosts";

export default class GetUserSpecificPost implements IGetUserSpecificPosts {
    constructor(private _repo : IPostRepo) {}

    async execute(userId: string): Promise<any[] | null> {
        const result = await this._repo.getPostByUserId(userId)
        if(result){
            const postDto : CreatePostResDTO[] = []
            result.forEach((post : Post) => {
                postDto.push(mapToPostDTOFromPost(post))
            })

            return result
        }

        return null
    }
}