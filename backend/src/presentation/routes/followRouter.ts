const express = require('express')
import { Request, Response } from 'express'
import FollowRepository from '../../infrastructure/repositories/FollowRepository'
import FollowController from '../controllers/followController'
import FollowUseruseCse from '../../application/usecases/FollowUserUseCase'
import UnfollowUserUseCase from '../../application/usecases/UnfollowUserUseCase'
import GetFollowersUseCase from '../../application/usecases/GetFollowersUseCase'
import GetFollowingUseCase from '../../application/usecases/GetFollowingUseCase'
import { userAuth } from '../../middlewares/auth'

async function createFollowRouter(){
    const followRouter = express.Router()

    const followRepo = new FollowRepository()

    const followUseCase = new FollowUseruseCse(followRepo)
    const unfolloUseCase = new UnfollowUserUseCase(followRepo)
    const getFollowersUseCse = new GetFollowersUseCase(followRepo)
    const getFollowingUseCase = new GetFollowingUseCase(followRepo)

    const followcontroller = new FollowController(
        followUseCase,
        unfolloUseCase,
        getFollowersUseCse,
        getFollowingUseCase
    )


    followRouter.post('/follow/:id', userAuth, followcontroller.followUser.bind(followcontroller))
    followRouter.delete('/follow/:id', userAuth, followcontroller.followUser.bind(followcontroller))
    followRouter.get('/followers', userAuth, followcontroller.getFollowers.bind(followcontroller))
    followRouter.get('/following', userAuth, followcontroller.getFollowing.bind(followcontroller))


    return followRouter
}

export default createFollowRouter