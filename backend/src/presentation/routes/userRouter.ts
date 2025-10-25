// import { upload } from '../../utilities/multer';
// import { NextFunction, Request, Response } from 'express';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
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
import { authorization, centralizedAuthentication, refreshAccessToken } from '../../middlewares/auth';
import { upload } from '../../utilities/multer';
import { StatusCodes } from '../statusCodes';

function createUserRouter() {
  const userRouter = express.Router();
  
  const userController = container.resolve(UserController);
 
  userRouter.post('/register', userController.registerUser.bind(userController));
  userRouter.post('/verify', userController.verifyUser.bind(userController));
  userRouter.post(
    '/otp/resend',
    allowResendOtp,
    userController.resendOTP.bind(userController)
  )
  userRouter.post('/login', userController.userLogin.bind(userController))
  userRouter.post('/logout', userController.userLogout.bind(userController))
  userRouter.get('/token/refresh', refreshAccessToken)
  // candidateRouter.post(
  //   '/login',
  //   candidateController.loginCandidate.bind(candidateController)
  // );
  // // candidateRouter.get('/jobs', (req : Request, res : Response, next : NextFunction) => {
  // //     console.log('ensure the request is reaching here')
  // //     next()
  // // }, candidateController.loadJobs.bind(candidateController))
  // //candidateRouter.get('/jobs/details/:jobId', candidateController.loadJobDetails.bind(candidateController))
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
    userController.deleteSkill.bind(userController)
  );
  userRouter.post(
    '/education/add',
    centralizedAuthentication,
    authorization(['user']),
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
    testMiddleware,
    userController.editEducation.bind(userController)
  );
  // candidateRouter.delete(
  //   '/candidate/resume/:resumeId',
  //   candidateAuth,
  //   candidateController.deleteResume.bind(candidateController)
  // );
  // candidateRouter.post(
  //   '/candidate/certificate',
  //   upload.single('certificate'),
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.addCertificate.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidate/certificate',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.getCertificates.bind(candidateController)
  // );

  // //candidateRouter.get('/home/jobs', testMiddleWare, candidateController.searchJobFromHomePage.bind(candidateController))

  // candidateRouter.post(
  //   '/candidate/resume/upload',
  //   candidateAuth,
  //   upload.single('resume'),
  //   parsePdf,
  //   candidateController.addResume.bind(candidateController)
  // );

  // candidateRouter.get(
  //   '/candidate/resumes',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.loadResume.bind(candidateController)
  // );

  // candidateRouter.patch(
  //   '/candidate/profile',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.editCandidateProfile.bind(candidateController)
  // ); //need updation

  // candidateRouter.post(
  //   '/candidate/job/:jobId/apply',
  //   candidateAuth,
  //   candidateController.saveJobApplication.bind(candidateController)
  // );

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
  // candidateRouter.post(
  //   '/candidate/job/:jobId/save',
  //   candidateAuth,
  //   candidateController.saveJob.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidate/job/saved/check',
  //   candidateAuth,
  //   candidateController.checkIsJobSaved.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidate/job/saved',
  //   candidateAuth,
  //   candidateController.getFavoriteJobs.bind(candidateController)
  // );
  // candidateRouter.delete(
  //   '/candidate/job/:jobId/unsave',
  //   testMiddleWare,
  //   candidateAuth,
  //   candidateController.unsaveJob.bind(candidateController)
  // );
  // candidateRouter.patch(
  //   '/candidate/profile/links',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.addSocialLink.bind(candidateController)
  // );
  // candidateRouter.patch(
  //   '/candidate/profile/links/remove',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.deleteSocialLink.bind(candidateController)
  // );
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
  // candidateRouter.get(
  //   '/candidates',
  //   candidateController.getCandidates.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidates/:candidateId',
  //   candidateController.getCandidateDetails.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidate/applications',
  //   candidateAuth,
  //   candidateController.getCandidateApplications.bind(candidateController)
  // );

  function testMiddleware(req : Request, res : Response, next : NextFunction){
    console.log('inspecting request body')
    console.log(req.body)
    next()
    ///res.status(StatusCodes.OK).json({success:true, message:'Testing flow'})
  }

  // // candidateRouter.get('/get/user/:id', getAuthUserData)

  return userRouter;
}

export default createUserRouter;
