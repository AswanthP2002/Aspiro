import GetUserSpecificPost from "../../application/usecases/candidate/GetUserSpecificPostUseCase"
import CreateNotification from "../../application/usecases/common/useCases/CreateNotificationUseCase"
import CreatePost from "../../application/usecases/CreatePostUseCase"
import DeleletPost from "../../application/usecases/DeletePostUseCase"
import GetPosts from "../../application/usecases/GetPostsUseCase"
import LIkePost from "../../application/usecases/LikePostUseCase"
import UnlikePost from "../../application/usecases/UnlikePostUseCase"
import NotificationRepository from "../../infrastructure/repositories/notificationRepository"
import PostRespository from "../../infrastructure/repositories/PostRepository"
import { userAuth } from "../../middlewares/auth"
import { upload } from "../../utilities/multer"
import PosController from "../controllers/postController"

const express = require('express')

async function createPostRouter(){
    const postRouter = express.Router()

    const postRepo = new PostRespository()
    const notficationRepo = new NotificationRepository()

    const createPost = new CreatePost(postRepo)
    const deletePost = new DeleletPost(postRepo)
    const getPosts = new GetPosts(postRepo)
    const likePost = new LIkePost(postRepo)
    const unlikePost = new UnlikePost(postRepo)
    const createNotification = new CreateNotification(notficationRepo)
    const getUserSpecificPost = new GetUserSpecificPost(postRepo)

    const postController = new PosController(
        createPost,
        deletePost,
        getPosts,
        likePost,
        unlikePost,
        createNotification,
        getUserSpecificPost
    )

    postRouter.post('/post', userAuth, upload.single('media'), postController.createPost.bind(postController))
    postRouter.delete('/post/:postId', userAuth, postController.deletePost.bind(postController))
    postRouter.patch('/post/like/:postId/user/:creatorId', userAuth, postController.likePost.bind(postController))
    postRouter.patch('/post/unlike/:postId', userAuth, postController.unlikePost.bind(postController))
    postRouter.get('/post', userAuth, postController.getPosts.bind(postController))
    postRouter.get('/post/user', userAuth, postController.getUserPosts.bind(postController))

    return postRouter
}

export default createPostRouter