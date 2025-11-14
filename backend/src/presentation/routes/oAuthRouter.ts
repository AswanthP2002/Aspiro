import express from 'express';
import OAuthController from '../controllers/oAuthController';
import { container } from 'tsyringe';

function CreateOAuthRouter() {
  const oAuthRouter = express.Router();

  const oAuthController = container.resolve(OAuthController)

  oAuthRouter.post('/google/sign-up', oAuthController.googleLogin.bind(oAuthController));

  return oAuthRouter;
}

export default CreateOAuthRouter;
