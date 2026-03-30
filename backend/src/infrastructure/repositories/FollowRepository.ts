import IFollowRepo from '../../domain/interfaces/IFollowRepo';
import Follow from '../../domain/entities/follow/follow.entity';
import { FollowDAO } from '../database/DAOs/follow.dao';
import mongoose from 'mongoose';
import BaseRepository from './baseRepository';
import FollowerUserDetails from '../../domain/entities/follow/followerUserDetails.entity';
import FollowingUserDetails from '../../domain/entities/follow/followingUserDetails..entity';

export default class FollowRepository extends BaseRepository<Follow> implements IFollowRepo {
  constructor() {
    super(FollowDAO);
  }

  async follow(follow: Follow): Promise<Follow | null> {
    const result = await FollowDAO.insertOne(follow);
    return result;
  }

  async unfollow(follower: string, following: string): Promise<void> {
    await FollowDAO.findOneAndDelete({
      follower: new mongoose.Types.ObjectId(follower),
      following: new mongoose.Types.ObjectId(following),
    });
  }

  async getFollowers(
    userId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<FollowerUserDetails[] | null> {
    // const result = await FollowDAO.find({
    //   following: new mongoose.Types.ObjectId(userId),
    // });
    const skip = (page - 1) * limit;
    const result = await FollowDAO.aggregate([
      {
        $match: {
          following: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $facet: {
          followers: [
            {
              $lookup: {
                from: 'users',
                localField: 'follower',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
            { $match: { 'userDetails.name': { $regex: new RegExp(search, 'i') } } },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);
    const followers = result[0]?.followers;
    return followers;
  }

  //need continuation

  async getFollowing(
    userId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<FollowingUserDetails[] | null> {
    const skip = (page - 1) * limit;
    const result = await FollowDAO.aggregate([
      {
        $match: {
          follower: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $facet: {
          following: [
            {
              $lookup: {
                from: 'users',
                localField: 'following',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
            { $match: { 'userDetails.name': { $regex: new RegExp(search, 'i') } } },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);
    const following = result[0]?.following;
    return following;
  }

  async removeAFollower(followingId: string, followerId: string): Promise<void> {
    await FollowDAO.deleteOne({
      follower: new mongoose.Types.ObjectId(followerId),
      following: new mongoose.Types.ObjectId(followingId),
    });
  }
}
