import Post from "../../../domain/entities/Post";

export default interface IGetPosts {
    execute() : Promise<any>
}