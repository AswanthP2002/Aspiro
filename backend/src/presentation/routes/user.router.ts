import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { container } from 'tsyringe';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { upload } from '../../utilities/multer';
import Validator from '../../validation/validator.zod';
import { ResetPasswordSchema } from '../../application/DTOs/user/resetPassword.dto.FIX';
import { loginSchema } from '../schemas/user/userLoginRequest.zod.schema';
import { UrlSchema } from '../schemas/user/url.schema';
import { EditProfileSchema } from '../schemas/user/editProfile.schema';
import { CreateUserSchema } from '../schemas/user/createUserRequest.zod.schema.FIX';
import { verifyUserInputsSchema } from '../schemas/user/userVerifyRequest.zod.schema';
import { SaveUserBasicsSchema } from '../schemas/user/saveUserBasicsRequest.zod.schema';
import { UserApiRoutes } from '../../constants/Apis/user.routes';

function createUserRouter() {
  const userRouter = express.Router();

  const userController = container.resolve(UserController);

  userRouter.post(
    '/v1/user/register',
    Validator(CreateUserSchema),
    userController.registerUser.bind(userController)
  );
  userRouter.post(
    '/v1/user/verify',
    Validator(verifyUserInputsSchema),
    userController.verifyUser.bind(userController)
  );
  userRouter.post('/v1/user/otp/resend', userController.resendOTP.bind(userController)); //removed resend otp sending limit currently for testing :allowresendotp
  userRouter.post(
    UserApiRoutes.USER_AUTH_MANAGE.NORMAL_LOGIN,
    Validator(loginSchema),
    userController.userLogin.bind(userController)
  );
  userRouter.post('/logout', userController.userLogout.bind(userController));
  userRouter.get('/v1/token/refresh', userController.reAuthenticate.bind(userController));
  userRouter.get(UserApiRoutes.USER_PUBLIC.LOAD_JOBS, userController.loadJobs.bind(userController)); //no zod validation for load jobs query

  userRouter.get(
    UserApiRoutes.USER_PUBLIC.LOAD_JOB_DETAILS_BY_ID,
    userController.loadJobDetails.bind(userController)
  );

  userRouter.patch(
    '/v1/user/me/store-basics',
    centralizedAuthentication,
    authorization(['user']),
    Validator(SaveUserBasicsSchema),
    userController.saveUsersBasics.bind(userController)
  );
  userRouter.get(
    '/v1/user/me', //changed api for clarity
    centralizedAuthentication,
    authorization(['user']),
    userController.loadUserProfile.bind(userController)
  );
  userRouter.post(
    '/reset-password/link/send',
    userController.sendResetPasswordLink.bind(userController)
  );
  userRouter.post(
    '/reset-password',
    Validator(ResetPasswordSchema),
    userController.resetPassword.bind(userController)
  );

  userRouter.patch(
    UserApiRoutes.USER_PROFILE_MANAGE.PROFILE_DETAILS.EDIT,
    centralizedAuthentication,
    authorization(['user']),
    Validator(EditProfileSchema),
    userController.editMyProfile.bind(userController)
  );

  userRouter.post(
    UserApiRoutes.USER_JOB_MANAGE.APPLY_BY_JOBID,
    centralizedAuthentication,
    authorization(['user']),
    testMiddleware,
    userController.applyJob.bind(userController)
  );
  userRouter.get(
    UserApiRoutes.USER_JOB_MANAGE.CHECK_APPLIED_BY_JOBID,
    centralizedAuthentication,
    authorization(['user']),
    userController.checkIsJobApplied.bind(userController)
  );
  userRouter.post(
    UserApiRoutes.USER_JOB_MANAGE.SAVE_JOB,
    centralizedAuthentication,
    authorization(['user']),
    userController.saveJob.bind(userController)
  );
  userRouter.get(
    UserApiRoutes.USER_JOB_MANAGE.CHECK_SAVED_BY_JOBID,
    centralizedAuthentication,
    authorization(['user']),
    userController.checkIsJobSaved.bind(userController)
  );
  userRouter.get(
    UserApiRoutes.USER_JOB_MANAGE.LOAD_SAVED_JOBS,
    centralizedAuthentication,
    authorization(['user']),
    userController.getFavoriteJobs.bind(userController)
  );
  userRouter.delete(
    UserApiRoutes.USER_JOB_MANAGE.UNSAVE_JOB,
    centralizedAuthentication,
    authorization(['user']),
    userController.unsaveJob.bind(userController)
  );
  userRouter.patch(
    UserApiRoutes.USER_PROFILE_MANAGE.SOCIAL_LINKS.ADD,
    centralizedAuthentication,
    authorization(['user']),
    Validator(UrlSchema),
    userController.addSocialLink.bind(userController)
  );
  userRouter.patch(
    UserApiRoutes.USER_PROFILE_MANAGE.SOCIAL_LINKS.REMOVE,
    centralizedAuthentication,
    authorization(['user']),
    userController.deleteSocialLink.bind(userController)
  );
  userRouter.patch(
    UserApiRoutes.USER_PROFILE_MANAGE.PROFILE_PICTURE.UPLOAD,
    centralizedAuthentication,
    authorization(['user']),
    upload.single('profilePicture'),
    userController.uploadProfilePicture.bind(userController)
  );
  userRouter.patch(
    UserApiRoutes.USER_PROFILE_MANAGE.PROFILE_PICTURE.REMOVE,
    centralizedAuthentication,
    authorization(['user']),
    userController.removeProfilePicture.bind(userController)
  );
  userRouter.patch(
    UserApiRoutes.USER_PROFILE_MANAGE.COVER_PHOTO.UPLOAD,
    centralizedAuthentication,
    authorization(['user']),
    upload.single('coverPhoto'),
    userController.uploadCoverphoto.bind(userController)
  );
  userRouter.patch(
    UserApiRoutes.USER_PROFILE_MANAGE.COVER_PHOTO.REMOVE,
    centralizedAuthentication,
    authorization(['user']),
    userController.removeCoverphoto.bind(userController)
  );
  userRouter.delete(
    UserApiRoutes.USER_JOB_MANAGE.WITHDRAW_APPLICATION,
    centralizedAuthentication,
    authorization(['user']),
    userController.withdrawApplication.bind(userController)
  );
  userRouter.get(
    UserApiRoutes.USER_JOB_MANAGE.GET_MY_INTERVIEWS,
    centralizedAuthentication,
    authorization(['user']),
    userController.getScheduledInterviews.bind(userController)
  );
  userRouter.get(
    UserApiRoutes.USER_JOB_MANAGE.TRACK_MY_APPLICATION,
    centralizedAuthentication,
    authorization(['user']),
    userController.trackMyApplication.bind(userController)
  );
  // userRouter.get(
  //   '/v1/user/me/alerts',
  //   centralizedAuthentication,
  //   authorization(['user', 'recruiter', 'admin']),
  //   userController.getMyAlerts.bind(userController)
  // );
  userRouter.get(
    '/v1/users/:userId',
    centralizedAuthentication,
    authorization(['user']),
    userController.loadUsersPublicProfile.bind(userController)
  );
  // userRouter.get(
  //   '/v1/user/me/metadata', //route flaged due to authenticated user related issues
  //   centralizedAuthentication,
  //   authorization(['user']),
  //   userController.loadUserMetaData.bind(userController)
  // );
  userRouter.get(
    UserApiRoutes.USER_PUBLIC.LOAD_USERS,
    centralizedAuthentication,
    authorization(['user']),
    userController.getUsers.bind(userController)
  );

  userRouter.get(
    UserApiRoutes.USERS.LOAD_ALL_USERS,
    centralizedAuthentication,
    authorization(['admin']),
    userController.loadUsers.bind(userController)
  );

  userRouter.get(
    UserApiRoutes.USERS.LOAD_USER_DETAILS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    userController.loadUserDetails.bind(userController)
  );

  userRouter.patch(
    UserApiRoutes.USERS.BLOCK_USER_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    userController.blockUser.bind(userController)
  );

  userRouter.patch(
    UserApiRoutes.USERS.UNBLOCK_USER_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    userController.unBlockUser.bind(userController)
  );

  userRouter.delete(
    UserApiRoutes.USERS.DELETE_USER_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    userController.deleteUser.bind(userController)
  );

  userRouter.patch(
    UserApiRoutes.USERS.BAN_USER_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    userController.userBan.bind(userController)
  );

  userRouter.get(
    '/v1/similar-people',
    (req: Request, res: Response, next: NextFunction) => {
      console.log('Passed through the api endpoint going to the auth');
      next();
    },
    centralizedAuthentication,
    (req: Request, res: Response, next: NextFunction) => {
      console.log('Passed through the authentication endpoint going to the authroization');
      next();
    },
    authorization(['user']),
    (req: Request, res: Response, next: NextFunction) => {
      console.log('Passed through the authorization endpoint going to the controller');
      next();
    },
    userController.getSimilarUsers.bind(userController)
  );

  userRouter.post(
    UserApiRoutes.AI_INTERVIEW.START,
    centralizedAuthentication,
    authorization(['user']),
    userController.aiInterview.bind(userController)
  );

  userRouter.get(
    UserApiRoutes.AI_INTERVIEW.LOAD_DASHBOARD,
    centralizedAuthentication,
    authorization(['user']),
    userController.loadInterviewDashboard.bind(userController)
  );

  // candidateRouter.get(
  //   '/candidates/:candidateId',
  //   candidateController.getCandidateDetails.bind(candidateController)
  // );
  userRouter.get(
    UserApiRoutes.USER_JOB_MANAGE.LOAD_MY_APPLICATIONS,
    centralizedAuthentication,
    authorization(['user']),
    userController.getCandidateApplications.bind(userController)
  );

  userRouter.get(
    UserApiRoutes.USERS.LOAD_USER_FULL_PROFILE_DETAILS,
    centralizedAuthentication,
    authorization(['user']),
    userController.loadUserFullProfileForResumeBuidling.bind(userController)
  );
  // userRouter.post(
  //   '/v1/user/connect-request/:receiverId',
  //   centralizedAuthentication,
  //   authorization(['user']),
  //   userController.sendConnectionRequest.bind(userController)
  // );
  // userRouter.patch(
  //   '/v1/user/connection-request-cancel/:receiverId',
  //   centralizedAuthentication,
  //   authorization(['user']),
  //   userController.cancelConnectionRequest.bind(userController)
  // );
  // userRouter.patch(
  //   '/v1/user/connection-request-reject',
  //   centralizedAuthentication,
  //   authorization(['user']),
  //   userController.rejectConnectionRequest.bind(userController)
  // );
  // userRouter.patch(
  //   '/v1/user/connection-request-accept/',
  //   centralizedAuthentication,
  //   authorization(['user']),
  //   userController.acceptConnectionRequest.bind(userController)
  // );

  userRouter.get('/v1/infinity', userController.testInfinityScroll.bind(userController));

  function testMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('--inspectng request body', req.body);
    next();
    ///res.status(StatusCodes.OK).json({success:true, message:'Testing flow'})
  }

  // // candidateRouter.get('/get/user/:id', getAuthUserData)

  return userRouter;
}

export default createUserRouter;
