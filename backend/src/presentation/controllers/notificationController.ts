import { inject, injectable } from "tsyringe";
import IGetUserSpecificNotificationUsecase from "../../application/interfaces/usecases/shared/IGetUserSpecificNotifications.usecase";
import { Auth } from "../../middlewares/auth";
import { NextFunction, Response } from "express";
import { StatusCodes } from "../statusCodes";

@injectable()
export default class NotificationController {
    constructor(
        @inject('IGetUserSpecificNotificationsUsecase') private _getUserSpecificNotifications: IGetUserSpecificNotificationUsecase
    ) {}

    async getUserSpecificNotifications(req: Auth, res: Response, next: NextFunction): Promise<void> {
        const userId = req.user.id

        try {
            const notifications = await this._getUserSpecificNotifications.execute(userId)

            res.status(StatusCodes.OK).json({success:true, message: 'Fetched notifications', notifications})
        } catch (error: unknown) {
            next(error)
        }
    }
}