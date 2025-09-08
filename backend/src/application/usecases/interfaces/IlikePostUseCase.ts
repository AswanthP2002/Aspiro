import Post from "../../../domain/entities/Post";

export default interface ILikePost {
    execute(postId : string, userId : string) : Promise<Post | null>
}