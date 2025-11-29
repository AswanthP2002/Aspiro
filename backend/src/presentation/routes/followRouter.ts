const express = require('express');
import { Request, Response } from 'express';
import FollowRepository from '../../infrastructure/repositories/FollowRepository';
import FollowController from '../controllers/followController';
import FollowUseruseCse from '../../application/usecases/FollowUser.usecase';
import UnfollowUserUseCase from '../../application/usecases/UnfollowUser.usecase';
import GetFollowersUseCase from '../../application/usecases/GetFollowers.usecase';
import GetFollowingUseCase from '../../application/usecases/GetFollowing.usecase';
import CreateNotification from '../../application/usecases/shared/CreateNotification.usecase';
import NotificationRepository from '../../infrastructure/repositories/notificationRepository';
import { container } from 'tsyringe';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';

function createFollowRouter() {
  const followRouter = express.Router();

  const followController = container.resolve(FollowController)

  followRouter.post(
    '/follow/:id',
    centralizedAuthentication,
    authorization(['user']),
    followController.followUser.bind(followController)
  );
  followRouter.post(
    '/unfollow/:id',
    centralizedAuthentication,
    authorization(['user']),
    followController.unfollowUser.bind(followController)
  );
//   followRouter.get(
//     '/followers',
//     userAuth,
//     followcontroller.getFollowers.bind(followcontroller)
//   );
//   followRouter.get(
//     '/following',
//     userAuth,
//     followcontroller.getFollowing.bind(followcontroller)
//   );

  return followRouter;
}

export default createFollowRouter;
