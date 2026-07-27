import express from 'express';
import { container } from 'tsyringe';
import { ConnectionController } from '../controllers/connectionController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { ConnectionApiRoutes } from '../../constants/Apis/connection.api.routes';
import SubscriptionAccess from '../../middlewares/subscription.access.track';

function CreateConnectionRouter() {
  const connectionRouter = express.Router();
  const connectionController = container.resolve(ConnectionController);
  const subscriptionAccessTrack = container.resolve(SubscriptionAccess);

  connectionRouter.post(
    ConnectionApiRoutes.SEND_CONNECTION_REQUEST,
    centralizedAuthentication,
    authorization(['user']),
    subscriptionAccessTrack.checkAccessStatus('connectionRequests'),
    connectionController.sendConnectionRequest.bind(connectionController)
  );
  connectionRouter.patch(
    ConnectionApiRoutes.CANCEL_CONNECTION_REQUEST,
    centralizedAuthentication,
    authorization(['user']),
    connectionController.cancelConnectionRequest.bind(connectionController)
  );
  connectionRouter.patch(
    ConnectionApiRoutes.REJECT_CONNECTION_REQUEST,
    centralizedAuthentication,
    authorization(['user']),
    connectionController.rejectConnectionRequest.bind(connectionController)
  );
  connectionRouter.patch(
    ConnectionApiRoutes.ACCEPT_CONNECTION_REQUEST,
    centralizedAuthentication,
    authorization(['user']),
    connectionController.acceptConnectionRequest.bind(connectionController)
  );
  connectionRouter.get(
    ConnectionApiRoutes.FETCH_CONNECTIONS,
    centralizedAuthentication,
    authorization(['user']),
    connectionController.getConnections.bind(connectionController)
  );
  connectionRouter.delete(
    ConnectionApiRoutes.REMOVE_CONNECTION,
    centralizedAuthentication,
    authorization(['user']),
    connectionController.removeConnection.bind(connectionController)
  );

  return connectionRouter;
}

export default CreateConnectionRouter;
