import Comments from "../../domain/entities/user/comments.entity";
import ICommentRepository from "../../domain/interfaces/IComment.repository";
import { CommentDAO } from "../database/DAOs/comments.dao";
import BaseRepository from "./baseRepository";

export default class CommentRepository extends BaseRepository<Comments> implements ICommentRepository {
    constructor(){
        super(CommentDAO)
    }
}