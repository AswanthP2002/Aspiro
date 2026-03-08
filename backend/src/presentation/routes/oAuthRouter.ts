import express from 'express';
import OAuthController from '../controllers/oAuthController';
import { container } from 'tsyringe';
import { UserApiRoutes } from '../../constants/Apis/user.routes';

function CreateOAuthRouter() {
  const oAuthRouter = express.Router();

  const oAuthController = container.resolve(OAuthController);

  oAuthRouter.post(
    UserApiRoutes.USER_AUTH_MANAGE.GOOGLE_LOGIN,
    oAuthController.googleLogin.bind(oAuthController)
  );

  return oAuthRouter;
}

export default CreateOAuthRouter;
