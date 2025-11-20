import { NextFunction, Request, Response } from 'express';
import IDeletePos from '../../application/usecases/interfaces/IDeletePost.usecase';
import IGetPosts from '../../application/interfaces/usecases/user/IGetPosts.usecase';
import IUnlikePost from '../../application/interfaces/usecases/user/IUnlikePost.usecase';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import ICreateNotification from '../../application/interfaces/usecases/shared/ICreateNotification.usecase';
import IGetUserSpecificPosts from '../../application/usecases/candidate/interface/IGetUserSpecificPosts.usecase';
import { inject, injectable } from 'tsyringe';
import ICreatePostUsecase from '../../application/interfaces/usecases/user/ICreatePost.usecase';
import { createPostSchema } from '../schemas/user/createPost.schema';
import mapCreatePostReqToDTO from '../mappers/user/mapCreatePostReqToDTO.mapper';
import IGetPostsUsecase from '../../application/interfaces/usecases/user/IGetPosts.usecase';
import ILikePostUsecase from '../../application/interfaces/usecases/user/ILikePost.usecase';
import { userIdSchema } from '../schemas/user/userId.schema';
import IUnlikePostUsecase from '../../application/interfaces/usecases/user/IUnlikePost.usecase';
import ICreateCommentUsecase from '../../application/interfaces/usecases/user/ICreateComment.usecase';
import mapCreateCommentReqToDTO from '../mappers/user/mapCreateCommentReqToDTO';
import IDeleteCommentUsecase from '../../application/interfaces/usecases/user/IDeleteComment.usecase';

@injectable()
export default class PostController {
  constructor(
    @inject('ICreatePostUsecase') private _createPost: ICreatePostUsecase,
    @inject('IGetPostsUsecase') private _getPosts: IGetPostsUsecase,
    @inject('ILikePostUsecase') private _likePost: ILikePostUsecase,
    @inject('IUnlikePostUsecase') private _unlikePost: IUnlikePostUsecase,
    @inject('ICreateCommentUsecase') private _createComment: ICreateCommentUsecase,
    @inject('IDeleteCommentUsecase') private _deleteComment: IDeleteCommentUsecase
    // private _deletePost: IDeletePos,
    // private _getPosts: IGetPosts,
    // private _likePost: ILikePost,
    // private _unlikePost: IUnlikePost,
    // private _createNotification: ICreateNotification,
    // private _getUserSpecificPost: IGetUserSpecificPosts
  ) {}

  // stoped at create post validation

  async createPost(req: Auth, res: Response, next : NextFunction): Promise<void> {
    const userId = req.user.id;
    const media = req.file?.buffer;
    
    try {
      // const validatedData = createPostSchema.parse({creatorId, media, ...req.body})
      const dto = mapCreatePostReqToDTO({userId:userId, ...req.body, media})
      const result = await this._createPost.execute(dto);
      
      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
        return
      }

      res.status(StatusCodes.CREATED).json({success:true, message:'Post Created successfully', result})
    } catch (error: unknown) {
      next(error)
    }
  }

  // async deletePost(req: Auth, res: Response): Promise<void> {
  //   const postId = req.params.postId;
  //   const creatorId = req.user.id;
  //   try {
  //     await this._deletePost.execute(postId, creatorId);
  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'Post deleted' });
  //     return;
  //   } catch (error: unknown) {
  //     console.log('Error occured while deleting the post');
  //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'Internal server error, please try again after some time',
  //     });
  //   }
  // }

  async likePost(req: Auth, res: Response, next : NextFunction): Promise<void> {
    const postId = req.params.postId;
    const userId = req.user.id;
    //const creatorId = req.params.creatorId;
    
    try {
      const result = await this._likePost.execute(postId, userId)

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
      }

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'liked', result });

    } catch (error: unknown) {
      next(error)
    }
  }

  async unlikePost(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const postId = req.params.postId;
    const userId = req.user.id;
    
    try {
      const result = await this._unlikePost.execute(postId, userId);
      
      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
      }

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'unliked', result });
    } catch (error: unknown) {
      next(error)
    }
  }

  //geting all posts for feed beta implementation without any priority (geting all posts without any mutual, follow, follwoing, interested)
  async getPosts(req: Auth, res: Response, next : NextFunction): Promise<void> {
    try {
      const result = await this._getPosts.execute();

      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
      }

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'posts fetched', result });

    } catch (error: unknown) {
      next(error)
    }
  }

  async createComment(req : Auth, res : Response, next: NextFunction) : Promise<void> {
    const postId = req.params.postId
    const userId = req.user?.id
    
    try {
      const dto = mapCreateCommentReqToDTO({postId, userId, ...req.body})
      const result = await this._createComment.execute(dto)

      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
        return
      }

      res.status(StatusCodes.CREATED).json({success:true, message:'Comment created successfully', result})
    } catch (error : unknown) {
      next(error)
    }
  }

  async deleteComment(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      await this._deleteComment.execute(req.params?.commentId)
      res.status(StatusCodes.OK).json({success:true, message:'Comment deleted successfully'})
    } catch (error: unknown) {
      next(error)
    }
  }

  // async getUserPosts(req: Auth, res: Response): Promise<void> {
  //   const userId = req.user?.id;
  //   try {
  //     const result = await this._getUserSpecificPost.execute(userId);
  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'Posts fetched successfully', result });
  //     return;
  //   } catch (error: unknown) {
  //     console.log('Error occured while fetching the posts', error);
  //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'Internal server error, please try again after some time',
  //     });
  //     return;
  //   }
  // }
}
