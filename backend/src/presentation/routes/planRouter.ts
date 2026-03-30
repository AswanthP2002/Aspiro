import express, { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import PlanController from '../controllers/planController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { PlanApiRoutes } from '../../constants/Apis/plan.api.routes';

function CreatePlanRouter() {
  const planRouter = express.Router();
  const planController = container.resolve(PlanController);

  planRouter.post(
    PlanApiRoutes.ADMIN.CREATE_PLAN,
    centralizedAuthentication,
    authorization(['admin']),
    planController.createPlan.bind(planController)
  );

  planRouter.get(
    PlanApiRoutes.ADMIN.GET_PLANS,
    centralizedAuthentication,
    authorization(['admin']),
    planController.adminGetPlans.bind(planController)
  );

  planRouter.delete(
    PlanApiRoutes.ADMIN.DELETE_PLAN_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    planController.adminDeletePlan.bind(planController)
  );

  planRouter.put(
    PlanApiRoutes.ADMIN.EDIT_PLAN_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    planController.adminEditPlan.bind(planController)
  );

  planRouter.patch(
    PlanApiRoutes.ADMIN.TOGGLE_PLAN_LISTING_STATUS,
    centralizedAuthentication,
    authorization(['admin']),
    planController.adminTogglePlanListing.bind(planController)
  );

  planRouter.get(
    PlanApiRoutes.USER.GET_PLANST,
    centralizedAuthentication,
    authorization(['user']),
    planController.getPlansForUsers.bind(planController)
  );

  planRouter.post(
    PlanApiRoutes.USER.SUBSCRIBE_FREE_PLAN,
    centralizedAuthentication,
    authorization(['user']),
    planController.userSubscribeFreePlan.bind(planController)
  );

  planRouter.post(
    PlanApiRoutes.USER.SUBSCRIBE_PAID_PLAN,
    centralizedAuthentication,
    authorization(['user']),
    planController.userSubscribePaidPlan.bind(planController)
  );

  planRouter.get(
    PlanApiRoutes.USER.GET_SESSION_DETAILS,
    centralizedAuthentication,
    authorization(['user']),
    planController.getSessionDetails.bind(planController)
  );

  planRouter.get(
    PlanApiRoutes.ADMIN.LOAD_ANAYTICS,
    centralizedAuthentication,
    authorization(['admin']),
    planController.getAnalytics.bind(planController)
  );

  planRouter.get(
    PlanApiRoutes.USER.LOAD_MY_SUBSCRIPTION_DETAILS,
    centralizedAuthentication,
    authorization(['user']),
    planController.loadMySubscriptionDetails.bind(planController)
  );

  planRouter.get(
    PlanApiRoutes.USER.GET_USER_INVOICES,
    centralizedAuthentication,
    authorization(['user']),
    planController.getUserInvoices.bind(planController)
  );

  planRouter.get(
    PlanApiRoutes.USER.MANAGE_BILLING_PORTAL,
    centralizedAuthentication,
    authorization(['user']),
    planController.subscriptionPortal.bind(planController)
  )

  planRouter.get(
    PlanApiRoutes.USER.GET_PAYMENT_METHODS,
    centralizedAuthentication,
    authorization(['user']),
    planController.getPaymentMethods.bind(planController)
  )

  return planRouter;
}

export default CreatePlanRouter;
