import { NextFunction, Request, Response } from 'express';
import IFollowUserUseCase from '../../application/interfaces/usecases/follow/IFollowUser.usecase';
import IUnFollowUserUsercase from '../../application/usecases/interfaces/IUnFollowUser.usecase';
// import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import { inject, injectable } from 'tsyringe';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IGetFollowersUsecase from '../../application/interfaces/usecases/follow/IGetFollowers.usecase';
import IRemoveAFollowerUsecase from '../../application/interfaces/usecases/follow/IRemoveAFollower.usecase';
import { IGetFollowingsUsecase } from '../../application/interfaces/usecases/follow/IGetFollowingsUsecase';
import ResponseHandler from '../../utilities/response.handler';

@injectable()
export default class FollowController {
  private _responseHandler: ResponseHandler;
  constructor(
    @inject('IFollowUserUsecase') private _followUseCase: IFollowUserUseCase,
    @inject('IUnfollowUserUsecase') private _unfollowUseCase: IUnFollowUserUsercase,
    @inject('IGetFollowersUsecase') private _getFollowers: IGetFollowersUsecase,
    @inject('IGetFollowingsUsecase') private _getFollowings: IGetFollowingsUsecase,
    @inject('IRemoveAFollowerUsecase') private _removeAFollower: IRemoveAFollowerUsecase
    //private _unfollowUseCase: IUnFollowUserUsercase,
  ) {
    this._responseHandler = new ResponseHandler();
  }

  async followUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const followerId = req.user?.id as string;
    const followingId = req.params.id;
    const { acted_by, acted_user_avatar } = req.body;

    try {
      const result = await this._followUseCase.execute({
        follower: followerId,
        following: followingId,
        acted_by,
        acted_user_avatar,
      });

      this._responseHandler.success(
        res,
        StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Follow created'),
        StatusCodes.CREATED,
        result
      );

      // res.status(StatusCodes.OK).json({
      //   success: true,
      //   message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Follow'),
      //   result,
      // });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unfollowUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const followerId = req.user?.id as string;
    const followingId = req.params.id;
    const { acted_by, acted_user_avatar } = req.body;

    try {
      await this._unfollowUseCase.execute({
        follower: followerId,
        following: followingId,
        acted_by,
        acted_user_avatar,
      });

      this._responseHandler.success(
        res,
        StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Follow deleted'),
        StatusCodes.OK
      );
      // res.status(StatusCodes.OK).json({ success: true, message: 'Unfollowed' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getFollowers(req: Request, res: Response, next: NextFunction): Promise<void> {
    // const id = req.user?.id as string;
    const userId = req.params.userId;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    try {
      const result = await this._getFollowers.execute({ userId, search, page, limit });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Followers'),
        result,
      });
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async getFollowings(req: Request, res: Response, next: NextFunction): Promise<void> {
    // const id = req.user?.id as string;
    const userId = req.params.userId;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    try {
      const result = await this._getFollowings.execute({ userId, search, page, limit });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Followings'),
        result,
      });
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async removeAFollower(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const followerId = req.params.followerId;
    try {
      await this._removeAFollower.execute({ followingId: userId, followerId });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Follower'),
      });
    } catch (error) {
      next(error);
    }
  }
}
