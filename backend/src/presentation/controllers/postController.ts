import { NextFunction, Request, Response } from 'express';
// import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import { inject, injectable } from 'tsyringe';
import ICreatePostUsecase from '../../application/interfaces/usecases/post/ICreatePost.usecase';
import IGetPostsUsecase from '../../application/interfaces/usecases/post/IGetPosts.usecase';
import ILikePostUsecase from '../../application/interfaces/usecases/post/ILikePost.usecase';
import IUnlikePostUsecase from '../../application/interfaces/usecases/post/IUnlikePost.usecase';
import ICreateCommentUsecase from '../../application/interfaces/usecases/comment/ICreateComment.usecase';
import IDeleteCommentUsecase from '../../application/interfaces/usecases/comment/IDeleteComment.usecase';
import ILikePostCommentUsecase from '../../application/interfaces/usecases/comment/ILikePostComment.usecase';
import IUnlikeCommentUsecase from '../../application/interfaces/usecases/comment/IUnlikeComment.usecase';
import IDeletePostUsecase from '../../application/interfaces/usecases/post/IDeletePost.usecase';
import { IHidePostUsecase } from '../../application/interfaces/usecases/user/IHidePost.usecase';
import { IUnHidePostUsecase } from '../../application/interfaces/usecases/user/IUnHidePost.usecase';
import IToggleSavePostUsecase from '../../application/interfaces/usecases/savedPost/IToggleSavePost.usecase';
import { StatusMessage } from '../../constants/Messages/statusMessages';

@injectable()
export default class PostController {
  constructor(
    @inject('ICreatePostUsecase') private _createPost: ICreatePostUsecase,
    @inject('IGetPostsUsecase') private _getPosts: IGetPostsUsecase,
    @inject('ILikePostUsecase') private _likePost: ILikePostUsecase,
    @inject('IUnlikePostUsecase') private _unlikePost: IUnlikePostUsecase,
    @inject('ICreateCommentUsecase') private _createComment: ICreateCommentUsecase,
    @inject('IDeleteCommentUsecase') private _deleteComment: IDeleteCommentUsecase,
    @inject('ILikeCommentUsecase') private _likeComment: ILikePostCommentUsecase,
    @inject('IUnlikeCommentUsecase') private _unlikeComment: IUnlikeCommentUsecase,
    @inject('IDeletePostUsecase') private _deletePost: IDeletePostUsecase,
    @inject('IHidePostUsecase') private _hidePost: IHidePostUsecase,
    @inject('IUnHidePostUsecase') private _unHidePost: IUnHidePostUsecase,
    @inject('IToggleSavePostUsecase') private _toggleSavePost: IToggleSavePostUsecase
  ) {}

  // stoped at create post validation

  async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const media = req.file?.buffer;

    try {
      // const validatedData = createPostSchema.parse({creatorId, media, ...req.body})
      const result = await this._createPost.execute({ userId, ...req.body, media });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Post'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;

    try {
      await this._deletePost.execute(postId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Post') });
    } catch (error: unknown) {
      next(error);
    }
  }

  async likePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;
    const actorId = req.user?.id;
    const ownerId = req.body.ownerId;
    //const creatorId = req.params.creatorId;

    try {
      const result = await this._likePost.execute({ postId, actorId, ownerId, ...req.body });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Post like status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unlikePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;
    const userId = req.user?.id as string;

    try {
      const result = await this._unlikePost.execute(postId, userId);

      if (!result) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Post unlike status'),
        });
      }

      res.status(StatusCodes.OK).json({ success: true, message: 'unliked', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  //geting all posts for feed beta implementation without any priority (geting all posts without any mutual, follow, follwoing, interested)
  async getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;
    try {
      const result = await this._getPosts.execute({ userId, page, limit });

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: StatusMessage.COMMON_MESSAGE.SOMETHING_WENT_WRONG });
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Posts'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;
    const actorId = req.user?.id;

    try {
      const result = await this._createComment.execute({ postId, userId: actorId, ...req.body });

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: StatusMessage.COMMON_MESSAGE.SOMETHING_WENT_WRONG });
        return;
      }

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Comment'),
        comment: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    try {
      await this._deleteComment.execute(req.params?.commentId, req.params.postId, userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Comment'),
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async likeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const commentId = req.params.commentId;
    try {
      const result = await this._likeComment.execute({ actorId: userId, commentId, ...req.body });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Comment like status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unlikeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const commentId = req.params.commentId;
    try {
      const result = await this._unlikeComment.execute({ actorId: userId, commentId, ...req.body });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Comment unlike status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async hidePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const postId = req.params.postId;
    try {
      const result = await this._hidePost.execute(userId, postId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Post hide status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unHidePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const postId = req.params.postId;

    try {
      const result = await this._unHidePost.execute(userId, postId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Post un hide status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async toggleSavePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const postId = req.params.postId;

    try {
      const result = await this._toggleSavePost.execute(userId, postId);
      res.status(StatusCodes.OK).json({
        success: true,
        message:
          result && result.isSaved
            ? StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Post saved')
            : StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Post unsaved'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
