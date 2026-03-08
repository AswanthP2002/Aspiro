import { container } from 'tsyringe';
import IUserRepository from '../domain/interfaces/IUserRepo';
import UserRepository from '../infrastructure/repositories/userRepository';
import IAdminLoginUseCase from '../application/interfaces/usecases/admin/IAdminLogin.usecase..FIX';
import { AdminLoginUseCase } from '../application/usecases/admin/AdminLogin.usecase.FIX';
import { AdminController } from '../presentation/controllers/adminController';
// import ICandidateRepo from '../domain/interfaces/user/ICandidateRepo';
// import CandidateRepository from '../infrastructure/repositories/user/candidateRepository.GARBAGE';
import { AdminLoadUsersDetailsUsecase } from '../application/usecases/admin/AdminLoadUsersDetails.usecase';
import { AdminBlockUserUsecase } from '../application/usecases/admin/AdminBlockUser.usecase.FIX';
// import IFindCandidateByUserIdUseCase from '../application/usecases/candidate/interface/IFindCandidateByUserId.usecase';
// import FindCandidateByUserIdUseCase from '../application/usecases/candidate/FindCandidateByUserId.usecase';
import { AdminUnblockUserUsecase } from '../application/usecases/admin/AdminUnblockUser.usecase';
// import IFindCandidateByCandidateIdUseCase from '../application/usecases/interfaces/IFindCandidateByCandidateID.usecase';
// import FindCandidateByCandidateIDUseCase from '../application/usecases/FindCandidateByCandidateID.usecase';
import ICreateUserUseCase from '../application/interfaces/usecases/user/ICreateUser.usecase.FIX';
import CreateUserUseCase from '../application/usecases/user/CreateUser.usecase';
import RecruiterController from '../presentation/controllers/recruiterController';
import IRecruiterRepo from '../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterRespository from '../infrastructure/repositories/recruiter/recruiterRepository';
import IVerifyUserUseCase from '../application/interfaces/usecases/user/IVerifyUser.usecase.FIX';
import VerifyUserUseCase from '../application/usecases/user/VerifyUser.usecase.FIX';
import ILoginRecruiterrUseCase from '../application/usecases/recruiter/interface/ILoginRecruiter.usecase';
import { LoginRecruiterUseCase } from '../application/usecases/recruiter/LoginRecruiter.usecase';
import ILoadRecruiterProfileOverviewUsecase from '../application/interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import { LoadRecruiterProfileOverviewUsecase } from '../application/usecases/recruiter/LoadRecruiterProfileOverview.usecase';
import ILoadCompaniesUseCase from '../application/interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import { AdminLoadRecruitersUsecase } from '../application/usecases/admin/AdminLoadRecruiters.usecase';
import IEmailService from '../application/interfaces/services/IEmailService';
import EmailService from '../infrastructure/services/EmailService';
import { UserController } from '../presentation/controllers/UserController';
import IResendOTPUseCase from '../application/interfaces/usecases/user/IResendOTP.usecase.FIX';
import ResendOTPUseCase from '../application/usecases/user/ResendOTP.usecase.FIX';
import IUserLoginUseCase from '../application/interfaces/usecases/user/IUserLogin.usecase.FIX';
import { UserLoginUseCase } from '../application/usecases/user/UserLogin.usecase.FIX';
import { LoadUsersAdminUsecase } from '../application/usecases/admin/LoadUsersAdmin.usecase';
import ILoadUsersAdminUseCase from '../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase.FIX';
import { LoadMyProfileUsecase } from '../application/usecases/user/LoadMyProfileUsecase.usecase.FIX';
import ISaveUserBasicsUsecase from '../application/interfaces/usecases/user/ISaveUsersBasics.usecase.FIX';
import SaveUserBasicsUsecase from '../application/usecases/candidate/SaveUserBasics.usecase.FIX';
import IUploadUserProfilePictureUsecase from '../application/interfaces/usecases/user/IUploadUserProfilePicture.usecase.FIX';
import UploadUserProfilePictureUsecase from '../application/usecases/user/UploadUserProfilePicture.usecase.FIX';
import IUploadUserCoverPhotoUsecase from '../application/interfaces/usecases/user/IUploadUserCoverPhoto.usecase.FIX';
import UploadUserCoverPhotoUsecase from '../application/usecases/user/UploadCoverphoto.usecase.FIX';
import IRemoveUserProfilePictureUsecase from '../application/interfaces/usecases/user/IRemoveUserProfilePciture.usecase.FIX';
import RemoveUserProfilePictureUsecase from '../application/usecases/user/RemoveProfilePicture.usecase.FIX';
import IRemoveUserCoverPhotoUsecase from '../application/interfaces/usecases/user/IRemoveUserCoverPhoto.usecase.FIX';
import RemoveUserCoverPhotoUsecase from '../application/usecases/user/RemoveCoverphoto.usecase.FIX';
import IExperienceRepo from '../domain/interfaces/user/IExperienceRepo';
import ExperienceRepository from '../infrastructure/repositories/user/experienceRepository';
import IAddUserExperienceUsecase from '../application/interfaces/usecases/user/IAddUserExperience.usecase.FIX';
import AddUserExperienceUsecase from '../application/usecases/user/AddUserExperience.usecase.FIX';
import IGetUserExperiencesUsecase from '../application/interfaces/usecases/user/IGetUserExperiences.usecase.FIX';
import GetUserExperiencesUsecase from '../application/usecases/user/GetUserExperience.usecase.FIX';
import IEducationRepo from '../domain/interfaces/user/IEducationRepo';
import EducationRepository from '../infrastructure/repositories/user/educationRepository';
import IAddUserEducationUsecase from '../application/interfaces/usecases/user/IAddUserEducation.usecase.FIX';
import AddUserEducationUsecase from '../application/usecases/user/AddUserEducation.usecase.FIX';
import IGetUserEducationsUsecase from '../application/interfaces/usecases/user/IGetUserEducations.usecase.FIX';
import GetUserEducationsUsecase from '../application/usecases/user/GetUserEducations.usecase.FIX';
import ISkillRepo from '../domain/interfaces/user/ISkillRepo';
import SkillRepsitory from '../infrastructure/repositories/user/skillRespository';
import IAddUsersSkillUsecase from '../application/interfaces/usecases/user/IAddUsersSkill.usecase.FIX';
import AddUsersSkillsUsecase from '../application/usecases/user/AddUserSkills.usecase.FIX';
import IGetUserSkillsUsecase from '../application/interfaces/usecases/user/IGetUserSkills.usecase.FIX';
import GetUserSkillsUsecase from '../application/usecases/user/GetUserSkills.usecase.FIX';
import IEditUserEducationUsecase from '../application/interfaces/usecases/user/IEditUserEducation.usecase.FIX';
import EditUserEducationUsecase from '../application/usecases/user/EditUserEducation.usecase.FIX';
import IEditUserExperienceUsecase from '../application/interfaces/usecases/user/IEditUserExperience.usecase.FIX';
import EditUserExperienceUsecase from '../application/usecases/user/EditUserExperience.usecase.FIX';
import IDeleteUserEducationUsecase from '../application/interfaces/usecases/user/IDeleteUserEducation.usecase.FIX';
import DeleteUserEducationUsecase from '../application/usecases/user/DeleteUserEducation.usecase.FIX';
import IDeleteUserExperienceUsecase from '../application/interfaces/usecases/user/IDeleteUserExperience.usecase.FIX';
import DeleteUserExperienceUsecase from '../application/usecases/user/DeleteUserExperience.usecase';
import IDeleteUserSkillUsecase from '../application/interfaces/usecases/user/IDeleteUserSkill.usecase.FIX';
import DeleteUserSkillUsecase from '../application/usecases/user/DeleteUserSkill.usecase.FIX';
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
import ICreateRecruiterUsecase from '../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase.FIX';
import CreateRecruiterUsecase from '../application/usecases/recruiter/CreateRecruiter.usecase.FIX';
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
import ILoadJobsAggregatedUsecase from '../application/interfaces/usecases/user/IloadJobsAggregated.usecase.FIX';
import LoadJobsAggregatedUsecase from '../application/usecases/user/LoadJobsAggregated.usecase.FIX';
import IFollowRepo from '../domain/interfaces/IFollowRepo';
import FollowRepository from '../infrastructure/repositories/FollowRepository';
import FollowController from '../presentation/controllers/followController';
import ICreateNotificationUsecase from '../application/interfaces/usecases/shared/ICreateNotification.usecase';
import CreateNotificationUsecase from '../application/usecases/shared/CreateNotification.usecase';
import IFollowUserUseCase from '../application/interfaces/usecases/user/IFollowUser.usecase';
import FollowUseruseCse from '../application/usecases/FollowUser.usecase';
import IAdminLoadUserDetailsUsecase from '../application/interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import IAdminBlockUserUsecase from '../application/interfaces/usecases/admin/IAdminBlockUser.usecase.FIX';
import IAdminUnblockUserUsecase from '../application/interfaces/usecases/admin/IAdminUnblockUser.usecase.FIX';
import IFavoriteJobsRepo from '../domain/interfaces/user/IFavoriteJobRepo';
import FavoriteJobsRepsitory from '../infrastructure/repositories/user/favoriteJobsRepository';
import ISendResetPassworLinkUsecase from '../application/interfaces/usecases/user/ISendPasswordResetLink.usecase.FIX';
import SendResetPassworLinkUsecase from '../application/usecases/user/SendPasswordResetLink.usecase.FIX';
import IDataHashService from '../application/interfaces/services/IDataHashService';
import DataHashService from '../infrastructure/services/DataHashService';
import IResetPasswordUsecase from '../application/interfaces/usecases/user/IResetPassword.usecase.FIX';
import ResetPasswordUsecase from '../application/usecases/user/ResetPassword.usecase.FIX';
import IGoogleAuthService from '../application/interfaces/services/IGoogleAuthService';
import GoogleAuthService from '../infrastructure/services/GoogleAuthService';
import IGoogleLoginUseCase from '../application/interfaces/usecases/user/IGoogleLogin.usecase';
import GoogleLoginUseCase from '../application/usecases/GoogleLogin.usecase';
import OAuthController from '../presentation/controllers/oAuthController';
import IAdminDeleteUserUsecase from '../application/interfaces/usecases/admin/IAdminDeleteUser.usecase';
import AdminDeleteUserUsecase from '../application/usecases/admin/AdminDeleteUser.usecase';
import IAddSocialLinkUsecase from '../application/interfaces/usecases/user/IAddSocialLink.usecase.FIX';
import AddSocialLinkUseCase from '../application/usecases/user/AddSocialLink.usecase.FIX';
import IDeleteSocialLinkUseCase from '../application/interfaces/usecases/user/IDeleteSocialLink.usecase.FIX';
import DeleteSocialLinkUseCase from '../application/usecases/user/DeleteSocialLink.usecase.FIX';
import IEditProfileUseCase from '../application/interfaces/usecases/user/IEditProfile.usecase.FIX';
import EditProfileUseCase from '../application/usecases/candidate/EditProfile.usecase.FIX';
import IRealTimeEventEmitter from '../application/interfaces/services/IRealTimeEventEmitter';
import { RealTimeEventEmitterService } from '../infrastructure/services/RealTimeEventEmitterService';
import IGetUserSpecificNotificationUsecase from '../application/interfaces/usecases/shared/IGetUserSpecificNotifications.usecase';
import GetUserSpecificNotificationsUsecase from '../application/usecases/shared/GetUserSpecificNotifications.usecase';
import NotificationController from '../presentation/controllers/notificationController';
import INotificationRepo from '../domain/interfaces/INotificationRepo';
import NotificationRepository from '../infrastructure/repositories/notificationRepository';
import ILoadUserMetaDataUsecase from '../application/interfaces/usecases/user/ILoadUserMetaData.usecase.FIX';
import LoadUserMetaData from '../application/usecases/user/LoadUserMetaData.usecase.FIX';
import IUnFollowUserUsercase from '../application/usecases/interfaces/IUnFollowUser.usecase';
import UnfollowUserUseCase from '../application/usecases/UnfollowUser.usecase';
import IGetRecruiterApplicationsUsecase from '../application/interfaces/usecases/admin/IGetRecruiterApplications.usecase';
import GetRecruiterApplicationsUsecase from '../application/usecases/admin/GetRecruiterApplications.usecase';
import IRejectRecruiterApplication from '../application/interfaces/usecases/admin/IRejectRecruiterApplication.usecase.FIX';
import RejectRecruiterApplicationUsecase from '../application/usecases/admin/RejectRecruiterApplication.usecase';
import IApproveRecruiterApplicationUsecase from '../application/interfaces/usecases/admin/IApproveRecruiterApplication.usecase.FIXED';
import ApproveRecruiterApplicationUsecase from '../application/usecases/admin/ApproveRecruiterApplication.usecase.FIX';
import IGetJobDetailsUseCase from '../application/usecases/interfaces/IGetJobDetails.usecase.FIX';
import GetJobDetailsUseCase from '../application/usecases/GetJobDetails.usecase.FIX';
import ISaveJobUsecase from '../application/interfaces/usecases/user/ISaveJob.usecase.FIX';
import SaveJobUsecase from '../application/usecases/user/SaveJob.usecase.FIX';
import ICheckIsJobSavedUseCase from '../application/interfaces/usecases/user/ICheckIsJobSaved.usecase.FIX';
import CheckIsJobSavedUseCase from '../application/usecases/user/CheckIsJobSaved.usecase.FIX';
import IUnsaveJobUseCase from '../application/interfaces/usecases/user/IUnsaveJob.usecase.FIX';
import UnsaveJobUseCase from '../application/usecases/user/UnsaveJob.usecase.FIX';
import IGetSavedJobsUsecase from '../application/interfaces/usecases/user/IGetSavedJobs.usecase.FIX';
import GetSavedJobsUsecase from '../application/usecases/user/GetSavedJobs.usecase.FIX';
import IJobApplicationRepo from '../domain/interfaces/IJobApplicationRepo';
import JObApplicationRepository from '../infrastructure/repositories/JobApplicationRepository';
import IApplyJobUsecase from '../application/interfaces/usecases/user/IApplyJob.usecase.FIX';
import ApplyJobUsecase from '../application/usecases/user/ApplyJob.usecase.FIX';
import IResumeRepo from '../domain/interfaces/user/IResumeRepo';
import ResumeRepository from '../infrastructure/repositories/user/resumeRepository';
import IAddResumeUseCase from '../application/interfaces/usecases/user/IAddResume.usecase.FIX';
import AddResumeUseCase from '../application/usecases/user/AddResume.usecase.FIX';
import IGetMyApplicationsUsecase from '../application/interfaces/usecases/user/IGetMyApplications.usecase.FIX';
import GetMyApplicationsUsecase from '../application/usecases/user/GetMyApplications.usecase';
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
import ILoadResumeUseCase from '../application/interfaces/usecases/user/ILoadResumes.usecase.FIX';
import LoadResumesUseCase from '../application/usecases/candidate/LoadResume.usecase.FIX';
import IDeleteResumeUseCase from '../application/usecases/candidate/interface/IDeleteResume.usecase.FIX';
import DeleteResumeUseCase from '../application/usecases/candidate/DeleteResume.usecase.FIX';
import IAddCertificateUseCase from '../application/interfaces/usecases/user/IAddCertificate.usecase.FIX';
import AddCertificateUseCase from '../application/usecases/user/AddCertificate.usecase.FIX';
import ILoadCertificateUseCase from '../application/interfaces/usecases/user/IGetCeritificates.usecase.FIX';
import GetCertificatesUseCase from '../application/usecases/user/GetCertificates.usecase.FIX';
import ICertificateRepo from '../domain/interfaces/user/ICertificateRepo';
import CertificateRepository from '../infrastructure/repositories/user/certificateRepository';
import IAdminLoadRecruitersUsecase from '../application/interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import IBlockRecruiterUsecase from '../application/usecases/admin/interfaces/IBlockCompany.usecase.FIX';
import BlockRecruiterUsecase from '../application/usecases/admin/BlockComapny.usecase';
import IUnblockRecruiterUsecase from '../application/usecases/admin/interfaces/IUnblockCompany.usecase.FIX';
import UnblockRecruiterUsecase from '../application/usecases/admin/UnblockComapny.usecase';
import IDeleteRecruiterUsecase from '../application/usecases/admin/interfaces/ICloseCompany.usecase';
import DeleteRecruiterUsecaase from '../application/usecases/admin/CloseCompany.usecase';
import ISkillSetsRepo from '../domain/interfaces/ISkillSetsRepo';
import SkillSetRepository from '../infrastructure/repositories/SkillSetRepository';
import IAdminAddSkillUsecase from '../application/interfaces/usecases/admin/IAdminAddSkill.usecase';
import AdminAddSkillsUsecase from '../application/usecases/admin/AdminAddSkill.usecase';
import IAdminUpdateSkillUsecase from '../application/interfaces/usecases/admin/IAdminUpdateSkill.usecase';
import AdminUpdateSkillUsecase from '../application/usecases/admin/AdminUpdateSkill.usecase';
import IAdminDeleteSkillUsecase from '../application/interfaces/usecases/admin/IAdminDeleteSkill.usecase';
import AdminDeleteSkillsUsecase from '../application/usecases/admin/AdminDeleteSkill.usecase';
import IAdminGetSkillsUsecase from '../application/interfaces/usecases/admin/IAdminGetSkills.usecase';
import AdminGetSkillsUsecase from '../application/usecases/admin/AdminGetSkills.usecase';
import ILoadRecruiterRecentJobs from '../application/interfaces/usecases/recruiter/ILoadRecruiterRecentJobs.usecase';
import LoadRecruiterRecentJobsUsecase from '../application/usecases/recruiter/LoadRecruiterRecentJobs.usecase';
import IDeleteCertificateUsecase from '../application/interfaces/usecases/user/IDeleteCertificate.usecase';
import DeleteCertificateUsecase from '../application/usecases/user/DeleteCertificate.usecase';
import ISetResumePrimaryUsecase from '../application/interfaces/usecases/user/ISetResumePrimary.usecase';
import SetResumePrimaryUsecase from '../application/usecases/user/SetResumePrimary.usecase';
import IBulckApproveRecruiterApplicationUsecase from '../application/interfaces/usecases/admin/IBulckApproveRecruiterApplication.usecase';
import BulckApproveRecruiterApplicationsUSecase from '../application/usecases/admin/BulckApproveRecruiterApplications.usecase';
import IGetUsersForPublicUsecase from '../application/interfaces/usecases/user/IGetUsersforPublic.usecase';
import GetUsersForPublicUsecase from '../application/usecases/GetUsersForPublic.usecase';
import ILoadMyProfileUsecase from '../application/interfaces/usecases/user/ILoadMyProfile.usecase.FIX';
import IAlertRepo from '../domain/interfaces/user/IAlertRepo';
import AlertRepository from '../infrastructure/repositories/user/alertRepository';
import IGetUserAlertsUsecase from '../application/interfaces/usecases/user/IGetUserAlerts.usecase';
import GetUserAlertsUsecase from '../application/usecases/user/GetUserAlerts.usecase';
import ILoadUserPublicProfileUsecase from '../application/interfaces/usecases/user/ILoadUserAggregatedProfile.usecase.FIX';
import LoadUserpublicProfileUsecase from '../application/usecases/user/LoadUserAggregatedProfile.usecase.FIX';
import IChangeNotificationStatusUsecase from '../application/interfaces/usecases/shared/IChangeNotificationStatus.usecase';
import ChangeNotificationStatusUsecase from '../application/usecases/shared/ChangeNotificationStatus.usecase';
import ISoftDeleteNotificationUsecase from '../application/interfaces/usecases/shared/ISoftDeleteNotification.usecase';
import SoftDeleteNotificationUsecase from '../application/usecases/shared/SoftDeleteNotification.usecase';
import IConnectionRequestRepository from '../domain/interfaces/IConnectionRequest.repo';
import ConnectionRequestRepository from '../infrastructure/repositories/user/connectionRequest.repository';
import ISendConnectionRequestUsecase from '../application/interfaces/usecases/user/ISendConnectionRequest.usecase';
import { SendConnectionRequestUsecase } from '../application/usecases/user/SendConnectionRequest.usecase';
import IRejectConnectionRequestUsecase from '../application/interfaces/usecases/user/IRejectConnectionRequest.usecase';
import RejectConnectionRequestUsecase from '../application/usecases/user/RejectConnectionRequest.usecase';
import ICancelConnectionRequestUsecase from '../application/interfaces/usecases/user/ICancelConnectionRequest.usecase';
import CancelConnectionRequestUsecase from '../application/usecases/user/CancelConnectionRequest.usecase';
import IAcceptConnectionRequestUsecase from '../application/interfaces/usecases/user/IAcceptConnectionRequest.usecase';
import AcceptConnectionRequestUsecase from '../application/usecases/user/AcceptConnectionRequest.usecase';
import IConversationRepo from '../domain/interfaces/user/IConversationRepo';
import ConversationRepository from '../infrastructure/repositories/user/conversationRepository';
import ChatController from '../presentation/controllers/chatController';
import IGetConversationsUsecase from '../application/interfaces/usecases/user/IGetConversations.usecase';
import GetconversationsUsecase from '../application/usecases/user/GetConversations.usecase';
import IInitializeConversation from '../application/interfaces/usecases/user/IInitializeConversation.usecase';
import InitializeConversationUsecase from '../application/usecases/user/InitializeConversation.usecase';
import IChatRepository from '../domain/interfaces/user/IChatRepo';
import ChatRepository from '../infrastructure/repositories/user/chatRepository';
import IGetchatsUsecase from '../application/interfaces/usecases/user/IGetChats.usecase';
import GetChatsUsecase from '../application/usecases/user/GetChats.usecase';
import UserMapper from '../application/mappers/user/User.mapperClass';
import LoadUserMetaDataUsecase from '../application/usecases/user/LoadUserMetaData.usecase.FIX';
import CertificateMapper from '../application/mappers/user/Certificate.mapperClass';
import ResumeMapper from '../application/mappers/user/Resume.mapperClass';
import { ExperienceMapper } from '../application/mappers/user/Experience.mapperClass';
import EducationMapper from '../application/mappers/user/Education.mapperClass';
import { SkillsMapper } from '../application/mappers/user/Skill.mapperClass';
import IAdminPermanentBanUserUsecase from '../application/interfaces/usecases/admin/IAdminPermanentBanUser.usecase';
import AdminPermanentBanUserUsecase from '../application/usecases/admin/AdminPermanentBanUser.usecase';
import IAdminResetUserPasswordUsecase from '../application/interfaces/usecases/admin/IAdminResetUserPassword.usecase';
import AdminResetUserPasswordUsecase from '../application/usecases/admin/AdminResetUserPassword.usecase';
import IAdminRequestResetUserPasswordUsecase from '../application/interfaces/usecases/admin/IAdminRequestRestPassword.usecase';
import AdminRequestResetUserPasswordUsecase from '../application/usecases/admin/AdminRequestResetUserPassword.usecase';
import ILikePostCommentUsecase from '../application/interfaces/usecases/user/ILikePostComment.usecase';
import LikeCommentUsecase from '../application/usecases/user/LikeComment.usecase';
import IUnlikeCommentUsecase from '../application/interfaces/usecases/user/IUnlikeComment.usecase';
import UnlikeCommentUsecase from '../application/usecases/user/UnlikeComment.usecase';
import IDeletePostUsecase from '../application/interfaces/usecases/user/IDeletePost.usecase';
import DeletePostUsecase from '../application/usecases/user/DeletePost.usecase';
import { IHidePostUsecase } from '../application/interfaces/usecases/user/IHidePost.usecase';
import HidePostUsecase from '../application/usecases/user/HidePost.usecase';
import { IUnHidePostUsecase } from '../application/interfaces/usecases/user/IUnHidePost.usecase';
import UnHidePostUsecase from '../application/usecases/user/UnHidePost.usecase';
import ISavePostRepo from '../domain/interfaces/user/ISavePostRepo';
import SavePostRepository from '../infrastructure/repositories/user/savePostRepository';
import IToggleSavePostUsecase from '../application/interfaces/usecases/user/IToggleSavePost.usecase';
import ToggleSavePostUsecase from '../application/usecases/user/ToggleSavePost.usecase';
import ICompanyRepo from '../domain/interfaces/ICompanyRepo';
import CompanyRepository from '../infrastructure/repositories/companyRepository';
import IGetCompanyListUsecase from '../application/interfaces/usecases/IGetCompanyList.usecase';
import GetCompanyListUsecase from '../application/usecases/company/GetCompanyList.usecase';
import CompanyController from '../presentation/controllers/companyController';
import FollowMapper from '../application/mappers/user/Follow.mapperClass';
import IGetUnReadNotificationsCountUsecase from '../application/interfaces/usecases/shared/IGetUnreadNotificationsCount.usecase';
import GetUnReadNotificationsCountUsecase from '../application/usecases/shared/GetUnReadNotificationCount.usecase';
import IMarkReadAllNotificationsUsecase from '../application/interfaces/usecases/user/IMarkReadAllNotifications.usecase';
import MarkReadAllNotifications from '../application/usecases/user/MarkReadAllNotification.usecase';
import { IDeleteNotificationsUsecase } from '../application/interfaces/usecases/user/IDeleteAllNotifications.usecase';
import DeleteNotificationsUsecase from '../application/usecases/user/DeleteNotificationsUsecase';
import NotificationMapper from '../application/mappers/user/Notification.mapperClass';
import CompanyMapper from '../application/mappers/recruiter/Company.mapperClass';
import IAddCompanyUsecase from '../application/interfaces/usecases/recruiter/IAddCompnay.usecase';
import AddCompanyUsecase from '../application/usecases/recruiter/AddCompany.usecase';
import IGetcompaniesBySuggesionUsecase from '../application/interfaces/usecases/company/IGetCompaniesBySuggession.usecase';
import GetCompanySuggesionUsecase from '../application/usecases/recruiter/GetCompaniesSuggesion.usecase';
import RecruiterMapper from '../application/mappers/recruiter/Recruiter.mapperClass';
import IAdminLoadRecruiterDetailsUsecase from '../application/interfaces/usecases/admin/IAdminLoadRecruiterDetails.usecase';
import AdminLoadRecruiterDetailsUsecase from '../application/usecases/admin/AdminLoadRecruiterDetails.usecase';
import IAdminReoveRecruiterPermission from '../application/interfaces/usecases/admin/IAdminRevokeRecruiterVerification.usecase';
import IAdminRevokeRecruiterVerification from '../application/interfaces/usecases/admin/IAdminRevokeRecruiterVerification.usecase';
import AdminRevokeRecruiteerVerificationUsecase from '../application/usecases/admin/AdminRevokeRecruiterVerification.usecase';
import IAdminHandlePermissionRevokingUsecase from '../application/interfaces/usecases/admin/IAdminHandlePermissionRevoking.usecase';
import AdminHandlePermissionRevoking from '../application/usecases/admin/AdminHandlePermissionRevoking.usecase';
import IWorkModeRepository from '../domain/interfaces/admin/IWorkMode.repo';
import WorkModeRepository from '../infrastructure/repositories/admin/workMode.repository';
import WorkModeMapper from '../application/mappers/admin/WorkMode.mapperClass';
import IAdminAddWorkModeUsecase from '../application/interfaces/usecases/admin/IAdminAddWorkMode.usecase';
import AdminAddWorkModeUsecase from '../application/usecases/admin/AdminAddWorkMode.usecase';
import { IAdminGetWorkModesUsecase } from '../application/interfaces/usecases/admin/IAdminGetWorkModes.usecase';
import AdminGetWorkModesUsecase from '../application/usecases/admin/AdminGetWorkModes.usecase';
import { IAdminChangeWorkModeStatusUsecase } from '../application/interfaces/usecases/admin/IAdminChangeWorkmodeStatus.usecase';
import AdminChangeWorkmodeUsecase from '../application/usecases/admin/AdminChangeWorkmode.usecase';
import IAdminDeleteWorkModeUsecase from '../application/interfaces/usecases/admin/IAdminDeleteWorkMode.usecase';
import AdminDeleteWorkModeUsecase from '../application/usecases/admin/AdminDeleteWorkMode.usecase';
import IAdminEditWorkModeUsecase from '../application/interfaces/usecases/admin/IAdminEditWorkMode.usecase';
import AdminEditWorkModeUsecase from '../application/usecases/admin/AdminEditWorkMode.usecase';
import IJobLevelRepository from '../domain/interfaces/admin/IJobLevel.repository';
import JobLevelRepository from '../infrastructure/repositories/admin/jobLevel.repository';
import JobLevelMapper from '../application/mappers/admin/JobLevel.mapperClass';
import IAdminAddJobLevelUsecase from '../application/interfaces/usecases/admin/IAdminAddJobLevel.usecase';
import AdminAddJobLevelUsecase from '../application/usecases/admin/AdminAddJobLevel.usecase';
import IAdminGetJobLevelsUsecase from '../application/interfaces/usecases/admin/IAdminGetJobLevel.usecase';
import AdminGetJobLevelsUsecase from '../application/usecases/admin/AdminGetJobLevels.usecase';
import IAdminEditJobLevelUsecase from '../application/interfaces/usecases/admin/IAdminEditJobLevel.usecase';
import AdminEditJobLevelUsecase from '../application/usecases/admin/AdminEditJobLevel.usecase';
import IAdminChangeJobLevelStatusUsecase from '../application/interfaces/usecases/admin/IAdminChangeJobLevelStatus.usecase';
import AdminChangeJobLevelStatus from '../application/usecases/admin/AdminChangeJobLevelStatus.usecase';
import IAdminDeleteJobLevelUsecase from '../application/interfaces/usecases/admin/IAdminDeleteJobLevel.usecase';
import AdminDeleteJobLevelUsecase from '../application/usecases/admin/AdminDeleteJobLevel.usecase';
import IJobTypeRepository from '../domain/interfaces/admin/IJobType.repository';
import JobTypeRepository from '../infrastructure/repositories/admin/jobType.repository';
import JobTypeMapper from '../application/mappers/admin/JobType.mapperClass';
import IAdminAddJobTypeUsecase from '../application/interfaces/usecases/admin/IAdminAddJobType.usecase';
import AdminAddJobTypeUsecase from '../application/usecases/admin/AdminAddJobType.usecase';
import IAdminUpdateJobTypeUse from '../application/interfaces/usecases/admin/IAdminUpdateJobType.usecase';
import AdminUpdateJobTypeUsecase from '../application/usecases/admin/AdminUpdateJobType.usecase';
import IAdminChangeJobTypeStatusUsecase from '../application/interfaces/usecases/admin/IAdminChangeJobTypeStatus.usecase';
import AdminChangeJobTypeStatusUsecase from '../application/usecases/admin/AdminChangeJobTypeStatus.usecase';
import IAdminGetJobTypesUsecase from '../application/interfaces/usecases/admin/IAdminGetJobType.usecase';
import AdminGetJobTypesUsecase from '../application/usecases/admin/AdminGetJobTypes.usecase';
import IAdminDeleteJobTypeUsecase from '../application/interfaces/usecases/admin/IAdminDeleteJobType.usecase';
import AdminDeleteJobTypeUsecase from '../application/usecases/admin/AdminDeleteJobType.usecase';
import IAdminChangeRecruiterApplicationStatusToUnderReview from '../application/interfaces/usecases/admin/IAdminChangeRecruiterApplicationStatusToUnderReview.usecase';
import AdminChangeRecruiterApplicationStatusToUnderReview from '../application/usecases/admin/IAdminChangeRecruiterApplicationStatusToUnderReview.usecase';
import IGetJobTypeListUsecase from '../application/interfaces/usecases/recruiter/IGetJobTypeLists.usecase';
import GetJobTypeListsUsecase from '../application/usecases/recruiter/GetJobTypeLists.usecase';
import IGetJobLevelListsUsecase from '../application/interfaces/usecases/recruiter/IGetJobLevelLists.usecase';
import GetJobLevelListsUsecase from '../application/usecases/recruiter/GetJobLevelList.usecase';
import IGetWorkModeListsUsecase from '../application/interfaces/usecases/recruiter/IGetWorkModeLists.usecase';
import GetWorkModesListUsecase from '../application/usecases/recruiter/GetWorkModeLists.usecase';
import JobMapper from '../application/mappers/recruiter/Job.mapperClass';
import ILoadJobsUseCase from '../application/interfaces/usecases/admin/IAdminLoadJobs.usecase';
import LoadJobsUseCase from '../application/usecases/admin/AdminLoadJobs.usecase';
import IAdminLoadJobDetailsUseCase from '../application/usecases/admin/interfaces/ILoadJobDetails.usecase';
import { AdminLoadJobDetailsUseCase } from '../application/usecases/admin/LoadJobDetails.usecase';
import IAdminDeleteJobUsecase from '../application/interfaces/usecases/admin/IAdminDeleteJob.usecase';
import AdminDeleteJobUsecase from '../application/usecases/admin/AdminDeleteJob.usecase';
import JobController from '../presentation/controllers/jobController';
import ISearchJobsFromHomeUseCase from '../application/usecases/interfaces/ISearchJobsFromHome.usecase';
import SearchJobsFromHomeUseCase from '../application/usecases/SearchJobsFromHome.usecase';
import JobApplicationMapper from '../application/mappers/job/JobApplication.mapperClass';
import ICheckIsJobApplied from '../application/interfaces/usecases/user/ICheckJobApplied.usecase';
import CheckIsJobAppliedUsecase from '../application/usecases/user/CheckIsJobApplied.usecase';
import SavedJobsMapper from '../application/mappers/job/SavedJob.mapperClass';
import IGetJobApplicationDetailsUseCase from '../application/interfaces/usecases/recruiter/IGetJobApplicationDetails.usecase';
import GetJobApplicationDetailsUseCase from '../application/usecases/recruiter/GetJobApplicationDetails.usecase';

//register repo
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
// container.registerSingleton<ICandidateRepo>('ICandidateRepository', CandidateRepository);
container.registerSingleton<IRecruiterRepo>('IRecruiterRepository', RecruiterRespository);
container.registerSingleton<IExperienceRepo>('IExperienceRepository', ExperienceRepository);
container.registerSingleton<IEducationRepo>('IEducationRepository', EducationRepository);
container.registerSingleton<ISkillRepo>('ISkillRepository', SkillRepsitory);
container.registerSingleton<ISkillSetsRepo>('ISkillSetsRepository', SkillSetRepository);
container.registerSingleton<IPostRepo>('IPostRepository', PostRespository);
container.registerSingleton<ICommentRepository>('ICommentRepository', CommentRepository);
container.registerSingleton<IJobRepo>('IJobRepository', JobRepository);
container.registerSingleton<IFollowRepo>('IFollowRepository', FollowRepository);
container.registerSingleton<IFavoriteJobsRepo>('IFavoriteJobRepository', FavoriteJobsRepsitory);
container.registerSingleton<INotificationRepo>('INotificationRepository', NotificationRepository);
container.registerSingleton<IAlertRepo>('IAlertsRepository', AlertRepository);
container.registerSingleton<IConnectionRequestRepository>(
  'IConnectionRequestRepository',
  ConnectionRequestRepository
);
container.registerSingleton<IChatRepository>('IChatRepository', ChatRepository);
container.registerSingleton<IConversationRepo>('IConversationRepository', ConversationRepository);
container.registerSingleton<IJobApplicationRepo>(
  'IJobApplicationRepository',
  JObApplicationRepository
);
container.registerSingleton<ICertificateRepo>('ICertificateRepository', CertificateRepository);
container.registerSingleton<IResumeRepo>('IResumeRepository', ResumeRepository);
container.registerSingleton<IInterviewRepo>('IInterviewRepository', InterviewRepository);
container.registerSingleton<ISavePostRepo>('ISavePostRepository', SavePostRepository);
container.registerSingleton<ICompanyRepo>('ICompanyRepository', CompanyRepository);
container.registerSingleton<IWorkModeRepository>('IWorkModeRepository', WorkModeRepository);
container.registerSingleton<IJobLevelRepository>('IJobLevelRepository', JobLevelRepository);
container.registerSingleton<IJobTypeRepository>('IJobTypeRepository', JobTypeRepository);

container.registerSingleton<IGetchatsUsecase>('IGetChatsUsecase', GetChatsUsecase);
//register usecase
container.registerSingleton<IAdminLoginUseCase>('IAdminLoginUseCase', AdminLoginUseCase);
container.registerSingleton<ILoadUsersAdminUseCase>(
  'ILoadUsersAdminUsecase',
  LoadUsersAdminUsecase
);

container.registerSingleton<IAdminBlockUserUsecase>(
  'IAdminBlockUserUsecase',
  AdminBlockUserUsecase
);
container.registerSingleton<IAdminUnblockUserUsecase>(
  'IAdminUnblockUserUsecase',
  AdminUnblockUserUsecase
);
container.registerSingleton<IAdminPermanentBanUserUsecase>(
  'IAdminPermanentBanUserUsecase',
  AdminPermanentBanUserUsecase
);
container.registerSingleton<IAdminRequestResetUserPasswordUsecase>(
  'IAdminRequestUserPasswordResetUsecase',
  AdminRequestResetUserPasswordUsecase
);
container.registerSingleton<IAdminResetUserPasswordUsecase>(
  'IAdminResetUserPasswordUsecase',
  AdminResetUserPasswordUsecase
);

container.registerSingleton<ILoadRecruiterRecentJobs>(
  'ILoadRecruiterRecentJobs',
  LoadRecruiterRecentJobsUsecase
);
// container.registerSingleton<IFindCandidateByUserIdUseCase>(
//   'IFindCandidateByUserIdUseCase',
//   FindCandidateByUserIdUseCase
// );
// container.registerSingleton<IFindCandidateByCandidateIdUseCase>(
//   'IFindCandidateByCandidateIDUseCase',
//   FindCandidateByCandidateIDUseCase
// );
container.registerSingleton<ICreateUserUseCase>('ICreateUserUsecase', CreateUserUseCase);
container.registerSingleton<IVerifyUserUseCase>('IVerifyUserUseCase', VerifyUserUseCase);
container.registerSingleton<IResendOTPUseCase>('IResendOTPUsecase', ResendOTPUseCase);
container.registerSingleton<IUserLoginUseCase>('IUserLoginUsecase', UserLoginUseCase);
container.registerSingleton<ILoadMyProfileUsecase>('ILoadMyProfileUsecase', LoadMyProfileUsecase);
container.registerSingleton<ISaveUserBasicsUsecase>(
  'ISaveUserBasicsUsecase',
  SaveUserBasicsUsecase
);
container.registerSingleton<IUploadUserProfilePictureUsecase>(
  'IUploadUserProfilePictureUsecase',
  UploadUserProfilePictureUsecase
);
container.registerSingleton<IUploadUserCoverPhotoUsecase>(
  'IUploadUserCoverPhotoUsecase',
  UploadUserCoverPhotoUsecase
);
container.registerSingleton<IRemoveUserProfilePictureUsecase>(
  'IRemoveUserProfilePictureUsecase',
  RemoveUserProfilePictureUsecase
);
container.registerSingleton<IRemoveUserCoverPhotoUsecase>(
  'IRemoveUserCoverPhotoUsecase',
  RemoveUserCoverPhotoUsecase
);
container.registerSingleton<IAddUserExperienceUsecase>(
  'IAddUserExperienceUsecase',
  AddUserExperienceUsecase
);
container.registerSingleton<IGetUserExperiencesUsecase>(
  'IGetUserExperiencesUsecase',
  GetUserExperiencesUsecase
);
container.registerSingleton<IAddUserEducationUsecase>(
  'IAddUserEducationUsecase',
  AddUserEducationUsecase
);
container.registerSingleton<IGetUserEducationsUsecase>(
  'IGetUserEducationsUsecase',
  GetUserEducationsUsecase
);
container.registerSingleton<IAddUsersSkillUsecase>('IAddUsersSkillUsecase', AddUsersSkillsUsecase);
container.registerSingleton<IGetUserSkillsUsecase>('IGetUsersSkillsUsecase', GetUserSkillsUsecase);
container.registerSingleton<IEditUserEducationUsecase>(
  'IEditUserEducationUsecase',
  EditUserEducationUsecase
);
container.registerSingleton<IEditUserExperienceUsecase>(
  'IEditUserExperienceUsecase',
  EditUserExperienceUsecase
);
container.registerSingleton<IDeleteUserEducationUsecase>(
  'IDeleteUserEducationUsecase',
  DeleteUserEducationUsecase
);
container.registerSingleton<IDeleteUserExperienceUsecase>(
  'IDeleteUserExperienceUsecase',
  DeleteUserExperienceUsecase
);
container.registerSingleton<IDeleteUserSkillUsecase>(
  'IDeleteUserSkillUsecase',
  DeleteUserSkillUsecase
);
container.registerSingleton<ICreatePostUsecase>('ICreatePostUsecase', CreatePostUseCase);
container.registerSingleton<IDeletePostUsecase>('IDeletePostUsecase', DeletePostUsecase);
container.registerSingleton<IHidePostUsecase>('IHidePostUsecase', HidePostUsecase);
container.registerSingleton<IUnHidePostUsecase>('IUnHidePostUsecase', UnHidePostUsecase);
container.registerSingleton<IToggleSavePostUsecase>(
  'IToggleSavePostUsecase',
  ToggleSavePostUsecase
);
container.registerSingleton<IGetCompanyListUsecase>(
  'IGetCompanyListUsecase',
  GetCompanyListUsecase
);
container.registerSingleton<IGetcompaniesBySuggesionUsecase>(
  'IGetcompaniesBySuggesion',
  GetCompanySuggesionUsecase
);
container.registerSingleton<IAddCompanyUsecase>('IAddCompanyUsecase', AddCompanyUsecase);
container.registerSingleton<IGetPostsUsecase>('IGetPostsUsecase', GetPostsUsecase);
container.registerSingleton<ILikePostUsecase>('ILikePostUsecase', LikePostUsecase);
container.registerSingleton<IUnlikePostUsecase>('IUnlikePostUsecase', UnlikePostUsecase);
container.registerSingleton<ICreateCommentUsecase>('ICreateCommentUsecase', CreateCommentUsecase);
container.registerSingleton<IDeleteCommentUsecase>('IDeleteCommentUsecase', DeleteCommentUsecase);
container.registerSingleton<ILikePostCommentUsecase>('ILikeCommentUsecase', LikeCommentUsecase);
container.registerSingleton<IUnlikeCommentUsecase>('IUnlikeCommentUsecase', UnlikeCommentUsecase);
container.registerSingleton<ICreateJobUseCase>('ICreateJobUsecase', CreateJobUseCase);
container.registerSingleton<ILoadRecruiterJobsUsecase>(
  'ILoadRecruiterJobsUsecase',
  LoadRecruiterJobsUsecase
);
container.registerSingleton<IGetJobTypeListUsecase>(
  'IGetJobTypeListsUsecase',
  GetJobTypeListsUsecase
);
container.registerSingleton<IGetJobLevelListsUsecase>(
  'IGetJobLevelListsUsecase',
  GetJobLevelListsUsecase
);
container.registerSingleton<IGetWorkModeListsUsecase>(
  'IGetWorkModeListsUsecase',
  GetWorkModesListUsecase
);
container.registerSingleton<IEditJobUsecase>('IEditJobUsecase', EditJobUsecase);
container.registerSingleton<IDeleteJobUsecase>('IDeleteJobUsecase', DeleteJobUsecase);
container.registerSingleton<ILoadJobsAggregatedUsecase>(
  'ILoadJobsAggregatedUsecase',
  LoadJobsAggregatedUsecase
);
container.registerSingleton<ICreateNotificationUsecase>(
  'ICreateNotificationUsecase',
  CreateNotificationUsecase
);
container.registerSingleton<IFollowUserUseCase>('IFollowUserUsecase', FollowUseruseCse);
container.registerSingleton<ISendConnectionRequestUsecase>(
  'ISendConnectionRequestUsecase',
  SendConnectionRequestUsecase
);
container.registerSingleton<IRejectConnectionRequestUsecase>(
  'IRejectConnectionRequestUsecase',
  RejectConnectionRequestUsecase
);
container.registerSingleton<ICancelConnectionRequestUsecase>(
  'ICancelConnectionRequestUsecase',
  CancelConnectionRequestUsecase
);
container.registerSingleton<IAcceptConnectionRequestUsecase>(
  'IAcceptConnectionRequestUsecase',
  AcceptConnectionRequestUsecase
);
container.registerSingleton<IUnFollowUserUsercase>('IUnfollowUserUsecase', UnfollowUserUseCase);
container.registerSingleton<IAdminLoadUserDetailsUsecase>(
  'IAdminLoadUserDetailsUsecase',
  AdminLoadUsersDetailsUsecase
);
container.registerSingleton<IGetSavedJobsUsecase>('IGetSavedJobsUsecase', GetSavedJobsUsecase);
container.registerSingleton<ISendResetPassworLinkUsecase>(
  'ISendResetPasswordLinkUsecase',
  SendResetPassworLinkUsecase
);
container.registerSingleton<IResetPasswordUsecase>('IResetPasswordUsecase', ResetPasswordUsecase);
container.registerSingleton<IGoogleLoginUseCase>('IGoogleLoginUsecase', GoogleLoginUseCase);
container.registerSingleton<IAdminDeleteUserUsecase>(
  'IAdminDeleteUserUsecase',
  AdminDeleteUserUsecase
);
container.registerSingleton<IAddSocialLinkUsecase>('IAddSocialLinkUsecase', AddSocialLinkUseCase);
container.registerSingleton<IDeleteSocialLinkUseCase>(
  'IDeleteSocialLinkUsecase',
  DeleteSocialLinkUseCase
);
container.registerSingleton<IEditProfileUseCase>('IEditProfileUsecase', EditProfileUseCase);
container.registerSingleton<IGetUserSpecificNotificationUsecase>(
  'IGetUserSpecificNotificationsUsecase',
  GetUserSpecificNotificationsUsecase
);
container.registerSingleton<IMarkReadAllNotificationsUsecase>(
  'IMarkReadAllNotificationsUsecase',
  MarkReadAllNotifications
);
container.registerSingleton<IDeleteNotificationsUsecase>(
  'IDeleteNotificationsUsecase',
  DeleteNotificationsUsecase
);
container.registerSingleton<IGetUnReadNotificationsCountUsecase>(
  'IGetUnReadNotificationsCount',
  GetUnReadNotificationsCountUsecase
);
container.registerSingleton<IChangeNotificationStatusUsecase>(
  'IChangeNotificationStatusUsecae',
  ChangeNotificationStatusUsecase
);
container.registerSingleton<ISoftDeleteNotificationUsecase>(
  'ISoftDeleteNotificationUsecase',
  SoftDeleteNotificationUsecase
);
container.registerSingleton<ILoadUserPublicProfileUsecase>(
  'ILoadUserPublicProfileUsecase',
  LoadUserpublicProfileUsecase
);
container.registerSingleton<ILoadUserMetaDataUsecase>(
  'ILoadUserMetaDataUsecase',
  LoadUserMetaDataUsecase
);
container.registerSingleton<IGetRecruiterApplicationsUsecase>(
  'IGetRecruiterApplicationsUsecase',
  GetRecruiterApplicationsUsecase
);
container.registerSingleton<IRejectRecruiterApplication>(
  'IRejectRecruiterApplication',
  RejectRecruiterApplicationUsecase
);
container.registerSingleton<IApproveRecruiterApplicationUsecase>(
  'IApproveRecruiterApplicationUsecase',
  ApproveRecruiterApplicationUsecase
);
container.registerSingleton<IGetJobDetailsUseCase>('IGetJobDetailsUsecase', GetJobDetailsUseCase);
container.registerSingleton<ISaveJobUsecase>('ISaveJobUsecase', SaveJobUsecase);
container.registerSingleton<ICheckIsJobSavedUseCase>(
  'ICheckIsJobSavedUsecase',
  CheckIsJobSavedUseCase
);
container.registerSingleton<IUnsaveJobUseCase>('IUnsaveJobUsecase', UnsaveJobUseCase);
container.registerSingleton<IApplyJobUsecase>('IApplyJobUsecase', ApplyJobUsecase);
container.registerSingleton<ICheckIsJobApplied>(
  'ICheckIsJobAppliedUsecase',
  CheckIsJobAppliedUsecase
);
container.registerSingleton<IAddResumeUseCase>('IAddResumeUsecase', AddResumeUseCase);
container.registerSingleton<ILoadResumeUseCase>('ILoadResumeUsecase', LoadResumesUseCase);
container.registerSingleton<IDeleteResumeUseCase>('IDeleteResumeUsecase', DeleteResumeUseCase);
container.registerSingleton<IAddCertificateUseCase>('IAddCertificate', AddCertificateUseCase);
container.registerSingleton<ILoadCertificateUseCase>('ILoadCertificates', GetCertificatesUseCase);
container.registerSingleton<IDeleteCertificateUsecase>(
  'IDeleteCertificateUsecase',
  DeleteCertificateUsecase
);
container.registerSingleton<IBulckApproveRecruiterApplicationUsecase>(
  'IBulckApproveRecruiterApplicationsUsecase',
  BulckApproveRecruiterApplicationsUSecase
);
container.registerSingleton<IAdminChangeRecruiterApplicationStatusToUnderReview>(
  'IAdminChangeRecruiterApplicationStatusToUnderReview',
  AdminChangeRecruiterApplicationStatusToUnderReview
);
container.registerSingleton<IGetUsersForPublicUsecase>(
  'IGetUsersForPublicUsecase',
  GetUsersForPublicUsecase
);
container.registerSingleton<ISetResumePrimaryUsecase>('ISetResumePrimary', SetResumePrimaryUsecase);
container.registerSingleton<IGetMyApplicationsUsecase>(
  'IGetMyApplicationsUsecase',
  GetMyApplicationsUsecase
);
container.registerSingleton<IGetConversationsUsecase>(
  'IGetConversationsUsecase',
  GetconversationsUsecase
);
container.registerSingleton<IInitializeConversation>(
  'IInitializeConversation',
  InitializeConversationUsecase
);
container.registerSingleton<IScheduleInterviewUsecase>(
  'IScheduleInterviewUsecase',
  ScheduleInterviewUsecase
);
container.registerSingleton<IGetJobApplicationsUseCase>(
  'IGetJobApplicationsUsecase',
  GetJobApplicationsUseCase
);
container.registerSingleton<IGetJobApplicationDetailsUseCase>(
  'IGetJobApplicationDetailsUsecase',
  GetJobApplicationDetailsUseCase
);
container.registerSingleton<ISearchJobsFromHomeUseCase>(
  'SearchJobsFromHomeUsecase',
  SearchJobsFromHomeUseCase
);
container.registerSingleton<IUpdateCandidateNotes>(
  'IUpdateCandidateNotesUsecase',
  UpdateCandidateNotesUsecase
);
container.registerSingleton<IUpdateJobApplicationStatusUsecase>(
  'IUpdateJobApplicationStatusUsecase',
  UpdateJobApplicationStatusUsecase
);

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
container.registerSingleton<ILoadCompaniesUseCase>(
  'ILoadCompaniesUseCase',
  AdminLoadRecruitersUsecase
);
container.registerSingleton<IAdminRevokeRecruiterVerification>(
  'IAdminRevokeRecruiterVerificationUsecase',
  AdminRevokeRecruiteerVerificationUsecase
);
container.registerSingleton<IAdminHandlePermissionRevokingUsecase>(
  'IAdminHandlePermissionRevokingUsecase',
  AdminHandlePermissionRevoking
);
container.registerSingleton<IAdminLoadRecruitersUsecase>(
  'IAdminLoadRecruitersUsecase',
  AdminLoadRecruitersUsecase
);
container.registerSingleton<IBlockRecruiterUsecase>(
  'IBlockRecruiterUsecase',
  BlockRecruiterUsecase
);
container.registerSingleton<IUnblockRecruiterUsecase>(
  'IUnblockRecruiterUsecase',
  UnblockRecruiterUsecase
);
container.registerSingleton<IAdminLoadRecruiterDetailsUsecase>(
  'IAdminLoadRecruiterDetailsUsecase',
  AdminLoadRecruiterDetailsUsecase
);
container.registerSingleton<IDeleteRecruiterUsecase>(
  'IDeleteRecruiterUsecase',
  DeleteRecruiterUsecaase
);
container.registerSingleton<IAdminAddSkillUsecase>('IAdminAddSkillsUsecase', AdminAddSkillsUsecase);
container.registerSingleton<IAdminUpdateSkillUsecase>(
  'IAdminUpdateSkillsUsecase',
  AdminUpdateSkillUsecase
);
container.registerSingleton<IAdminDeleteSkillUsecase>(
  'IAdminDeleteSkillsUsecase',
  AdminDeleteSkillsUsecase
);
container.registerSingleton<IAdminGetSkillsUsecase>(
  'IAdminGetSkillsUsecase',
  AdminGetSkillsUsecase
);
container.registerSingleton<IAdminAddWorkModeUsecase>(
  'IAdminAddWorkModeUsecase',
  AdminAddWorkModeUsecase
);
container.registerSingleton<IAdminGetWorkModesUsecase>(
  'IAdminGetWorkModeUsecase',
  AdminGetWorkModesUsecase
);
container.registerSingleton<IAdminChangeWorkModeStatusUsecase>(
  'IAdminChangeWorkModeStatusUsecase',
  AdminChangeWorkmodeUsecase
);
container.registerSingleton<IAdminDeleteWorkModeUsecase>(
  'IAdminDeleteWorkModeUsecase',
  AdminDeleteWorkModeUsecase
);
container.registerSingleton<IAdminEditWorkModeUsecase>(
  'IAdminEditWorkModeUsecase',
  AdminEditWorkModeUsecase
);
container.registerSingleton<IAdminAddJobLevelUsecase>(
  'IAdminAddJobLevelUsecase',
  AdminAddJobLevelUsecase
);
container.registerSingleton<IAdminGetJobLevelsUsecase>(
  'IAdminGetJobLevelUsecase',
  AdminGetJobLevelsUsecase
);
container.registerSingleton<IAdminEditJobLevelUsecase>(
  'IAdminEditJobLevelUsecase',
  AdminEditJobLevelUsecase
);
container.registerSingleton<ILoadJobsUseCase>('IAdminLoadJobsUsecase', LoadJobsUseCase);
container.registerSingleton<IAdminChangeJobLevelStatusUsecase>(
  'IAdminChangeJobLevelStatusUsecase',
  AdminChangeJobLevelStatus
);
container.registerSingleton<IAdminDeleteJobUsecase>(
  'IAdminDeleteJobUsecase',
  AdminDeleteJobUsecase
);
container.registerSingleton<IAdminLoadJobDetailsUseCase>(
  'IAdminLoadJobDetailsUsecase',
  AdminLoadJobDetailsUseCase
);
container.registerSingleton<IAdminDeleteJobLevelUsecase>(
  'IAdminDeleteJobLevelUsecase',
  AdminDeleteJobLevelUsecase
);
container.registerSingleton<IAdminAddJobTypeUsecase>(
  'IAdminAddJobTypeUsecase',
  AdminAddJobTypeUsecase
);
container.registerSingleton<IAdminUpdateJobTypeUse>(
  'IAdminUpdateJobTypeUsecase',
  AdminUpdateJobTypeUsecase
);
container.registerSingleton<IAdminChangeJobTypeStatusUsecase>(
  'IAdminChangeJobTypeStatusUsecase',
  AdminChangeJobTypeStatusUsecase
);
container.registerSingleton<IAdminGetJobTypesUsecase>(
  'IAdminGetJobTypesUsecase',
  AdminGetJobTypesUsecase
);
container.registerSingleton<IAdminDeleteJobTypeUsecase>(
  'IAdminDeleteJobTypeUsecase',
  AdminDeleteJobTypeUsecase
);

container.registerSingleton<IVerifyUserUseCase>('IVerifyUserUsecase', VerifyUserUseCase);
container.registerSingleton<IGetUserAlertsUsecase>('IGetUserAlertsUsecase', GetUserAlertsUsecase);

//register controller
container.registerSingleton(UserController);
container.registerSingleton(AdminController);
container.registerSingleton(PostController);
container.registerSingleton(RecruiterController);
container.registerSingleton(FollowController);
container.registerSingleton(OAuthController);
container.registerSingleton(NotificationController);
container.registerSingleton(ChatController);
container.registerSingleton(CompanyController);
container.registerSingleton(JobController);

//register other services
container.registerSingleton<IEmailService>('IEmailService', EmailService); //email service
container.registerSingleton<ICloudStroageService>('ICloudStorageService', CloudStorageService);
container.registerSingleton<IDataHashService>('IDataHashService', DataHashService);
container.registerSingleton<IGoogleAuthService>('IGoogleAuthService', GoogleAuthService);
container.registerSingleton<IRealTimeEventEmitter>(
  'IRealTimeEventEmitter',
  RealTimeEventEmitterService
);

//register mappers
container.registerSingleton('UserMapper', UserMapper);
container.registerSingleton('CertificateMapper', CertificateMapper);
container.registerSingleton('ResumeMapper', ResumeMapper);
container.registerSingleton('ExperienceMapper', ExperienceMapper);
container.registerSingleton('EducationMapper', EducationMapper);
container.registerSingleton('SkillMapper', SkillsMapper);
container.registerSingleton('FollowMapper', FollowMapper);
container.registerSingleton('NotificationMapper', NotificationMapper);
container.registerSingleton('CompanyMapper', CompanyMapper);
container.registerSingleton('RecruiterMapper', RecruiterMapper);
container.registerSingleton('WorkModeMapper', WorkModeMapper);
container.registerSingleton('JobLevelMapper', JobLevelMapper);
container.registerSingleton('JobTypeMapper', JobTypeMapper);
container.registerSingleton('JobMapper', JobMapper);
container.registerSingleton('JobApplicationMapper', JobApplicationMapper);
container.registerSingleton('SavedJobsMapper', SavedJobsMapper);

//register socket
