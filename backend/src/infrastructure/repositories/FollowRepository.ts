import IFollowRepo from "../../domain/interfaces/IFollowRepo";
import Follow from "../../domain/entities/Follow";
import { FollowDAO } from "../database/DAOs/follow.dao";
import mongoose from "mongoose";
import BaseRepository from "./baseRepository";

export default class FollowRepository extends BaseRepository<Follow> implements IFollowRepo {
    constructor(){
        super(FollowDAO)
    }

    async follow(follow: Follow): Promise<Follow | null> {
        const result = await FollowDAO.insertOne(follow)
        return result
    }

    async unfollow(follower: string, following: string): Promise<void> {
        await FollowDAO.findOneAndDelete(
            {
                follower:new mongoose.Types.ObjectId(follower),
                following:new mongoose.Types.ObjectId(following)
            }
        )
    }

    async getFollowers(userId: string): Promise<Follow[] | null> {
        const result = await FollowDAO.find({following:new mongoose.Types.ObjectId(userId)})
        return result
    }

    async getFollowing(userId: string): Promise<Follow[] | null> {
        const result = await FollowDAO.find({follower:new mongoose.Types.ObjectId(userId)})
        return result
    }
}