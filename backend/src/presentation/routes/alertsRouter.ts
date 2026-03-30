import express from 'express';
import { container } from 'tsyringe';
import AlertsController from '../controllers/alertsController';
import { AlertsApiRoutes } from '../../constants/Apis/alerts.api.routes';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';

function CreateAlertsRouter() {
  const alertsRouter = express.Router();
  const alertsController = container.resolve(AlertsController);

  alertsRouter.get(
    AlertsApiRoutes.ALERTS.FETCH_ALERTS,
    centralizedAuthentication,
    authorization(['user', 'recruiter', 'admin']),
    alertsController.getMyAlerts.bind(alertsController)
  );

  alertsRouter.get(
    AlertsApiRoutes.ALERTS.GET_UNREAD_ALERTS_COUNT,
    centralizedAuthentication,
    authorization(['user']),
    alertsController.getUnreadAlertsCount.bind(alertsController)
  );

  return alertsRouter;
}

export default CreateAlertsRouter;
