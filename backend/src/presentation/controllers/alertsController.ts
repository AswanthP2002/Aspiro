import { inject, injectable } from 'tsyringe';
import IGetUserAlertsUsecase from '../../application/interfaces/usecases/alerts/IGetUserAlerts.usecase';
// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import { IGetUnreadAlertsCountUsecase } from '../../application/interfaces/usecases/alerts/IGetUnreadAlerts.usecase';

@injectable()
export default class AlertsController {
  constructor(
    @inject('IGetUserAlertsUsecase') private _getUserAlerts: IGetUserAlertsUsecase,
    @inject('IGetUnreadAlertsCountUsecase')
    private _getUnreadAlertsCount: IGetUnreadAlertsCountUsecase
  ) {}

  async getMyAlerts(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const status = (req.query.status as string) || 'ALL';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;

    try {
      const result = await this._getUserAlerts.execute({
        userId,
        page,
        limit,
        status: status as 'ALL' | 'ACTIVE' | 'RESOLVED' | 'DISMISSED',
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Alerts'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getUnreadAlertsCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    try {
      const result = await this._getUnreadAlertsCount.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Unread alerts count'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
