const express = require('express');
import { Request, Response } from 'express';
import FollowRepository from '../../infrastructure/repositories/FollowRepository';
import FollowController from '../controllers/followController';
import FollowUseruseCse from '../../application/usecases/FollowUser.usecase';
import UnfollowUserUseCase from '../../application/usecases/UnfollowUser.usecase';
import GetFollowersUseCase from '../../application/usecases/GetFollowers.usecase';
import GetFollowingUseCase from '../../application/usecases/GetFollowing.usecase';
import { userAuth } from '../../middlewares/auth';
import CreateNotification from '../../application/usecases/common/useCases/CreateNotification.usecase';
import NotificationRepository from '../../infrastructure/repositories/notificationRepository';

function createFollowRouter() {
  const followRouter = express.Router();

  const followRepo = new FollowRepository();
  const notificationRepo = new NotificationRepository();

  const followUseCase = new FollowUseruseCse(followRepo);
  const unfolloUseCase = new UnfollowUserUseCase(followRepo);
  const getFollowersUseCse = new GetFollowersUseCase(followRepo);
  const getFollowingUseCase = new GetFollowingUseCase(followRepo);
  const createNotificationUseCase = new CreateNotification(notificationRepo);

  const followcontroller = new FollowController(
    followUseCase,
    unfolloUseCase,
    getFollowersUseCse,
    getFollowingUseCase,
    createNotificationUseCase
  );

  followRouter.post(
    '/follow/:id',
    userAuth,
    followcontroller.followUser.bind(followcontroller)
  );
  followRouter.delete(
    '/follow/:id',
    userAuth,
    followcontroller.unfollowUser.bind(followcontroller)
  );
  followRouter.get(
    '/followers',
    userAuth,
    followcontroller.getFollowers.bind(followcontroller)
  );
  followRouter.get(
    '/following',
    userAuth,
    followcontroller.getFollowing.bind(followcontroller)
  );

  return followRouter;
}

export default createFollowRouter;
