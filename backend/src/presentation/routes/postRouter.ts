import { NextFunction, Request, Response } from 'express';
import express from 'express'
import {
  authorization,
  centralizedAuthentication,
} from '../../middlewares/auth';
import { upload } from '../../utilities/multer';
import { StatusCodes } from '../statusCodes';
import { container } from 'tsyringe';
import PostController from '../controllers/postController';

function createPostRouter() {
  const postRouter = express.Router();

  const postController = container.resolve(PostController)


  postRouter.post(
    '/post',
    centralizedAuthentication,
    authorization(['user']),
    upload.single('media'),
    postController.createPost.bind(postController)
  );
  // postRouter.delete(
  //   '/post/:postId',
  //   userAuth,
  //   postController.deletePost.bind(postController)
  // );
  postRouter.patch(
    '/post/like/:postId/',
    centralizedAuthentication,
    authorization(['user']),
    postController.likePost.bind(postController)
  );
  postRouter.patch(
    '/post/unlike/:postId',
    centralizedAuthentication,
    authorization(['user']),
    postController.unlikePost.bind(postController)
  );
  postRouter.get(
    '/post',
    centralizedAuthentication,
    authorization(['user']),
    postController.getPosts.bind(postController)
  );
  // postRouter.get(
  //   '/post/user',
  //   userAuth,
  //   postController.getUserPosts.bind(postController)
  // );

  postRouter.post(
    '/post/:postId/comment',
    centralizedAuthentication,
    authorization(['user']),
    postController.createComment.bind(postController)
  )

  postRouter.delete(
    '/post/:postId/comment/:commentId',
    centralizedAuthentication,
    authorization(['user']),
    postController.DeleteCommentUsecase.bind(postController)
  )

  return postRouter;
}

const testMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Checking the data from the frontend', req.body);
  res
    .status(StatusCodes.ACCEPTED)
    .json({ success: false, message: 'Testing create post route' });
};

export default createPostRouter;
