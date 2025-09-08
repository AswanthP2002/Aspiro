import Post from "../../domain/entities/Post";
import IPostRepo from "../../domain/interfaces/IPostRepo";
import { CreatePostResDTO } from "../DTOs/PostDTO";
import mapToPostDTOFromPost from "../mappers/mapToPostDTOFromPost";
import IGetPosts from "./interfaces/IGetPosts";

export default class GetPosts implements IGetPosts {
    constructor(private _repo : IPostRepo) {}

    async execute(): Promise<any> {
        const result = await this._repo.getPosts()
        return result
    }
}