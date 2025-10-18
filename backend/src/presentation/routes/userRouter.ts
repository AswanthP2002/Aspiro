// import { upload } from '../../utilities/multer';
// import { NextFunction, Request, Response } from 'express';
import express, { NextFunction } from 'express';
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

function createUserRouter() {
  const userRouter = express.Router();
  //const candidateRouter = express.Router()

  // const candidateRepo = new CandidateRepository();
  // const experienceRepo = new ExperienceRepository();
  // const jobRepo = new JobRepository();
  // const skillRepo = new SkillRepsitory();
  // const educationRepo = new EducationRepository();
  // const resumeRepo = new ResumeRepository();
  // const certificateRepo = new CertificateRepository();
  // const jobApplicationRepo = new JObApplicationRepository();
  // const notificationRepo = new NotificationRepository();
  // const favoriteJobsRepo = new FavoriteJobsRepsitory();
  // const userRepo = new UserRepository();

  // const registerCandidateUC = new RegisterCandidateUseCase(candidateRepo); //fixed
  // const verifyCandidateUC = new VerifyUserUseCase(userRepo); //fixed
  // const loginCandidateUC = new LoginCandidateUseCase(candidateRepo, userRepo); //fixed
  // const saveCandidateBasicUC = new SaveIntroDetailsUseCase(candidateRepo, userRepo);
  // const loadCandidatePersonalDataUC = new LoadCandidatePersonalDataUC(candidateRepo);
  // const addExperienceUC = new AddExperienceUseCase(experienceRepo);
  // const getExperiencesUC = new GetExperienceUseCase(experienceRepo);
  // const deleteExperienceUC = new DeleteExperienceUseCase(experienceRepo);
  // const editExperienceUC = new EditExperienceUseCase(experienceRepo);
  // const loadJobsUC = new LoadJobsCandidateSideUseCase(jobRepo);
  // const loadJobDetailsUC = new LoadJobDetailsCandidateSide(jobRepo);
  // const addSkillUC = new AddSkill(skillRepo);
  // const getSkillsUC = new GetSkillsUseCase(skillRepo);
  // const deleteSkillUC = new DeleteSkillUseCase(skillRepo);
  // const addEducationUC = new AddEducationUseCase(educationRepo);
  // const getEducationsUC = new GetEducationsUseCase(educationRepo);
  // const deleteEducationUC = new DeleteEducationUseCase(educationRepo);
  // const editEducationUC = new EditEducationUseCase(educationRepo);
  // const addResumeUC = new AddResumeUseCase(resumeRepo);
  // const loadResumeUC = new LoadResumesUseCase(resumeRepo);
  // const deleteResumeUC = new DeleteResumeUseCase(resumeRepo);
  // const addCertificateUC = new AddCertificateUseCase(certificateRepo);
  // const loadCertificatesUC = new GetCertificatesUseCase(certificateRepo);
  // const applyJobUC = new SaveJobApplicationUseCase(jobApplicationRepo);
  // const searchJobsHomePageUC = new SearchJobsFromHomeUseCase(jobRepo);
  // const editCandidateProfileUC = new EditProfileUseCase(candidateRepo);
  // const getNotificationsUC = new GetNotificationsUseCase(notificationRepo);
  // const saveJobUC = new SaveFavoriteJobUseCase(favoriteJobsRepo);
  // const checkIsJobSavedUC = new CheckIsJobSavedUseCase(favoriteJobsRepo);
  // const getFavoriteJobsUC = new GetFavoriteJobUseCase(favoriteJobsRepo);
  // const unsaveJobUC = new UnsaveJobUseCase(favoriteJobsRepo);
  // const addSocialLinkUC = new AddSocialLinkUseCase(candidateRepo);
  // const deleteSocialLinkUC = new DeleteSocialLinkUseCase(candidateRepo);
  // const uploadProfilePictureUC = new UploadProfilePictureUseCase(candidateRepo, userRepo);
  // const removeProfilePictureUC = new RemoveProfilePictureUseCase(candidateRepo, userRepo);
  // const uploadCoverPhotoUC = new UploadCoverphotoUseCase(candidateRepo, userRepo);
  // const removeCoverPhotoUC = new RemoveCoverphotoUseCase(candidateRepo, userRepo);
  // const getCandidatesUC = new GetCandidatesUseCase(candidateRepo);
  // const getCandidateDetailsUC = new GetCandidateDetailsUseCase(candidateRepo);
  // const getCandidateApplicationsUC = new GetCandidateApplicationsUseCase(jobApplicationRepo);
  // const updateNotificationReadStatus = new UpdateNotificationReadStatus(notificationRepo);
  // //const createUserUC = new CreateUserUseCase(userRepo);
  // const findCandidateByUserId = new FindCandidateByUserIdUseCase(candidateRepo);

  const userController = container.resolve(UserController);
  // registerCandidateUC,
  // verifyCandidateUC,
  // loginCandidateUC,
  // saveCandidateBasicUC,
  // loadCandidatePersonalDataUC,
  // addExperienceUC,
  // getExperiencesUC,
  // deleteExperienceUC,
  // editExperienceUC,
  // loadJobsUC,
  // loadJobDetailsUC,
  // addSkillUC,
  // getSkillsUC,
  // deleteSkillUC,
  // addEducationUC,
  // getEducationsUC,
  // deleteEducationUC,
  // editEducationUC,
  // addResumeUC,
  // loadResumeUC,
  // deleteResumeUC,
  // addCertificateUC,
  // loadCertificatesUC,
  // applyJobUC,
  // searchJobsHomePageUC,
  // editCandidateProfileUC,
  // getNotificationsUC,
  // saveJobUC,
  // checkIsJobSavedUC,
  // getFavoriteJobsUC,
  // unsaveJobUC,
  // addSocialLinkUC,
  // deleteSocialLinkUC,
  // uploadProfilePictureUC,
  // removeProfilePictureUC,
  // uploadCoverPhotoUC,
  // removeCoverPhotoUC,
  // getCandidatesUC,
  // getCandidateDetailsUC,
  // getCandidateApplicationsUC,
  // updateNotificationReadStatus,
  // createUserUC,
  // findCandidateByUserId
 
  userRouter.post('/register', userController.registerUser.bind(userController));
  // candidateRouter.post(
  //   '/verify',
  //   candidateController.verifyUser.bind(candidateController)
  // );
  // candidateRouter.post(
  //   '/login',
  //   candidateController.loginCandidate.bind(candidateController)
  // );
  // // candidateRouter.get('/jobs', (req : Request, res : Response, next : NextFunction) => {
  // //     console.log('ensure the request is reaching here')
  // //     next()
  // // }, candidateController.loadJobs.bind(candidateController))
  // //candidateRouter.get('/jobs/details/:jobId', candidateController.loadJobDetails.bind(candidateController))
  // candidateRouter.post(
  //   //auth (2)
  //   '/candidate/personal/details/save',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.saveIntroDetailsCandidate.bind(candidateController)
  // );
  // candidateRouter.get(
  //   //auth (1)
  //   '/candidate/profile/personal/datas',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.loadCandidatePersonalData.bind(candidateController)
  // );
  // candidateRouter.post(
  //   '/candidate/experience/add',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.addExperience.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidate/experience',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.getExperiences.bind(candidateController)
  // );
  // candidateRouter.delete(
  //   '/candidate/experience/:experienceId',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.deleteExperience.bind(candidateController)
  // );
  // candidateRouter.put(
  //   '/candidate/experience/edit/:experienceId',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.editExperience.bind(candidateController)
  // );
  // candidateRouter.post(
  //   '/candidate/skills/add',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.addSkill.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidate/skills',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.getSkills.bind(candidateController)
  // );
  // candidateRouter.delete(
  //   '/candidate/skills/:skillId',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.deleteSkill.bind(candidateController)
  // );
  // candidateRouter.post(
  //   '/candidate/education/add',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.addEducation.bind(candidateController)
  // );
  // candidateRouter.get(
  //   '/candidate/education',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.getEducations.bind(candidateController)
  // );
  // candidateRouter.delete(
  //   '/candidate/education/:educationId',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.deleteEducation.bind(candidateController)
  // );
  // candidateRouter.put(
  //   '/candidate/education/:educationId',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.editEducation.bind(candidateController)
  // );
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
  // candidateRouter.patch(
  //   '/candidate/profile/picture/update',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   upload.single('profilePicture'),
  //   candidateController.uploadProfilePicture.bind(candidateController)
  // );
  // candidateRouter.patch(
  //   '/candidate/profile/picture/remove',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.removeProfilePicture.bind(candidateController)
  // );
  // candidateRouter.patch(
  //   '/candidate/profile/coverphoto/update',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   upload.single('coverPhoto'),
  //   candidateController.uploadCoverphoto.bind(candidateController)
  // );
  // candidateRouter.patch(
  //   '/candidate/profile/coverphoto/remove',
  //   centralizedAuthentication,
  //   authorization(['candidate']),
  //   candidateController.removeCoverphoto.bind(candidateController)
  // );
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

  // // candidateRouter.get('/get/user/:id', getAuthUserData)

  function testMiddleWare(req: Request, res: Response, next: NextFunction) {
    console.log('Request reached here in the register route')
    // return res
    //   .status(StatusCodes.ACCEPTED)
    //   .json({ success: false, message: 'Testing flow' });
  }

  return userRouter;
}

export default createUserRouter;
