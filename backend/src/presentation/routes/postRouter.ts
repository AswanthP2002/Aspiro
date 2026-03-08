import express from 'express';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { upload } from '../../utilities/multer';
import { container } from 'tsyringe';
import PostController from '../controllers/postController';
import Validator from '../../validation/validator.zod';
import { createPostSchema } from '../schemas/user/createPost.schema';
import { PostApiRoutes } from '../../constants/Apis/post.routes';

function createPostRouter() {
  const postRouter = express.Router();

  const postController = container.resolve(PostController);

  postRouter.post(
    PostApiRoutes.UPLOAD_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    upload.single('media'),
    Validator(createPostSchema),
    postController.createPost.bind(postController)
  );
  postRouter.delete(
    PostApiRoutes.DELETE_A_POST_BY_ID,
    centralizedAuthentication,
    authorization(['user']),
    postController.deletePost.bind(postController)
  );
  postRouter.patch(
    PostApiRoutes.LIKE_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    postController.likePost.bind(postController)
  );
  postRouter.patch(
    PostApiRoutes.UNLIKE_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    postController.unlikePost.bind(postController)
  );
  postRouter.get(
    PostApiRoutes.GET_POSTS,
    centralizedAuthentication,
    authorization(['user']),
    postController.getPosts.bind(postController)
  );
  postRouter.patch(
    PostApiRoutes.HIDE_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    postController.hidePost.bind(postController)
  );
  postRouter.patch(
    PostApiRoutes.UNHIDE_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    postController.unHidePost.bind(postController)
  );
  postRouter.patch(
    PostApiRoutes.SAVE_UNSAVE_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    postController.toggleSavePost.bind(postController)
  );
  // postRouter.get(
  //   '/post/user',
  //   userAuth,
  //   postController.getUserPosts.bind(postController)
  // );

  postRouter.post(
    PostApiRoutes.COMMENT_ON_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    postController.createComment.bind(postController)
  );

  postRouter.delete(
    PostApiRoutes.DELETE_COMMENT_FROM_A_POST,
    centralizedAuthentication,
    authorization(['user']),
    postController.deleteComment.bind(postController)
  );
  postRouter.patch(
    PostApiRoutes.LIKE_A_COMMENT,
    centralizedAuthentication,
    authorization(['user']),
    postController.likeComment.bind(postController)
  );
  postRouter.patch(
    PostApiRoutes.UNLIKE_A_COMMENT,
    centralizedAuthentication,
    authorization(['user']),
    postController.unlikeComment.bind(postController)
  );

  return postRouter;
}

export default createPostRouter;
