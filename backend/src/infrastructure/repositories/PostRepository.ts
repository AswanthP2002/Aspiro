import Post from '../../domain/entities/post/Post';
import IPostRepo from '../../domain/interfaces/IPostRepo';
import BaseRepository from './baseRepository';
import { PostDAO } from '../database/DAOs/post.dao';
import mongoose from 'mongoose';
import PostsAggregated from '../../domain/entities/post/PostsAggregated.entity';

export default class PostRespository extends BaseRepository<Post> implements IPostRepo {
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

  async getPosts(
    hiddenList: string[],
    page: number,
    limit: number
  ): Promise<PostsAggregated[] | null> {
    const skip = (page - 1) * limit;
    const result = await PostDAO.aggregate([
      //{ $match: { _id: { $nin: hiddenList } } }, commented this for testing other posts availability
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return result;
  }

  async getPostById(postId: string): Promise<Post | null> {
    const result = await PostDAO.findOne({
      _id: new mongoose.Types.ObjectId(postId),
    });
    return result;
  }

  async getPostByUserId(userId: string): Promise<Post | null> {
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

    return result as Post;
  }
}
