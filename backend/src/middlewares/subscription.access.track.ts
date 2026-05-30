import { inject, injectable } from 'tsyringe';
import ILoadMySubscriptionDetailsUsecase from '../application/interfaces/usecases/subscription/ILoadMySubscriptionDetails.usecase';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../presentation/statusCodes';

@injectable()
export default class SubscriptionAccess {
  constructor(
    @inject('ILoadMySubscriptionDetails')
    private _loadMySubscription: ILoadMySubscriptionDetailsUsecase
  ) {}

  checkAccessStatus(feature: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user.id;
      const mySubscription = await this._loadMySubscription.execute(userId);

      if (
        mySubscription &&
        mySubscription.features[feature] &&
        !isNaN(parseInt(mySubscription.features[feature] as string))
      ) {
        if (parseInt(mySubscription.features[feature] as string) > 0) {
          next();
        } else {
          res
            .status(StatusCodes.FORBIDEN)
            .json({ success: false, message: 'You have reached your limit for this month' });

          return;
        }
      } else if (mySubscription && mySubscription.features[feature]) {
        next();
      } else {
        res.status(StatusCodes.FORBIDEN).json({
          success: false,
          message: 'Your current plan does not access to this feature. Upgrade your plan',
        });

        return;
      }
    };
  }
}
