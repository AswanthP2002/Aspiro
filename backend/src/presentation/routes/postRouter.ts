import { NextFunction, Request, Response } from 'express';
import GetUserSpecificPost from '../../application/usecases/candidate/GetUserSpecificPost.usecase';
import CreateNotification from '../../application/usecases/common/useCases/CreateNotification.usecase';
import CreatePost from '../../application/usecases/CreatePost.usecase';
import DeleletPost from '../../application/usecases/DeletePost.usecase';
import GetPosts from '../../application/usecases/GetPosts.usecase';
import LIkePost from '../../application/usecases/LikePostUseCase';
import UnlikePost from '../../application/usecases/UnlikePost.usecase';
import NotificationRepository from '../../infrastructure/repositories/notificationRepository';
import PostRespository from '../../infrastructure/repositories/PostRepository';
import {
  authorization,
  centralizedAuthentication,
  userAuth,
} from '../../middlewares/auth';
import { upload } from '../../utilities/multer';
import PosController from '../controllers/postController';
import { StatusCodes } from '../statusCodes';

const express = require('express');

function createPostRouter() {
  const postRouter = express.Router();

  const postRepo = new PostRespository();
  const notficationRepo = new NotificationRepository();

  const createPost = new CreatePost(postRepo);
  const deletePost = new DeleletPost(postRepo);
  const getPosts = new GetPosts(postRepo);
  const likePost = new LIkePost(postRepo);
  const unlikePost = new UnlikePost(postRepo);
  const createNotification = new CreateNotification(notficationRepo);
  const getUserSpecificPost = new GetUserSpecificPost(postRepo);

  const postController = new PosController(
    createPost,
    deletePost,
    getPosts,
    likePost,
    unlikePost,
    createNotification,
    getUserSpecificPost
  );

  postRouter.post(
    '/post',
    centralizedAuthentication,
    authorization(['candidate', 'recruiter']),
    upload.single('media'),
    postController.createPost.bind(postController)
  );
  postRouter.delete(
    '/post/:postId',
    userAuth,
    postController.deletePost.bind(postController)
  );
  postRouter.patch(
    '/post/like/:postId/user/:creatorId',
    centralizedAuthentication,
    authorization(['candidate', 'recruiter']),
    postController.likePost.bind(postController)
  );
  postRouter.patch(
    '/post/unlike/:postId',
    centralizedAuthentication,
    authorization(['candidate', 'recruiter']),
    postController.unlikePost.bind(postController)
  );
  postRouter.get(
    '/post',
    userAuth,
    postController.getPosts.bind(postController)
  );
  postRouter.get(
    '/post/user',
    userAuth,
    postController.getUserPosts.bind(postController)
  );

  return postRouter;
}

const testMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Checking the data from the frontend', req.body);
  res
    .status(StatusCodes.ACCEPTED)
    .json({ success: false, message: 'Something went wrong' });
};

export default createPostRouter;
