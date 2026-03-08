import { NextFunction, Response } from 'express';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import { inject, injectable } from 'tsyringe';
import ICreatePostUsecase from '../../application/interfaces/usecases/user/ICreatePost.usecase';
import IGetPostsUsecase from '../../application/interfaces/usecases/user/IGetPosts.usecase';
import ILikePostUsecase from '../../application/interfaces/usecases/user/ILikePost.usecase';
import IUnlikePostUsecase from '../../application/interfaces/usecases/user/IUnlikePost.usecase';
import ICreateCommentUsecase from '../../application/interfaces/usecases/user/ICreateComment.usecase';
import IDeleteCommentUsecase from '../../application/interfaces/usecases/user/IDeleteComment.usecase';
import ILikePostCommentUsecase from '../../application/interfaces/usecases/user/ILikePostComment.usecase';
import IUnlikeCommentUsecase from '../../application/interfaces/usecases/user/IUnlikeComment.usecase';
import IDeletePostUsecase from '../../application/interfaces/usecases/user/IDeletePost.usecase';
import { IHidePostUsecase } from '../../application/interfaces/usecases/user/IHidePost.usecase';
import { IUnHidePostUsecase } from '../../application/interfaces/usecases/user/IUnHidePost.usecase';
import IToggleSavePostUsecase from '../../application/interfaces/usecases/user/IToggleSavePost.usecase';

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

  async createPost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    const media = req.file?.buffer;

    try {
      // const validatedData = createPostSchema.parse({creatorId, media, ...req.body})
      const result = await this._createPost.execute({ userId, ...req.body, media });

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Post Created successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deletePost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;

    try {
      await this._deletePost.execute(postId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Post Deleted succesfully' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async likePost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;
    const actorId = req.user.id;
    const ownerId = req.body.ownerId;
    //const creatorId = req.params.creatorId;

    try {
      const result = await this._likePost.execute({ postId, actorId, ownerId, ...req.body });

      res.status(StatusCodes.OK).json({ success: true, message: 'liked', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unlikePost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;
    const userId = req.user.id;

    try {
      const result = await this._unlikePost.execute(postId, userId);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
      }

      res.status(StatusCodes.OK).json({ success: true, message: 'unliked', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  //geting all posts for feed beta implementation without any priority (geting all posts without any mutual, follow, follwoing, interested)
  async getPosts(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      const result = await this._getPosts.execute(userId);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
      }

      res.status(StatusCodes.OK).json({ success: true, message: 'posts fetched', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async createComment(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;
    const actorId = req.user?.id;

    try {
      const result = await this._createComment.execute({ postId, userId: actorId, ...req.body });

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
        return;
      }

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Comment created successfully', comment: result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteComment(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      await this._deleteComment.execute(req.params?.commentId, req.params.postId, userId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async likeComment(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    const commentId = req.params.commentId;
    try {
      const result = await this._likeComment.execute({ actorId: userId, commentId, ...req.body });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Comment liked succesfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unlikeComment(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    const commentId = req.params.commentId;
    try {
      const result = await this._unlikeComment.execute({ actorId: userId, commentId, ...req.body });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Comment liked succesfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async hidePost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
      const result = await this._hidePost.execute(userId, postId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Post hidden successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unHidePost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    const postId = req.params.postId;

    try {
      const result = await this._unHidePost.execute(userId, postId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Post Unhidden successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async toggleSavePost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    const postId = req.params.postId;

    try {
      const result = await this._toggleSavePost.execute(userId, postId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: result && result.isSaved ? 'Post saved' : 'Post unsaved',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
