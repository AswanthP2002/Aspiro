import Post from '../../domain/entities/user/Post';
import IPostRepo from '../../domain/interfaces/IPostRepo';
import BaseRepository from './baseRepository';
import { PostDAO } from '../database/DAOs/post.dao';
import mongoose from 'mongoose';
import PostsAggregated from '../../domain/entities/PostsAggregated.entity';

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

  async getPosts(hiddenList: string[]): Promise<PostsAggregated[] | null> {
    const result = await PostDAO.aggregate([
      { $match: { _id: { $nin: hiddenList } } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
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
            { $unwind: '$userDetails' },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
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
