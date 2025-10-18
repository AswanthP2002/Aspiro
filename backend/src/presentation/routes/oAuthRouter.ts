import express from 'express';
import CandidateRepository from '../../infrastructure/repositories/candidate/candidateRepository';
import GoogleLoginUseCase from '../../application/usecases/GoogleLogin.usecase';
import GoogleAuthService from '../../infrastructure/services/GoogleAuthService';
import OAuthController from '../controllers/oAuthController';
import UserRepository from '../../infrastructure/repositories/userRepository';

function CreateOAuthRouter() {
  const oAuthRouter = express.Router();

  const candidateRepo = new CandidateRepository();
  const userRepo = new UserRepository();

  const googleTokenVerifyUseCase = new GoogleAuthService();

  const googleLoginUseCase = new GoogleLoginUseCase(
    candidateRepo,
    googleTokenVerifyUseCase,
    userRepo
  );

  const oAuthController = new OAuthController(googleLoginUseCase);

  oAuthRouter.post('/google/sign-up', oAuthController.googleLogin.bind(oAuthController));

  return oAuthRouter;
}

export default CreateOAuthRouter;
