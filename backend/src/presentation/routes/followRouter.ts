import express from 'express';
import FollowController from '../controllers/followController';
import { container } from 'tsyringe';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { FollowApiRoutes } from '../../constants/Apis/follow.routes';

function createFollowRouter() {
  const followRouter = express.Router();

  const followController = container.resolve(FollowController);

  followRouter.post(
    FollowApiRoutes.FOLLOW_A_USER_BY_USER_ID,
    centralizedAuthentication,
    authorization(['user']),
    followController.followUser.bind(followController)
  );
  followRouter.post(
    FollowApiRoutes.UNFOLLOW_A_USER_BY_USER_ID,
    centralizedAuthentication,
    authorization(['user']),
    followController.unfollowUser.bind(followController)
  );
  followRouter.get(
    FollowApiRoutes.GET_FOLLOWERS,
    centralizedAuthentication,
    authorization(['user']),
    followController.getFollowers.bind(followController)
  );
  followRouter.get(
    FollowApiRoutes.GET_FOLLOWINGS,
    centralizedAuthentication,
    authorization(['user']),
    followController.getFollowings.bind(followController)
  );
  followRouter.delete(
    '/v2/follower/:followerId/remove',
    centralizedAuthentication,
    authorization(['user']),
    followController.removeAFollower.bind(followController)
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
