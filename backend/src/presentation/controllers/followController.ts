import { Request, Response } from 'express';
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
    private _unfollowUseCase: IUnFollowUserUsercase,
    private _getFollowers: IGetFollowersUseCase,
    private _getFollowing: IGetFollowingUseCase,
    @inject('ICreateNotificationUsecase') private _createNotification: ICreateNotification
  ) {}

  async followUser(req: Auth, res: Response): Promise<void> {
    const followerId = req.user.id;
    const followingId = req.params.id;
    const type = req.body;
    try {
      const result = await this._followUseCase.execute({
        follower: followerId,
        following: followingId,
      });
      // Assuming you have a way to get the sender's name/details
      const notification = await this._createNotification.execute({
        title: 'New Follower',
        description: `You have a new follower.`, // Keep it simple, sender details will be in the notification object
        senderId: followerId,
        receiverId: followingId,
        type: 'follow',
        link: `/profile/${followerId}` // Example link to the follower's profile
      });
      if (notification) {
        emitNotification(followingId, notification);
      }
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Followed', result });
      return;
    } catch (error: unknown) {
      console.log('error occured while follwoing the user', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
      return;
    }
  }

  async unfollowUser(req: Auth, res: Response): Promise<void> {
    const followerId = req.user.id;
    const followingId = req.params.id;
    try {
      await this._unfollowUseCase.execute({
        follower: followerId,
        following: followingId,
      });
      res.status(StatusCodes.OK).json({ success: true, message: 'Unfollowed' });
      return;
    } catch (error: unknown) {
      console.log('Error occured while unfollowing user', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
      return;
    }
  }

  async getFollowers(req: Auth, res: Response): Promise<void> {
    const id = req.user.id;
    try {
      const result = await this._getFollowers.execute(id);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Fetched followers', result });
      return;
    } catch (error: unknown) {
      console.log('Error occured while geting followers of user', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
      return;
    }
  }

  async getFollowing(req: Auth, res: Response): Promise<void> {
    const id = req.user.id;

    try {
      const result = await this._getFollowing.execute(id);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Fetched following', result });
      return;
    } catch (error: unknown) {
      console.log('Error occured while geting folloiwng of user', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error, please try again after some time',
      });
      return;
    }
  }
}
