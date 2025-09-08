import Post from "../entities/Post";
import IBaseRepo from "./IBaseRepo";

export default interface IPostRepo extends IBaseRepo<Post>{
    likePost(postId : string, userId : string) : Promise<Post | null>
    unlikePost(postId : string, userId : string) : Promise<Post | null>
    getPostById(postId : string) : Promise<Post | null>
    getPosts() : Promise<any>
}