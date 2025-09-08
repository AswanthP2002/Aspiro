import { Request, Response } from "express";
import ICreatPost from "../../application/usecases/interfaces/ICreatePostUseCase";
import IDeletePos from "../../application/usecases/interfaces/IDeletePostUseCase";
import IGetPosts from "../../application/usecases/interfaces/IGetPosts";
import ILikePost from "../../application/usecases/interfaces/IlikePostUseCase";
import IUnlikePost from "../../application/usecases/interfaces/IUnlikePostUseCase";
import { Auth } from "../../middlewares/auth";
import { StatusCodes } from "../statusCodes";

export default class PosController {
    constructor(
        private _createPost : ICreatPost,
        private _deletePost : IDeletePos,
        private _getPosts : IGetPosts,
        private _likePost : ILikePost,
        private _unlikePost : IUnlikePost
    ) {}

    async createPost(req : Auth, res : Response) : Promise<void> {
        const creatorId = req.user.id
        const media = req.file?.buffer
        try {
            const result = await this._createPost.execute({creatorId, media, ...req.body})
            res.status(StatusCodes.OK).json({success:true, message:'created', result})
            return
        } catch (error : unknown) {
            console.log('Error occured while creating the post')
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async deletePost(req : Auth, res : Response) : Promise<void> {
        const postId = req.params.postId
        const creatorId = req.user.id
        try {
            await this._deletePost.execute(postId, creatorId)
            res.status(StatusCodes.OK).json({success:true, message:'Post deleted'})
            return
        } catch (error : unknown) {
            console.log('Error occured while deleting the post')
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async likePost(req : Auth, res : Response) : Promise<void> {
        const postId = req.params.postId
        const userId = req.user.id
        try {
            const result = await this._likePost.execute(postId, userId)
            res.status(StatusCodes.OK).json({success:true, message:'liked', result})
            return
        } catch (error : unknown) {
            console.log('Error occured while liking the post')
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async unlikePost(req : Auth, res : Response) : Promise<void> {
        const postId = req.params.postId
        const userId = req.user.id
        try {
            const result = await this._unlikePost.execute(postId, userId)
            res.status(StatusCodes.OK).json({success:true, message:'unliked', result})
        } catch (error : unknown) {
            console.log('Error occured while unlike the post')
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async getPosts(req : Auth, res : Response) : Promise<void> {
        try {
            const result = await this._getPosts.execute()
            res.status(StatusCodes.OK).json({success:true, message:'posts fetched', result})
            return
        } catch (error : unknown) {
            console.log('Error occured while getting the post')
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }
}