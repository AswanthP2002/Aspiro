import Post from "../../../../domain/entities/Post";
import { CreatePostResDTO } from "../../../DTOs/PostDTO";

export default interface IGetUserSpecificPosts {
    execute(userId : string) : Promise<any[] | null>
}