import Post from "../../domain/entities/Post";
import IPostRepo from "../../domain/interfaces/IPostRepo";
import BaseRepository from "./baseRepository";
import { PostDAO } from "../database/DAOs/post.dao";
import mongoose from "mongoose";

export default class PostRespository extends BaseRepository<Post> implements IPostRepo {
    constructor(){
        super(PostDAO)
    }
    async likePost(postId: string, userId: string): Promise<Post | null> {
        const result = await PostDAO.findOneAndUpdate(
            {_id:new mongoose.Types.ObjectId(postId)},
            {$push:{likes:new mongoose.Types.ObjectId(userId)}},
            {returnDocument:'after'}
        )

        return result
    }

    async unlikePost(postId: string, userId: string): Promise<Post | null> {
        const result = await PostDAO.findOneAndUpdate(
            {_id:new mongoose.Types.ObjectId(postId)},
            {$pull:{likes:new mongoose.Types.ObjectId(userId)}},
            {returnDocument:'after'}
        )

        return result
    }

    async getPosts(): Promise<any> {
        const result = await PostDAO.aggregate([
            {$lookup:{
                from:'candidates',
                localField:'creatorId',
                foreignField:'_id',
                as:'creatorDetails'
            }},
            {$unwind:'$creatorDetails'}
        ])
        return result
    }

    async getPostById(postId: string): Promise<Post | null> {
        const result = await PostDAO.findOne({_id:new mongoose.Types.ObjectId(postId)})
        return result
    }
}