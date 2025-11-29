import { NextFunction, Request, Response } from 'express';
import IFollowUserUseCase from '../../application/interfaces/usecases/user/IFollowUser.usecase';
import IGetFollowersUseCase from '../../application/usecases/interfaces/IGetFollowers.usecase';
import IGetFollowingUseCase from '../../application/usecases/interfaces/IGetFollowing.usecase';
import IUnFollowUserUsercase from '../../application/usecases/interfaces/IUnFollowUser.usecase';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import ICreateNotification from '../../application/interfaces/usecases/shared/ICreateNotification.usecase';
import { emitNotification } from '../../infrastructure/socketio/chatSocket';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class FollowController {
  constructor(
    @inject('IFollowUserUsecase') private _followUseCase: IFollowUserUseCase,
    @inject('IUnfollowUserUsecase') private _unfollowUseCase: IUnFollowUserUsercase //private _unfollowUseCase: IUnFollowUserUsercase,
  ) //private _getFollowers: IGetFollowersUseCase,
  //private _getFollowing: IGetFollowingUseCase,
  {}

  async followUser(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const followerId = req.user.id;
    const followingId = req.params.id;
    const { acted_by, acted_user_avatar } = req.body;

    try {
      const result = await this._followUseCase.execute({
        follower: followerId,
        following: followingId,
        acted_by,
        acted_user_avatar,
      });

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
        return;
      }

      res.status(StatusCodes.OK).json({ success: true, message: 'Followed', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unfollowUser(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const followerId = req.user.id;
    const followingId = req.params.id;
    const {acted_by, acted_user_avatar} = req.body
    
    try {
      await this._unfollowUseCase.execute({
        follower: followerId,
        following: followingId,
        acted_by,
        acted_user_avatar
      });

      res.status(StatusCodes.OK).json({ success: true, message: 'Unfollowed' });
    } catch (error: unknown) {
      next(error)
    }
  }

  // async getFollowers(req: Auth, res: Response): Promise<void> {
  //   const id = req.user.id;
  //   try {
  //     const result = await this._getFollowers.execute(id);
  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'Fetched followers', result });
  //     return;
  //   } catch (error: unknown) {
  //     console.log('Error occured while geting followers of user', error);
  //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'Internal server error, please try again after some time',
  //     });
  //     return;
  //   }
  // }

  // async getFollowing(req: Auth, res: Response): Promise<void> {
  //   const id = req.user.id;

  //   try {
  //     const result = await this._getFollowing.execute(id);
  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'Fetched following', result });
  //     return;
  //   } catch (error: unknown) {
  //     console.log('Error occured while geting folloiwng of user', error);
  //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'Internal server error, please try again after some time',
  //     });
  //     return;
  //   }
  // }
}
