// import { upload } from '../../utilities/multer';
// import { NextFunction, Request, Response } from 'express';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
// import {
//   authorization,
//   candidateAuth,
//   centralizedAuthentication,
//   refreshAccessToken,
//   userAuth,
// } from '../../middlewares/auth';
// import CandidateRepository from '../../infrastructure/repositories/candidate/candidateRepository';
// import RegisterCandidateUseCase from '../../application/usecases/candidate/registerCandidate.usecase';
// import VerifyUserUseCase from '../../application/usecases/VerifyUser.usecase';
// import { LoginCandidateUseCase } from '../../application/usecases/candidate/LoginCandidate.usecase.refactored';
// import SaveIntroDetailsUseCase from '../../application/usecases/candidate/SaveBasicsCandidate.usecase';
// import { LoadCandidatePersonalDataUC } from '../../application/usecases/candidate/LoadCandidatePersonalData.usecase';
// import ExperienceRepository from '../../infrastructure/repositories/candidate/experienceRepository';
// import AddExperienceUseCase from '../../application/usecases/candidate/AddExperience.usecase';
// import { StatusCodes } from '../statusCodes';
// import GetExperienceUseCase from '../../application/usecases/candidate/GetExperiences.usecase';
// import DeleteExperienceUseCase from '../../application/usecases/candidate/DeleteExperience.usecase';
// import EditExperienceUseCase from '../../application/usecases/candidate/EditExperience.usecase';
// import JobRepository from '../../infrastructure/repositories/jobRepository';
// import LoadJobsCandidateSideUseCase from '../../application/usecases/candidate/loadJobLists.usecase';
// import LoadJobDetailsCandidateSide from '../../application/usecases/candidate/loadJobDetails.usecase';
// import SkillRepsitory from '../../infrastructure/repositories/candidate/skillRespository';
// import AddSkill from '../../application/usecases/candidate/AddSkill.usecase';
// import GetSkillsUseCase from '../../application/usecases/candidate/GetSkills.usecase';
// import DeleteSkillUseCase from '../../application/usecases/candidate/deleteSkill.usecase';
// import EducationRepository from '../../infrastructure/repositories/candidate/educationRepository';
// import AddEducationUseCase from '../../application/usecases/candidate/AddEducation.usecase';
// import GetEducationsUseCase from '../../application/usecases/candidate/GetEducations.usecase';
// import DeleteEducationUseCase from '../../application/usecases/candidate/DeleteEducation.usecase';
// import EditEducationUseCase from '../../application/usecases/candidate/EditEducation.usecase';
// import ResumeRepository from '../../infrastructure/repositories/candidate/resumeRepository';
// import AddResumeUseCase from '../../application/usecases/candidate/AddResume.usecase';
// import LoadResumesUseCase from '../../application/usecases/candidate/LoadResume.usecase';
// import DeleteResumeUseCase from '../../application/usecases/candidate/DeleteResume.usecase';
// import CertificateRepository from '../../infrastructure/repositories/candidate/certificateRepository';
// import AddCertificateUseCase from '../../application/usecases/candidate/AddCertificate.usecase';
// import GetCertificatesUseCase from '../../application/usecases/candidate/GetCertificates.usecase';
// import JObApplicationRepository from '../../infrastructure/repositories/JobApplicationRepository';
// import SaveJobApplicationUseCase from '../../application/usecases/ApplyJob.usecase';
// import parsePdf from '../../middlewares/parsePdf';
// import SearchJobsFromHomeUseCase from '../../application/usecases/SearchJobsFromHome.usecase';
// // import { connectDb } from "../../../infrastructure/database/connection"
// // import { Db } from "mongodb"
// import EditProfileUseCase from '../../application/usecases/candidate/EditProfile.usecase';
// import GetNotificationsUseCase from '../../application/usecases/candidate/GetNotifications.usecase';
// import NotificationRepository from '../../infrastructure/repositories/notificationRepository';
// import FavoriteJobsRepsitory from '../../infrastructure/repositories/candidate/favoriteJobsRepository';
// import SaveFavoriteJobUseCase from '../../application/usecases/candidate/SaveFavoriteJob.usecase';
// import CheckIsJobSavedUseCase from '../../application/usecases/candidate/CheckIsJobSaved.usecase';
// import GetFavoriteJobUseCase from '../../application/usecases/candidate/GetFavoriteJobs.usecase';
// import UnsaveJobUseCase from '../../application/usecases/candidate/UnsaveJob.usecase';
// import AddSocialLinkUseCase from '../../application/usecases/candidate/AddSocialLink.usecase';
// import DeleteSocialLinkUseCase from '../../application/usecases/candidate/DeleteSocialLink.usecase';
// import UploadProfilePictureUseCase from '../../application/usecases/candidate/UploadProfilePicture.usecase';
// import RemoveProfilePictureUseCase from '../../application/usecases/candidate/RemoveProfilePicture.usecase';
// import UploadCoverphotoUseCase from '../../application/usecases/candidate/UploadCoverphoto.usecase';
// import RemoveCoverphotoUseCase from '../../application/usecases/candidate/RemoveCoverphoto.usecase';
// import GetCandidatesUseCase from '../../application/usecases/GetCandidates.usecase';
// import GetCandidateDetailsUseCase from '../../application/usecases/GetCandidateDetails.usecase';
// import GetCandidateApplicationsUseCase from '../../application/usecases/candidate/GetCandidateApplications.usecase';
// import UpdateNotificationReadStatus from '../../application/usecases/candidate/UpdateNotificationReadStatus.usecase';
// import UserRepository from '../../infrastructure/repositories/userRepository';
// import CreateUserUseCase from '../../application/usecases/user/CreateUser.usecase';
// import FindCandidateByUserIdUseCase from '../../application/usecases/candidate/FindCandidateByUserId.usecase';
import { container } from 'tsyringe';
import allowResendOtp from '../../middlewares/OtpRequestLimitCheck';
import {
  authorization,
  centralizedAuthentication,
  refreshAccessToken,
} from '../../middlewares/auth';
import { upload } from '../../utilities/multer';
import { StatusCodes } from '../statusCodes';
import Validator from '../../validation/validator.zod';
import { ResetPasswordSchema } from '../../application/DTOs/user/resetPassword.dto.FIX';
import { loginSchema } from '../schemas/user/userLogin.schema';
import { UrlSchema } from '../schemas/user/url.schema';
import { EditProfileSchema } from '../schemas/user/editProfile.schema';
import { userExperienceSchema } from '../schemas/user/userExperience.schema';
import { addUserEducationSchema } from '../schemas/user/createUserEducation.schema';
import parsePdf from '../../middlewares/parsePdf';
import { CreateUserSchema } from '../schemas/user/createUser.schema';
import { verifyUserInputsSchema } from '../schemas/user/verifyUserInputs.schema';

function createUserRouter() {
  const userRouter = express.Router();

  const userController = container.resolve(UserController);

  userRouter.post(
    '/register',
    Validator(CreateUserSchema),
    userController.registerUser.bind(userController) //added zod validation before controller
  );
  userRouter.post(
    '/verify',
    Validator(verifyUserInputsSchema),
    userController.verifyUser.bind(userController)
  );
  userRouter.post('/otp/resend', userController.resendOTP.bind(userController)); //removed resend otp sending limit currently for testing :allowresendotp
  userRouter.post('/login', Validator(loginSchema), userController.userLogin.bind(userController));
  userRouter.post('/logout', userController.userLogout.bind(userController));
  userRouter.get('/token/refresh', refreshAccessToken);
  // candidateRouter.post(
  //   '/login',
  //   candidateController.loginCandidate.bind(candidateController)
  // );
  userRouter.get('/jobs', userController.loadJobs.bind(userController)); //no zod validation for load jobs query

  userRouter.get('/jobs/details/:jobId', userController.loadJobDetails.bind(userController));

  userRouter.post(
    '/personal/details/save',
    centralizedAuthentication,
    authorization(['user']),
    userController.saveUsersBasics.bind(userController)
  );
  userRouter.get(
    '/profile/personal/datas',
    centralizedAuthentication,
    authorization(['user']),
    userController.loadUserProfile.bind(userController)
  );
  userRouter.post(
    '/experience/add',
    centralizedAuthentication,
    authorization(['user']),
    Validator(userExperienceSchema),
    userController.addExperience.bind(userController)
  );
  userRouter.get(
    '/experience',
    centralizedAuthentication,
    authorization(['user']),
    userController.getExperiences.bind(userController)
  );
  userRouter.delete(
    '/experience/:experienceId',
    centralizedAuthentication,
    authorization(['user']),
    userController.deleteExperience.bind(userController)
  );
  userRouter.put(
    '/experience/edit/:experienceId',
    centralizedAuthentication,
    authorization(['user']),
    Validator(userExperienceSchema),
    testMiddleware,
    userController.editExperience.bind(userController)
  );
  userRouter.post(
    '/skills/add',
    centralizedAuthentication,
    authorization(['user']),
    testMiddleware,
    userController.addSkill.bind(userController)
  );
  userRouter.get(
    '/skills',
    centralizedAuthentication,
    authorization(['user']),
    userController.getSkills.bind(userController)
  );
  userRouter.delete(
    '/skills/:skillId',
    centralizedAuthentication,
    authorization(['user']),
    testMiddleware,
    userController.deleteSkill.bind(userController)
  );
  userRouter.post(
    '/education/add',
    centralizedAuthentication,
    authorization(['user']),
    Validator(addUserEducationSchema),
    userController.addEducation.bind(userController)
  );
  userRouter.get(
    '/education',
    centralizedAuthentication,
    authorization(['user']),
    userController.getEducations.bind(userController)
  );
  userRouter.delete(
    '/education/:educationId',
    centralizedAuthentication,
    authorization(['user']),
    userController.deleteEducation.bind(userController)
  );
  userRouter.put(
    '/education/:educationId',
    centralizedAuthentication,
    authorization(['user']),
    Validator(addUserEducationSchema),
    userController.editEducation.bind(userController)
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
  userRouter.delete(
    '/resume/:resumeId',
    centralizedAuthentication,
    authorization(['user']),
    userController.deleteResume.bind(userController)
  );
  userRouter.post(
    '/certificate',
    upload.single('certificate'),
    centralizedAuthentication,
    authorization(['user']),
    userController.addCertificate.bind(userController)
  );
  userRouter.get(
    '/certificate',
    centralizedAuthentication,
    authorization(['user']),
    userController.getCertificates.bind(userController)
  );

  // //candidateRouter.get('/home/jobs', testMiddleWare, candidateController.searchJobFromHomePage.bind(candidateController))

  userRouter.post(
    '/resume/upload',
    centralizedAuthentication,
    authorization(['user']),
    upload.single('resume'),
    parsePdf,
    userController.addResume.bind(userController)
  );

  userRouter.get(
    '/resumes',
    centralizedAuthentication,
    authorization(['user']),
    userController.loadResume.bind(userController)
  );

  userRouter.patch(
    '/user/profile',
    centralizedAuthentication,
    authorization(['user']),
    Validator(EditProfileSchema),
    userController.editUserProfile.bind(userController)
  ); //need updation

  userRouter.post(
    '/job/:jobId/apply',
    centralizedAuthentication,
    authorization(['user']),
    userController.saveJobApplication.bind(userController)
  );

  // candidateRouter.get('/candidate/token/refresh', refreshAccessToken); //only checking refresh token
  // candidateRouter.post(
  //   '/candidate/logout',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.candidateLogout.bind(candidateController)
  // );

  // candidateRouter.get(
  //   '/candidate/notifications',
  //   candidateAuth,
  //   candidateController.getNotifications.bind(candidateController)
  // );
  // candidateRouter.patch(
  //   '/candidate/notification/:id',
  //   candidateAuth,
  //   candidateController.updateNotificationReadStatus.bind(candidateController)
  // );
  userRouter.post(
    '/job/:jobId/save',
    centralizedAuthentication,
    authorization(['user']),
    userController.saveJob.bind(userController)
  );
  userRouter.get(
    '/job/saved/check',
    centralizedAuthentication,
    authorization(['user']),
    userController.checkIsJobSaved.bind(userController)
  );
  userRouter.get(
    '/job/saved',
    centralizedAuthentication,
    authorization(['user']),
    userController.getFavoriteJobs.bind(userController)
  );
  userRouter.delete(
    '/job/:jobId/unsave',
    centralizedAuthentication,
    authorization(['user']),
    userController.unsaveJob.bind(userController)
  );
  userRouter.patch(
    '/user/profile/links',
    centralizedAuthentication,
    authorization(['user']),
    Validator(UrlSchema),
    userController.addSocialLink.bind(userController)
  );
  userRouter.patch(
    '/user/profile/links/remove',
    centralizedAuthentication,
    authorization(['user']),
    userController.deleteSocialLink.bind(userController)
  );
  userRouter.patch(
    '/profile/picture/update',
    centralizedAuthentication,
    authorization(['user']),
    upload.single('profilePicture'),
    userController.uploadProfilePicture.bind(userController)
  );
  userRouter.patch(
    '/profile/picture/remove',
    centralizedAuthentication,
    authorization(['user']),
    userController.removeProfilePicture.bind(userController)
  );
  userRouter.patch(
    '/profile/coverphoto/update',
    centralizedAuthentication,
    authorization(['user']),
    upload.single('coverPhoto'),
    userController.uploadCoverphoto.bind(userController)
  );
  userRouter.patch(
    '/profile/coverphoto/remove',
    centralizedAuthentication,
    authorization(['user']),
    userController.removeCoverphoto.bind(userController)
  );
  userRouter.get(
    '/users/:userId',
    centralizedAuthentication,
    authorization(['user']),
    userController.loadUserAggregatedProfile.bind(userController)
  );
  userRouter.get(
    '/user/metadata', //route flaged due to authenticated user related issues
    centralizedAuthentication,
    authorization(['user']),
    userController.loadUserMetaData.bind(userController)
  );
  // candidateRouter.get(
  //   '/candidates',
  //   candidateController.getCandidates.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidates/:candidateId',
  //   candidateController.getCandidateDetails.bind(candidateController)
  // );
  userRouter.get(
    '/applications',
    centralizedAuthentication,
    authorization(['user']),
    userController.getCandidateApplications.bind(userController)
  );

  function testMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('inspecting request body');
    console.log(req.body);
    next();
    ///res.status(StatusCodes.OK).json({success:true, message:'Testing flow'})
  }

  // // candidateRouter.get('/get/user/:id', getAuthUserData)

  return userRouter;
}

export default createUserRouter;
