import { Request, Response } from 'express';
import ICreatPost from '../../application/usecases/interfaces/ICreatePost.usecase';
import IDeletePos from '../../application/usecases/interfaces/IDeletePost.usecase';
import IGetPosts from '../../application/usecases/interfaces/IGetPosts.usecase';
import ILikePost from '../../application/usecases/interfaces/IlikePost.usecase';
import IUnlikePost from '../../application/usecases/interfaces/IUnlikePost.usecase';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import ICreateNotification from '../../application/usecases/common/interface/ICreateNotification.usecase';
import IGetUserSpecificPosts from '../../application/usecases/candidate/interface/IGetUserSpecificPosts.usecase';

export default class PosController {
  constructor(
    private _createPost: ICreatPost,
    private _deletePost: IDeletePos,
    private _getPosts: IGetPosts,
    private _likePost: ILikePost,
    private _unlikePost: IUnlikePost,
    private _createNotification: ICreateNotification,
    private _getUserSpecificPost: IGetUserSpecificPosts
  ) {}

  async createPost(req: Auth, res: Response): Promise<void> {
    const creatorId = req.user.id;
    const media = req.file?.buffer;
    //console.log('media before sending', media)
    try {
      const result = await this._createPost.execute({
        creatorId,
        media,
        ...req.body,
      });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'created', result });
      return;
    } catch (error: unknown) {
      console.log('Error occured while creating the post', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
    }
  }

  async deletePost(req: Auth, res: Response): Promise<void> {
    const postId = req.params.postId;
    const creatorId = req.user.id;
    try {
      await this._deletePost.execute(postId, creatorId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Post deleted' });
      return;
    } catch (error: unknown) {
      console.log('Error occured while deleting the post');
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
    }
  }

  async likePost(req: Auth, res: Response): Promise<void> {
    const postId = req.params.postId;
    const userId = req.user.id;
    const creatorId = req.params.creatorId;
    try {
      const result = await this._likePost.execute(postId, userId);
      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
        return;
      }
      const notificationResult = await this._createNotification.execute({
        title: 'Liked',
        description: `User ${userId} liked your post`,
        receiverId: creatorId,
        senderId: userId,
        type: 'Like',
      });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'liked', result });
      return;
    } catch (error: unknown) {
      console.log('Error occured while liking the post');
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
    }
  }

  async unlikePost(req: Auth, res: Response): Promise<void> {
    const postId = req.params.postId;
    const userId = req.user.id;
    try {
      const result = await this._unlikePost.execute(postId, userId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'unliked', result });
    } catch (error: unknown) {
      console.log('Error occured while unlike the post');
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
    }
  }

  async getPosts(req: Auth, res: Response): Promise<void> {
    try {
      const result = await this._getPosts.execute();
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'posts fetched', result });
      return;
    } catch (error: unknown) {
      console.log('Error occured while getting the post');
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
    }
  }

  async getUserPosts(req: Auth, res: Response): Promise<void> {
    const userId = req.user?.id;
    try {
      const result = await this._getUserSpecificPost.execute(userId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Posts fetched successfully', result });
      return;
    } catch (error: unknown) {
      console.log('Error occured while fetching the posts', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
      return;
    }
  }
}
