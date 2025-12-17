import Comments from "../entities/user/comments.entity";
import IBaseRepo from "./IBaseRepo";

export default interface ICommentRepository extends IBaseRepo<Comments> {}