import { container } from 'tsyringe';
import IUserRepository from '../domain/interfaces/IUserRepo';
import UserRepository from '../infrastructure/repositories/userRepository';
import IAdminLoginUseCase from '../application/interfaces/usecases/admin/IAdminLogin.usecase';
import { AdminLoginUseCase } from '../application/usecases/admin/AdminLogin.usecase';
import { AdminController } from '../presentation/controllers/adminController';
import ICandidateRepo from '../domain/interfaces/user/ICandidateRepo';
import CandidateRepository from '../infrastructure/repositories/user/candidateRepository';
import ILoadCandidateUseCase from '../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase';
import ILoadCandidateDetailsUseCase from '../application/interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import { AdminLoadUsersDetailsUsecase} from '../application/usecases/admin/AdminLoadUsersDetails.usecase';
import IBlockCandidateUseCase from '../application/interfaces/usecases/admin/IAdminBlockUser.usecase';
import { AdminBlockUserUsecase } from '../application/usecases/admin/AdminBlockUser.usecase';
import IFindCandidateByUserIdUseCase from '../application/usecases/candidate/interface/IFindCandidateByUserId.usecase';
import FindCandidateByUserIdUseCase from '../application/usecases/candidate/FindCandidateByUserId.usecase';
import IUnblockCandidateUseCase from '../application/interfaces/usecases/admin/IAdminUnblockUser.usecase';
import { AdminUnblockUserUsecase } from '../application/usecases/admin/AdminUnblockUser.usecase';
import IFindCandidateByCandidateIdUseCase from '../application/usecases/interfaces/IFindCandidateByCandidateID.usecase';
import FindCandidateByCandidateIDUseCase from '../application/usecases/FindCandidateByCandidateID.usecase';
import ICreateUserUseCase from '../application/interfaces/usecases/user/ICreateUser.usecase';
import CreateUserUseCase from '../application/usecases/user/CreateUser.usecase';
import RecruiterController from '../presentation/controllers/recruiterController';
import IRecruiterRepo from '../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterRespository from '../infrastructure/repositories/recruiter/recruiterRepository';
import IRegisterRecruiterUseCase from '../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase';
import RegisterRecruiterUseCase from '../application/usecases/recruiter/CreateRecruiter.usecase';
import IVerifyUserUseCase from '../application/interfaces/usecases/user/IVerifyUser.usecase';
import VerifyUserUseCase from '../application/usecases/user/VerifyUser.usecase';
import ILoginRecruiterrUseCase from '../application/usecases/recruiter/interface/ILoginRecruiter.usecase';
import { LoginRecruiterUseCase } from '../application/usecases/recruiter/LoginRecruiter.usecase';
import ILoadRecruiterProfileOverviewUsecase from '../application/interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import { LoadRecruiterProfileOverviewUsecase } from '../application/usecases/recruiter/LoadRecruiterProfileOverview.usecase';
import ILoadCompaniesUseCase from '../application/interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import { AdminLoadRecruitersUsecase } from '../application/usecases/admin/AdminLoadRecruiters.usecase';
import IEmailService from '../application/interfaces/services/IEmailService';
import EmailService from '../infrastructure/services/EmailService';
import { UserController } from '../presentation/controllers/userController';
import IResendOTPUseCase from '../application/interfaces/usecases/user/IResendOTP.usecase';
import ResendOTPUseCase from '../application/usecases/user/ResendOTP.usecase';
import IUserLoginUseCase from '../application/interfaces/usecases/user/IUserLogin.usecase';
import { UserLoginUseCase } from '../application/usecases/user/UserLogin.usecase';
import { LoadUsersAdminUsecase } from '../application/usecases/admin/LoadUsersAdmin.usecase';
import ILoadUsersAdminUseCase from '../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase';
import ILoadUserProfileUsecase from '../application/interfaces/usecases/user/ILoadUserProfile.usecase';
import { LoadUserProfileUsecase } from '../application/usecases/user/LoadUserProfile.usecase';
import ISaveUserBasicsUsecase from '../application/interfaces/usecases/user/ISaveUsersBasics.usecase';
import SaveUserBasicsUsecase from '../application/usecases/candidate/SaveUserBasics.usecase';
import IUploadUserProfilePictureUsecase from '../application/interfaces/usecases/user/IUploadUserProfilePicture.usecase';
import UploadUserProfilePictureUsecase from '../application/usecases/user/UploadUserProfilePicture.usecase';
import IUploadUserCoverPhotoUsecase from '../application/interfaces/usecases/user/IUploadUserCoverPhoto.usecase';
import UploadUserCoverPhotoUsecase from '../application/usecases/user/UploadCoverphoto.usecase';
import IRemoveUserProfilePictureUsecase from '../application/interfaces/usecases/user/IRemoveUserProfilePciture.usecase';
import RemoveUserProfilePictureUsecase from '../application/usecases/user/RemoveProfilePicture.usecase';
import IRemoveUserCoverPhotoUsecase from '../application/interfaces/usecases/user/IRemoveUserCoverPhoto.usecase';
import RemoveUserCoverPhotoUsecase from '../application/usecases/user/RemoveCoverphoto.usecase';
import IExperienceRepo from '../domain/interfaces/user/IExperienceRepo';
import ExperienceRepository from '../infrastructure/repositories/user/experienceRepository';
import IAddUserExperienceUsecase from '../application/interfaces/usecases/user/IAddUserExperience.usecase';
import AddUserExperienceUsecase from '../application/usecases/user/AddUserExperience.usecase';
import IGetUserExperiencesUsecase from '../application/interfaces/usecases/user/IGetUserExperiences.usecase';
import GetUserExperiencesUsecase from '../application/usecases/user/GetUserExperience.usecase';
import IEducationRepo from '../domain/interfaces/user/IEducationRepo';
import EducationRepository from '../infrastructure/repositories/user/educationRepository';
import IAddUserEducationUsecase from '../application/interfaces/usecases/user/IAddUserEducation.usecase';
import AddUserEducationUsecase from '../application/usecases/user/AddUserEducation.usecase';
import IGetUserEducationsUsecase from '../application/interfaces/usecases/user/IGetUserEducations.usecase';
import GetUserEducationsUsecase from '../application/usecases/user/GetUserEducations.usecase';
import ISkillRepo from '../domain/interfaces/user/ISkillRepo';
import SkillRepsitory from '../infrastructure/repositories/user/skillRespository';
import IAddUsersSkillUsecase from '../application/interfaces/usecases/user/IAddUsersSkill.usecase';
import AddUsersSkillsUsecase from '../application/usecases/user/AddUserSkills.usecase';
import IGetUserSkillsUsecase from '../application/interfaces/usecases/user/IGetUserSkills.usecase';
import GetUserSkillsUsecase from '../application/usecases/user/GetUserSkills.usecase';
import IEditUserEducationUsecase from '../application/interfaces/usecases/user/IEditUserEducation.usecase';
import EditUserEducationUsecase from '../application/usecases/user/EditUserEducation.usecase';
import IEditUserExperienceUsecase from '../application/interfaces/usecases/user/IEditUserExperience.usecase';
import EditUserExperienceUsecase from '../application/usecases/user/EditUserExperience.usecase';
import IDeleteUserEducationUsecase from '../application/interfaces/usecases/user/IDeleteUserEducation.usecase';
import DeleteUserEducationUsecase from '../application/usecases/user/DeleteUserEducation.usecase';
import IDeleteUserExperienceUsecase from '../application/interfaces/usecases/user/IDeleteUserExperience.usecase';
import DeleteUserExperienceUsecase from '../application/usecases/user/DeleteUserExperience.usecase';
import IDeleteUserSkillUsecase from '../application/interfaces/usecases/user/IDeleteUserSkill.usecase';
import DeleteUserSkillUsecase from '../application/usecases/user/DeleteUserSkill.usecase';
import ICloudStroageService from '../application/interfaces/services/ICloudStorageService';
import CloudStorageService from '../infrastructure/services/CloudStorageService';
import IPostRepo from '../domain/interfaces/IPostRepo';
import PostRespository from '../infrastructure/repositories/PostRepository';
import ICreatePostUsecase from '../application/interfaces/usecases/user/ICreatePost.usecase';
import PostController from '../presentation/controllers/postController';
import IGetPostsUsecase from '../application/interfaces/usecases/user/IGetPosts.usecase';
import GetPostsUsecase from '../application/usecases/GetPosts.usecase';
import ILikePostUsecase from '../application/interfaces/usecases/user/ILikePost.usecase';
import LikePostUsecase from '../application/usecases/user/LikePost.usecase';
import CreatePostUseCase from '../application/usecases/user/CreatePost.usecase';
import IUnlikePostUsecase from '../application/interfaces/usecases/user/IUnlikePost.usecase';
import UnlikePostUsecase from '../application/usecases/user/UnlikePost.usecase';
import ICommentRepository from '../domain/interfaces/IComment.repository';
import CommentRepository from '../infrastructure/repositories/comment.repository';
import ICreateCommentUsecase from '../application/interfaces/usecases/user/ICreateComment.usecase';
import CreateCommentUsecase from '../application/usecases/user/CreateComment.usecase';
import IDeleteCommentUsecase from '../application/interfaces/usecases/user/IDeleteComment.usecase';
import DeleteCommentUsecase from '../application/usecases/user/DeleteComment.usecase';
import ICreateRecruiterUsecase from '../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase';
import CreateRecruiterUsecase from '../application/usecases/recruiter/CreateRecruiter.usecase';
import IJobRepo from '../domain/interfaces/IJobRepo';
import JobRepository from '../infrastructure/repositories/jobRepository';
import ICreateJobUseCase from '../application/interfaces/usecases/recruiter/ICreateJob.usecase';
import CreateJobUseCase from '../application/usecases/recruiter/CreateJob.usecase';
import ILoadRecruiterJobsUsecase from '../application/interfaces/usecases/recruiter/ILoadRecruiterJobs.usecase';
import { LoadRecruiterJobsUsecase } from '../application/usecases/recruiter/LoadRecruiterJobs.usecase';
import IEditJobUsecase from '../application/interfaces/usecases/recruiter/IEditJob.usecase';
import EditJobUsecase from '../application/usecases/recruiter/EditJob.usecase';
import IDeleteJobUsecase from '../application/interfaces/usecases/recruiter/IDeleteJob.usecase';
import DeleteJobUsecase from '../application/usecases/recruiter/DeleteJob.usecase';
import ILoadJobsAggregatedUsecase from '../application/interfaces/usecases/user/IloadJobsAggregated.usecase';
import LoadJobsAggregatedUsecase from '../application/usecases/user/LoadJobsAggregated.usecase';
import IFollowRepo from '../domain/interfaces/IFollowRepo';
import FollowRepository from '../infrastructure/repositories/FollowRepository';
import FollowController from '../presentation/controllers/followController';
import ICreateNotificationUsecase from '../application/interfaces/usecases/shared/ICreateNotification.usecase';
import CreateNotificationUsecase from '../application/usecases/shared/CreateNotification.usecase';
import IFollowUserUseCase from '../application/interfaces/usecases/user/IFollowUser.usecase';
import FollowUseruseCse from '../application/usecases/FollowUser.usecase';
import IAdminLoadUserDetailsUsecase from '../application/interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import IAdminBlockUserUsecase from '../application/interfaces/usecases/admin/IAdminBlockUser.usecase';
import IAdminUnblockUserUsecase from '../application/interfaces/usecases/admin/IAdminUnblockUser.usecase';
import IGetFavoriteJobUseCase from '../application/interfaces/usecases/user/IGetSavedJobs.usecase';
import GetFavoriteJobUseCase from '../application/usecases/user/GetSavedJobs.usecase';
import IFavoriteJobsRepo from '../domain/interfaces/user/IFavoriteJobRepo';
import FavoriteJobsRepsitory from '../infrastructure/repositories/user/favoriteJobsRepository';
import ISendResetPassworLinkUsecase from '../application/interfaces/usecases/user/ISendPasswordResetLink.usecase';
import SendResetPassworLinkUsecase from '../application/usecases/user/SendPasswordResetLink.usecase';
import IDataHashService from '../application/interfaces/services/IDataHashService';
import DataHashService from '../infrastructure/services/DataHashService';
import IResetPasswordUsecase from '../application/interfaces/usecases/user/IResetPassword.usecase';
import ResetPasswordUsecase from '../application/usecases/user/ResetPassword.usecase';
import IGoogleAuthService from '../application/interfaces/services/IGoogleAuthService';
import GoogleAuthService from '../infrastructure/services/GoogleAuthService';
import IGoogleLoginUseCase from '../application/interfaces/usecases/user/IGoogleLogin.usecase';
import GoogleLoginUseCase from '../application/usecases/GoogleLogin.usecase';
import OAuthController from '../presentation/controllers/oAuthController';
import IAdminDeleteUserUsecase from '../application/interfaces/usecases/admin/IAdminDeleteUser.usecase';
import AdminDeleteUserUsecase from '../application/usecases/admin/AdminDeleteUser.usecase';
import IAddSocialLinkUsecase from '../application/interfaces/usecases/user/IAddSocialLink.usecase';
import AddSocialLinkUseCase from '../application/usecases/user/AddSocialLink.usecase';
import IDeleteSocialLinkUseCase from '../application/interfaces/usecases/user/IDeleteSocialLink.usecase';
import DeleteSocialLinkUseCase from '../application/usecases/user/DeleteSocialLink.usecase';
import IEditProfileUseCase from '../application/usecases/candidate/interface/IEditProfile.usecase';
import EditProfileUseCase from '../application/usecases/candidate/EditProfile.usecase';
import IRealTimeEventEmitter from '../application/interfaces/services/IRealTimeEventEmitter';
import { RealTimeEventEmitterService } from '../infrastructure/services/RealTimeEventEmitterService';
import IGetUserSpecificNotificationUsecase from '../application/interfaces/usecases/shared/IGetUserSpecificNotifications.usecase';
import GetUserSpecificNotificationsUsecase from '../application/usecases/shared/GetUserSpecificNotifications.usecase';
import NotificationController from '../presentation/controllers/notificationController';
import INotificationRepo from '../domain/interfaces/INotificationRepo';
import NotificationRepository from '../infrastructure/repositories/notificationRepository';
import ILoadUserAggregatedProfileUsecase from '../application/interfaces/usecases/user/ILoadUserAggregatedProfile.usecase';
import LoadUserAggregatedProfileUsecase from '../application/usecases/user/LoadUserAggregatedProfile.usecase';
import ILoadUserMetaDataUsecase from '../application/interfaces/usecases/user/ILoadUserMetaData.usecase';
import LoadUserMetaData from '../application/usecases/user/LoadUserMetaData.usecase';
import IUnFollowUserUsercase from '../application/usecases/interfaces/IUnFollowUser.usecase';
import UnfollowUserUseCase from '../application/usecases/UnfollowUser.usecase';
import IGetRecruiterApplicationsUsecase from '../application/interfaces/usecases/admin/IGetRecruiterApplications.usecase';
import GetRecruiterApplicationsUsecase from '../application/usecases/admin/LoadRecruiterApplications.usecase';
import IRejectRecruiterApplication from '../application/interfaces/usecases/admin/IRejectRecruiterApplication.usecase';
import RejectRecruiterApplicationUsecase from '../application/usecases/admin/RejectRecruiterApplication.usecase';
import IApproveRecruiterApplicationUsecase from '../application/interfaces/usecases/admin/IApproveRecruiterApplication.usecase';
import ApproveRecruiterApplicationUsecase from '../application/usecases/admin/ApproveRecruiterApplication.usecase';
import IGetJobDetailsUseCase from '../application/usecases/interfaces/IGetJobDetails.usecase';
import GetJobDetailsUseCase from '../application/usecases/GetJobDetails.usecase';
import ISaveJobUsecase from '../application/interfaces/usecases/user/ISaveJob.usecase';
import SaveJobUsecase from '../application/usecases/user/SaveJob.usecase';
import ICheckIsJobSavedUseCase from '../application/interfaces/usecases/user/ICheckIsJobSaved.usecase';
import CheckIsJobSavedUseCase from '../application/usecases/user/CheckIsJobSaved.usecase';
import IUnsaveJobUseCase from '../application/interfaces/usecases/user/IUnsaveJob.usecase';
import UnsaveJobUseCase from '../application/usecases/user/UnsaveJob.usecase';
import IGetSavedJobsUsecase from '../application/interfaces/usecases/user/IGetSavedJobs.usecase';
import GetSavedJobsUsecase from '../application/usecases/user/GetSavedJobs.usecase';
import IJobApplicationRepo from '../domain/interfaces/IJobApplicationRepo';
import JObApplicationRepository from '../infrastructure/repositories/JobApplicationRepository';
import IApplyJobUsecase from '../application/interfaces/usecases/user/IApplyJob.usecase';
import ApplyJobUsecase from '../application/usecases/user/ApplyJob.usecase';
import IResumeRepo from '../domain/interfaces/user/IResumeRepo';
import ResumeRepository from '../infrastructure/repositories/user/resumeRepository';
import IAddResumeUseCase from '../application/interfaces/usecases/user/IAddResume.usecase';
import AddResumeUseCase from '../application/usecases/user/AddResume.usecase';
import IGetMyApplicationsUsecase from '../application/interfaces/usecases/user/IGetMyApplications.usecase';
import GetMyApplicationsUsecase from '../application/usecases/user/GetCandidateApplications.usecase';
import IInterviewRepo from '../domain/interfaces/user/IInterviewRepo';
import InterviewRepository from '../infrastructure/repositories/user/interviewRepository';
import IScheduleInterviewUsecase from '../application/interfaces/usecases/recruiter/IScheduleInterview.usecase';
import ScheduleInterviewUsecase from '../application/usecases/recruiter/ScheduleInterview.usecase';
import IGetJobApplicationsUseCase from '../application/interfaces/usecases/recruiter/IGetJobApplications.usecase';
import GetJobApplicationsUseCase from '../application/usecases/recruiter/GetJobApplications.usecase';
import IUpdateCandidateNotes from '../application/interfaces/usecases/recruiter/IUpdateCandidateNotes.usecase';
import UpdateCandidateNotesUsecase from '../application/usecases/recruiter/UpdateCandidateNotes.usecase';
import IUpdateJobApplicationStatusUsecase from '../application/interfaces/usecases/recruiter/IUpdateJobApplicationStatus.usecase';
import UpdateJobApplicationStatusUsecase from '../application/usecases/recruiter/UpdateJobApplicationUsecase.usecase';

//register repo
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<ICandidateRepo>('ICandidateRepository', CandidateRepository);
container.registerSingleton<IRecruiterRepo>('IRecruiterRepository', RecruiterRespository);
container.registerSingleton<IExperienceRepo>('IExperienceRepository', ExperienceRepository)
container.registerSingleton<IEducationRepo>('IEducationRepository', EducationRepository)
container.registerSingleton<ISkillRepo>('ISkillRepository', SkillRepsitory)
container.registerSingleton<IPostRepo>('IPostRepository', PostRespository)
container.registerSingleton<ICommentRepository>('ICommentRepository', CommentRepository)
container.registerSingleton<IJobRepo>('IJobRepository', JobRepository)
container.registerSingleton<IFollowRepo>('IFollowRepository', FollowRepository)
container.registerSingleton<IFavoriteJobsRepo>('IFavoriteJobRepository', FavoriteJobsRepsitory)
container.registerSingleton<INotificationRepo>('INotificationRepository', NotificationRepository)
container.registerSingleton<IJobApplicationRepo>('IJobApplicationRepository', JObApplicationRepository)
container.registerSingleton<IResumeRepo>('IResumeRepository', ResumeRepository)
container.registerSingleton<IInterviewRepo>('IInterviewRepository', InterviewRepository)

//register usecase
container.registerSingleton<IAdminLoginUseCase>('IAdminLoginUseCase', AdminLoginUseCase);
container.registerSingleton<ILoadUsersAdminUseCase>('ILoadUsersAdminUsecase', LoadUsersAdminUsecase);

container.registerSingleton<IAdminBlockUserUsecase>(
  'IAdminBlockUserUsecase',
  AdminBlockUserUsecase
);
container.registerSingleton<IAdminUnblockUserUsecase>(
  'IAdminUnblockUserUsecase',
  AdminUnblockUserUsecase
);
container.registerSingleton<IFindCandidateByUserIdUseCase>(
  'IFindCandidateByUserIdUseCase',
  FindCandidateByUserIdUseCase
);
container.registerSingleton<IFindCandidateByCandidateIdUseCase>(
  'IFindCandidateByCandidateIDUseCase',
  FindCandidateByCandidateIDUseCase
);
container.registerSingleton<ICreateUserUseCase>('ICreateUserUsecase', CreateUserUseCase);
container.registerSingleton<IVerifyUserUseCase>('IVerifyUserUseCase', VerifyUserUseCase);
container.registerSingleton<IResendOTPUseCase>('IResendOTPUsecase', ResendOTPUseCase);
container.registerSingleton<IUserLoginUseCase>('IUserLoginUsecase', UserLoginUseCase);
container.registerSingleton<ILoadUserProfileUsecase>('ILoadUserProfileUsecase', LoadUserProfileUsecase)
container.registerSingleton<ISaveUserBasicsUsecase>('ISaveUserBasicsUsecase', SaveUserBasicsUsecase)
container.registerSingleton<IUploadUserProfilePictureUsecase>('IUploadUserProfilePictureUsecase', UploadUserProfilePictureUsecase)
container.registerSingleton<IUploadUserCoverPhotoUsecase>('IUploadUserCoverPhotoUsecase', UploadUserCoverPhotoUsecase)
container.registerSingleton<IRemoveUserProfilePictureUsecase>('IRemoveUserProfilePictureUsecase', RemoveUserProfilePictureUsecase)
container.registerSingleton<IRemoveUserCoverPhotoUsecase>('IRemoveUserCoverPhotoUsecase', RemoveUserCoverPhotoUsecase)
container.registerSingleton<IAddUserExperienceUsecase>('IAddUserExperienceUsecase', AddUserExperienceUsecase)
container.registerSingleton<IGetUserExperiencesUsecase>('IGetUserExperiencesUsecase', GetUserExperiencesUsecase)
container.registerSingleton<IAddUserEducationUsecase>('IAddUserEducationUsecase', AddUserEducationUsecase)
container.registerSingleton<IGetUserEducationsUsecase>('IGetUserEducationsUsecase', GetUserEducationsUsecase)
container.registerSingleton<IAddUsersSkillUsecase>('IAddUsersSkillUsecase', AddUsersSkillsUsecase)
container.registerSingleton<IGetUserSkillsUsecase>('IGetUsersSkillsUsecase', GetUserSkillsUsecase)
container.registerSingleton<IEditUserEducationUsecase>('IEditUserEducationUsecase', EditUserEducationUsecase)
container.registerSingleton<IEditUserExperienceUsecase>('IEditUserExperienceUsecase', EditUserExperienceUsecase)
container.registerSingleton<IDeleteUserEducationUsecase>('IDeleteUserEducationUsecase', DeleteUserEducationUsecase)
container.registerSingleton<IDeleteUserExperienceUsecase>('IDeleteUserExperienceUsecase', DeleteUserExperienceUsecase)
container.registerSingleton<IDeleteUserSkillUsecase>('IDeleteUserSkillUsecase', DeleteUserSkillUsecase)
container.registerSingleton<ICreatePostUsecase>('ICreatePostUsecase', CreatePostUseCase)
container.registerSingleton<IGetPostsUsecase>('IGetPostsUsecase', GetPostsUsecase)
container.registerSingleton<ILikePostUsecase>('ILikePostUsecase', LikePostUsecase)
container.registerSingleton<IUnlikePostUsecase>('IUnlikePostUsecase', UnlikePostUsecase)
container.registerSingleton<ICreateCommentUsecase>('ICreateCommentUsecase', CreateCommentUsecase)
container.registerSingleton<IDeleteCommentUsecase>('IDeleteCommentUsecase', DeleteCommentUsecase)
container.registerSingleton<ICreateJobUseCase>('ICreateJobUsecase', CreateJobUseCase)
container.registerSingleton<ILoadRecruiterJobsUsecase>('ILoadRecruiterJobsUsecase', LoadRecruiterJobsUsecase)
container.registerSingleton<IEditJobUsecase>('IEditJobUsecase', EditJobUsecase)
container.registerSingleton<IDeleteJobUsecase>('IDeleteJobUsecase', DeleteJobUsecase)
container.registerSingleton<ILoadJobsAggregatedUsecase>('ILoadJobsAggregatedUsecase', LoadJobsAggregatedUsecase)
container.registerSingleton<ICreateNotificationUsecase>('ICreateNotificationUsecase', CreateNotificationUsecase)
container.registerSingleton<IFollowUserUseCase>('IFollowUserUsecase', FollowUseruseCse)
container.registerSingleton<IUnFollowUserUsercase>('IUnfollowUserUsecase', UnfollowUserUseCase)
container.registerSingleton<IAdminLoadUserDetailsUsecase>('IAdminLoadUserDetailsUsecase', AdminLoadUsersDetailsUsecase)
container.registerSingleton<IGetSavedJobsUsecase>('IGetSavedJobsUsecase', GetSavedJobsUsecase)
container.registerSingleton<ISendResetPassworLinkUsecase>('ISendResetPasswordLinkUsecase', SendResetPassworLinkUsecase)
container.registerSingleton<IResetPasswordUsecase>('IResetPasswordUsecase', ResetPasswordUsecase)
container.registerSingleton<IGoogleLoginUseCase>('IGoogleLoginUsecase', GoogleLoginUseCase)
container.registerSingleton<IAdminDeleteUserUsecase>('IAdminDeleteUserUsecase', AdminDeleteUserUsecase)
container.registerSingleton<IAddSocialLinkUsecase>('IAddSocialLinkUsecase', AddSocialLinkUseCase)
container.registerSingleton<IDeleteSocialLinkUseCase>('IDeleteSocialLinkUsecase', DeleteSocialLinkUseCase)
container.registerSingleton<IEditProfileUseCase>('IEditProfileUsecase', EditProfileUseCase)
container.registerSingleton<IGetUserSpecificNotificationUsecase>('IGetUserSpecificNotificationsUsecase', GetUserSpecificNotificationsUsecase)
container.registerSingleton<ILoadUserAggregatedProfileUsecase>('ILoadUserAggregatedProfileUsecase', LoadUserAggregatedProfileUsecase)
container.registerSingleton<ILoadUserMetaDataUsecase>('ILoadUserMetaDataUsecase', LoadUserMetaData)
container.registerSingleton<IGetRecruiterApplicationsUsecase>('IGetRecruiterApplicationsUsecase', GetRecruiterApplicationsUsecase)
container.registerSingleton<IRejectRecruiterApplication>('IRejectRecruiterApplication', RejectRecruiterApplicationUsecase)
container.registerSingleton<IApproveRecruiterApplicationUsecase>('IApproveRecruiterApplicationUsecase', ApproveRecruiterApplicationUsecase)
container.registerSingleton<IGetJobDetailsUseCase>('IGetJobDetailsUsecase', GetJobDetailsUseCase)
container.registerSingleton<ISaveJobUsecase>('ISaveJobUsecase', SaveJobUsecase)
container.registerSingleton<ICheckIsJobSavedUseCase>('ICheckIsJobSavedUsecase', CheckIsJobSavedUseCase)
container.registerSingleton<IUnsaveJobUseCase>('IUnsaveJobUsecase', UnsaveJobUseCase)
container.registerSingleton<IApplyJobUsecase>('IApplyJobUsecase', ApplyJobUsecase)
container.registerSingleton<IAddResumeUseCase>('IAddResumeUsecase', AddResumeUseCase)
container.registerSingleton<IGetMyApplicationsUsecase>('IGetMyApplicationsUsecase', GetMyApplicationsUsecase)
container.registerSingleton<IScheduleInterviewUsecase>('IScheduleInterviewUsecase', ScheduleInterviewUsecase)
container.registerSingleton<IGetJobApplicationsUseCase>('IGetJobApplicationsUsecase', GetJobApplicationsUseCase)
container.registerSingleton<IUpdateCandidateNotes>('IUpdateCandidateNotesUsecase', UpdateCandidateNotesUsecase)
container.registerSingleton<IUpdateJobApplicationStatusUsecase>('IUpdateJobApplicationStatusUsecase', UpdateJobApplicationStatusUsecase)

container.registerSingleton<ILoginRecruiterrUseCase>(
  'ILoginRecruiterUseCase',
  LoginRecruiterUseCase
);
container.registerSingleton<ILoadRecruiterProfileOverviewUsecase>(
  'ILoadRecruiterProfileOverviewUsecase',
  LoadRecruiterProfileOverviewUsecase
);
container.registerSingleton<ICreateRecruiterUsecase>(
  'ICreateRecruiterUsecase',
  CreateRecruiterUsecase
);
container.registerSingleton<ILoadCompaniesUseCase>('ILoadCompaniesUseCase', AdminLoadRecruitersUsecase);
container.registerSingleton<IVerifyUserUseCase>('IVerifyUserUsecase', VerifyUserUseCase);

//register controller
container.registerSingleton(UserController);
container.registerSingleton(AdminController);
container.registerSingleton(PostController)
container.registerSingleton(RecruiterController);
container.registerSingleton(FollowController)
container.registerSingleton(OAuthController)
container.registerSingleton(NotificationController)

//register other services
container.registerSingleton<IEmailService>('IEmailService', EmailService); //email service
container.registerSingleton<ICloudStroageService>('ICloudStorageService', CloudStorageService)
container.registerSingleton<IDataHashService>('IDataHashService', DataHashService)
container.registerSingleton<IGoogleAuthService>('IGoogleAuthService', GoogleAuthService)
container.registerSingleton<IRealTimeEventEmitter>('IRealTimeEventEmitter', RealTimeEventEmitterService)

//register socket
