import Post from '../../domain/entities/user/Post';
import IPostRepo from '../../domain/interfaces/IPostRepo';
import BaseRepository from './baseRepository';
import { PostDAO } from '../database/DAOs/post.dao';
import mongoose from 'mongoose';
import PostsAggregated from '../../domain/entities/PostsAggregated.entity';

export default class PostRespository
  extends BaseRepository<Post>
  implements IPostRepo
{
  constructor() {
    super(PostDAO);
  }
  async likePost(postId: string, userId: string): Promise<Post | null> {
    const result = await PostDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(postId) },
      { $addToSet: { likes: new mongoose.Types.ObjectId(userId) } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async unlikePost(postId: string, userId: string): Promise<Post | null> {
    const result = await PostDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(postId) },
      { $pull: { likes: new mongoose.Types.ObjectId(userId) } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async getPosts(): Promise<PostsAggregated[] | null> {
    // const result = await PostDAO.aggregate([
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'creatorId',
    //       foreignField: '_id',
    //       as: 'createdUserDetails',
    //     },
    //   },
    //   { $unwind: '$createdUserDetails' },
    //   {
    //     $lookup: {
    //       from: 'recruiters',
    //       localField: 'creatorId',
    //       foreignField: 'userId',
    //       as: 'recruiterProfile',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'candidates',
    //       localField: 'creatorId',
    //       foreignField: 'userId',
    //       as: 'candidateProfile',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       profileDetails: {
    //         $cond: [
    //           { $gt: [{ $size: '$candidateProfile' }, 0] },
    //           { $arrayElemAt: ['$candidateProfile', 0] },
    //           { $arrayElemAt: ['$recruiterProfile', 0] },
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       recruiterProfile: 0,
    //       candidateProfile: 0,
    //     },
    //   },
    // ]);

    const result = await PostDAO.aggregate([
      {$lookup:{
        from:'users',
        localField:'creatorId',
        foreignField:'_id',
        as:'userDetails'
      }},
      {$unwind:'$userDetails'},
      {$lookup:{
        from:'comments',
        localField:'_id',
        foreignField:'postId',
        as:'comments',
        pipeline:[
          {$lookup:{
            from:'users',
            localField:'userId',
            foreignField:'_id',
            as:'userDetails'
          }},
          {$unwind:'$userDetails'}
        ]
      }}
    ])

    return result;
  }

  async getPostById(postId: string): Promise<Post | null> {
    const result = await PostDAO.findOne({
      _id: new mongoose.Types.ObjectId(postId),
    });
    return result;
  }

  async getPostByUserId(userId: string): Promise<any | null> {
    const result = await PostDAO.aggregate([
      { $match: { creatorId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'candidates',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creatorDetails',
        },
      },
    ]);

    return result;
  }
}
