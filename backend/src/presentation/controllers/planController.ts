import { inject, injectable } from 'tsyringe';
import ICreatePlanUsecase from '../../application/interfaces/usecases/plan/ICreatePlan.usecase';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import { CreatePlanDTO, EditPlanDTO } from '../../application/DTOs/plan/plan.dto';
import IAdminGetPlansUsecase from '../../application/interfaces/usecases/plan/IAdminGetPlans.usecase';
import IAdminDeletePlanUsecase from '../../application/interfaces/usecases/plan/IAdminDeletePlan.usecase';
import IAdminEditPlanUsecase from '../../application/interfaces/usecases/plan/IAdminEditPlan.usecase';
import { IAdminTogglePlanListingUsecase } from '../../application/interfaces/usecases/plan/IAdminTogglePlanListing.usecase';
import IGetPlansForUserUsecase from '../../application/interfaces/usecases/plan/IGetPlansForUsers.use ase';
import IUserSubscribeFreePlanUsecase from '../../application/interfaces/usecases/subscription/IUser.subscribe.freePlan.usecase';
import IHandleWebhookUsecase from '../../application/interfaces/usecases/subscription/IHandleWebhookUsecase';
import IUserSubscribePaidPlanUsecase from '../../application/interfaces/usecases/subscription/IUser.subscribe.paidePlan.usecase';
import IGetSessionDetailsUsecase from '../../application/interfaces/usecases/subscription/IGetSessionDetails.usecase';
import IAdminGetAnalyticsUsecase from '../../application/interfaces/usecases/plan/IGetAdminAnalytics.usecase';
import ILoadMySubscriptionDetailsUsecase from '../../application/interfaces/usecases/subscription/ILoadMySubscriptionDetails.usecase';
import IGetUserInvoicesUsecase from '../../application/interfaces/usecases/subscription/IGetUserInvoices.usecase';
import ISubscriptionPortalUsecase from '../../application/interfaces/usecases/subscription/ISubscriptionPortal.usecase';
import IGetPaymentMethodsUsecase from '../../application/interfaces/usecases/subscription/IGetPaymentMethods.usecase';
import ILoadUserDetailsForResumeBuildingUsecase from '../../application/interfaces/usecases/user/ILoadUserDetailsForResumeBuidling.usecase';

@injectable()
export default class PlanController {
  constructor(
    @inject('ICreatePlanUsecase') private _createPlan: ICreatePlanUsecase,
    @inject('IAdminGetPlanUsecase') private _adminGetPlans: IAdminGetPlansUsecase,
    @inject('IAdminDeletePlanUsecase') private _adminDeletePlan: IAdminDeletePlanUsecase,
    @inject('IAdminEditPlanUsecase') private _adminEditPlan: IAdminEditPlanUsecase,
    @inject('IAdminTogglePlanListingUsecase')
    private _adminTogglePlanListing: IAdminTogglePlanListingUsecase,
    @inject('IGetPlansForUsersUsecase') private _getPlansForUsers: IGetPlansForUserUsecase,
    @inject('IUserSubscribeFreePlanUsecase')
    private _subscribeFreePlan: IUserSubscribeFreePlanUsecase,
    @inject('IHandleWebhookUsecase') private _handleWebhook: IHandleWebhookUsecase,
    @inject('IUserSubscribePaidPlanUsecase')
    private _subscribePaidPlan: IUserSubscribePaidPlanUsecase,
    @inject('IGetSessionDetailsUsecase') private _getSessionDetails: IGetSessionDetailsUsecase,
    @inject('IAdminGetAnalyticsUsecase') private _getAnalytics: IAdminGetAnalyticsUsecase,
    @inject('ILoadMySubscriptionDetails')
    private _loadMySubscriptionDetails: ILoadMySubscriptionDetailsUsecase,
    @inject('IGetUserInvoicesUsecase') private _getUserInvoices: IGetUserInvoicesUsecase,
    @inject('ISubscriptionPortalUsecase') private _subscriptionPortal: ISubscriptionPortalUsecase,
    @inject('IGetPaymentMethodsUsecase') private _getPaymentMethods: IGetPaymentMethodsUsecase
  ) {}

  async createPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('-- inspecing request body --', req.body);
    const payload = {
      name: req.body.planName,
      description: req.body.planDescription,
      monthlyPrice: req.body.monthlyPrice,
      yearlyPrice: req.body.yearlyPrice,
      trialPeriod: req.body.trialPeriod,
      badgeIcon: req.body.badgeIcon,
      isListed: req.body.isListed,
      currency: 'INR',
      billingCycle: 'monthly',
      features: req.body.features,
      featuresListed: {
        jobPosts: req.body.jobPosts,
        directMessaging: req.body.directMessaging,
        connectionRequests: req.body.connectionRequests,
        interviewPractice: req.body.interviewPractice,
        isListed: req.body.isListed,
        jobApplications: req.body.jobApplications,
        jobRecommendation: req.body.jobRecommendation,
        pushJob: req.body.pushJob,
        recruiterProfile: req.body.recruiterProfile,
        resumeAnalyzer: req.body.resumeAnalyzer,
        resumeBuilder: req.body.resumeBuilder,
        smartFilter: req.body.smartFilter,
        socialFeed: req.body.socialFeed,
      },
      isActive: req.body.isListed,
    };

    try {
      const result = await this._createPlan.execute(payload as CreatePlanDTO);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Subscription plan'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async adminGetPlans(req: Request, res: Response, next: NextFunction): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    try {
      const result = await this._adminGetPlans.execute({ page, limit });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Subscription plans'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async adminDeletePlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    const planId = req.params.planId;
    try {
      await this._adminDeletePlan.execute(planId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Subscription plan'),
      });
    } catch (error) {
      next(error);
    }
  }

  async adminTogglePlanListing(req: Request, res: Response, next: NextFunction): Promise<void> {
    const planId = req.params.planId;
    const status = req.query.status as 'LIST' | 'UNLIST';

    try {
      const result = await this._adminTogglePlanListing.execute({ planId, status });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Subscription plan listing status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async adminEditPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    const planId = req.params.planId;
    const payload = {
      name: req.body.planName,
      description: req.body.planDescription,
      monthlyPrice: req.body.monthlyPrice,
      yearlyPrice: req.body.yearlyPrice,
      trialPeriod: req.body.trialPeriod,
      badgeIcon: req.body.badgeIcon,
      isListed: req.body.isListed,
      currency: 'INR',
      billingCycle: 'monthly',
      features: req.body.features,
      featuresListed: {
        jobPosts: req.body.jobPosts,
        directMessaging: req.body.directMessaging,
        connectionRequests: req.body.connectionRequests,
        interviewPractice: req.body.interviewPractice,
        isListed: req.body.isListed,
        jobApplications: req.body.jobApplications,
        jobRecommendation: req.body.jobRecommendation,
        pushJob: req.body.pushJob,
        recruiterProfile: req.body.recruiterProfile,
        resumeAnalyzer: req.body.resumeAnalyzer,
        resumeBuilder: req.body.resumeBuilder,
        smartFilter: req.body.smartFilter,
        socialFeed: req.body.socialFeed,
      },
      isActive: req.body.isListed,
    };
    try {
      const result = await this._adminEditPlan.execute({ _id: planId, ...payload } as EditPlanDTO);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Subscription plan'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPlansForUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getPlansForUsers.execute();
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Subscription plans'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async userSubscribeFreePlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('request reached inside controller for subscribing');
    const userId = req.user.id;
    const planId = req.params.planId;
    console.log('-- plan id and user id ', planId, userId);
    try {
      const result = await this._subscribeFreePlan.execute({ userId, planId });
      console.log('plan created succesfully');
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Free plan'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sig = req.headers['stripe-signature'] as string;
    const rawBody = req.body;

    try {
      await this._handleWebhook.execute(sig, rawBody);
      res.status(StatusCodes.OK).json({ received: true });
    } catch (error) {
      next(error);
    }
  }

  async userSubscribePaidPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('request reached inside controller for subscribing');
    const userId = req.user.id;
    const planId = req.params.planId;
    console.log('-- plan id and user id ', planId, userId);
    try {
      const result = await this._subscribePaidPlan.execute({ planId, userId });
      console.log('plan created succesfully');
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Free plan'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getSessionDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sessionId = req.params.sessionId;

    try {
      const result = await this._getSessionDetails.execute(sessionId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Payment seession details'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
    // const sessionId = req.params.sessionId;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 7;
    const status = (req.query.status as string) || 'all';
    try {
      const result = await this._getAnalytics.execute(search, page, limit, status);
      console.log('result for the frontend', result);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Analytics'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async loadMySubscriptionDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._loadMySubscriptionDetails.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Subscription details'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getUserInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
    // const userId = req.user.id;
    const stripeCustomerId = req.params.stripeCustomerId;

    try {
      const result = await this._getUserInvoices.execute(stripeCustomerId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Subscription details'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async subscriptionPortal(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._subscriptionPortal.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Subscription details'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getPaymentMethods(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._getPaymentMethods.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Payment Methods'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }
}
