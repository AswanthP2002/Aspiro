import express from 'express'
import { container } from 'tsyringe'
import NotificationController from '../controllers/notificationController'
import { authorization, centralizedAuthentication } from '../../middlewares/auth'

function createNotificationRouter(){
    let notificationRouter = express.Router()

    const notificationController = container.resolve(NotificationController)

    notificationRouter.get(
        '/notifications',
        centralizedAuthentication,
        authorization(['user', 'admin', 'recruiter']),
        notificationController.getUserSpecificNotifications.bind(notificationController)
    )


    return notificationRouter
}

export default createNotificationRouter
