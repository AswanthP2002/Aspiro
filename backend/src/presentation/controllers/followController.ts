import { Request, Response } from "express";
import IFollowUserUseCase from "../../application/usecases/interfaces/IFollowUserUseCase";
import IGetFollowersUseCase from "../../application/usecases/interfaces/IGetFollowersUseCase";
import IGetFollowingUseCase from "../../application/usecases/interfaces/IGetFollowingUseCase";
import IUnFollowUserUsercase from "../../application/usecases/interfaces/IUnFollowUserUseCase";
import { Auth } from "../../middlewares/auth";
import { StatusCodes } from "../statusCodes";

export default class FollowController {
    constructor(
        private _followUseCase : IFollowUserUseCase,
        private _unfollowUseCase : IUnFollowUserUsercase,
        private _getFollowers : IGetFollowersUseCase,
        private _getFollowing : IGetFollowingUseCase
    ) {}

    async followUser(req : Auth, res : Response) : Promise<void> {
        const followerId = req.user.id
        const followingId = req.params.id
        const type = req.body
        try {
            const result = await this._followUseCase.execute({follower:followerId, following:followingId, type})
            res.status(StatusCodes.OK).json({success:true, message:'Followed', result})
            return
        } catch (error : unknown) {
            console.log('error occured while follwoing the user')
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            return
        }
    }

    async unfollowUser(req : Auth, res : Response) : Promise<void> {
        const followerId = req.user.id
        const followingId = req.params.id
        try {
            await this._unfollowUseCase.execute({follower:followerId, following:followingId})
            res.status(StatusCodes.OK).json({success:true, message:'Unfollowed'})
            return
        } catch (error : unknown) {
            console.log('Error occured while unfollowing user', error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            return
        }
    }

    async getFollowers(req : Auth, res : Response) : Promise<void> {
        const id = req.user.id
        try {
            const result = await this._getFollowers.execute(id)
            res.status(StatusCodes.OK).json({success:true, message:'Fetched followers', result})
            return
        } catch (error : unknown) {
            console.log('Error occured while geting followers of user', error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            return
        }
    }
    
    async getFollowing(req : Auth, res : Response) : Promise<void> {
        const id = req.user.id

        try {
            const result = await this._getFollowing.execute(id)
            res.status(StatusCodes.OK).json({success:true, message:"Fetched following", result})
            return 
        } catch (error : unknown) {
            console.log('Error occured while geting folloiwng of user', error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            return
        }
    }
}