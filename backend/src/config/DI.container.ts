import { container } from 'tsyringe';
import IUserRepository from '../domain/interfaces/IUserRepo';
import UserRepository from '../infrastructure/repositories/userRepository';
import IAdminLoginUseCase from '../application/interfaces/usecases/admin/IAdminLogin.usecase..FIX';
import { AdminLoginUseCase } from '../application/usecases/admin/AdminLogin.usecase.FIX';
import { AdminController } from '../presentation/controllers/adminController';
// import ICandidateRepo from '../domain/interfaces/user/ICandidateRepo';
// import CandidateRepository from '../infrastructure/repositories/user/candidateRepository.GARBAGE';
import { AdminLoadUsersDetailsUsecase } from '../application/usecases/user/AdminLoadUsersDetails.usecase';
import { AdminBlockUserUsecase } from '../application/usecases/user/AdminBlockUser.usecase.FIX';
// import IFindCandidateByUserIdUseCase from '../application/usecases/candidate/interface/IFindCandidateByUserId.usecase';
// import FindCandidateByUserIdUseCase from '../application/usecases/candidate/FindCandidateByUserId.usecase';
import { AdminUnblockUserUsecase } from '../application/usecases/user/AdminUnblockUser.usecase';
// import IFindCandidateByCandidateIdUseCase from '../application/usecases/interfaces/IFindCandidateByCandidateID.usecase';
// import FindCandidateByCandidateIDUseCase from '../application/usecases/FindCandidateByCandidateID.usecase';
import ICreateUserUseCase from '../application/interfaces/usecases/user/ICreateUser.usecase.FIX';
import CreateUserUseCase from '../application/usecases/user/CreateUser.usecase';
import RecruiterController from '../presentation/controllers/recruiterController';
import IRecruiterRepo from '../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterRespository from '../infrastructure/repositories/recruiter/recruiterRepository';
import IVerifyUserUseCase from '../application/interfaces/usecases/user/IVerifyUser.usecase.FIX';
import VerifyUserUseCase from '../application/usecases/user/VerifyUser.usecase.FIX';
// import ILoginRecruiterrUseCase from '../application/usecases/recruiter/interface/ILoginRecruiter.usecase';
// import { LoginRecruiterUseCase } from '../application/usecases/recruiter/LoginRecruiter.usecase';
import ILoadRecruiterProfileOverviewUsecase from '../application/interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import { LoadRecruiterProfileOverviewUsecase } from '../application/usecases/recruiter/LoadRecruiterProfileOverview.usecase';
import ILoadCompaniesUseCase from '../application/interfaces/usecases/recruiter/IAdminLoadRecruiters.usecase';
import { AdminLoadRecruitersUsecase } from '../application/usecases/recruiter/AdminLoadRecruiters.usecase';
import IEmailService from '../application/interfaces/services/IEmailService';
import EmailService from '../infrastructure/services/EmailService';
// import { UserController } from '../presentation/controllers/UserController';
import { UserController } from '../presentation/controllers/userController';
import IResendOTPUseCase from '../application/interfaces/usecases/user/IResendOTP.usecase.FIX';
import ResendOTPUseCase from '../application/usecases/user/ResendOTP.usecase.FIX';
import IUserLoginUseCase from '../application/interfaces/usecases/user/IUserLogin.usecase.FIX';
import { UserLoginUseCase } from '../application/usecases/user/UserLogin.usecase.FIX';
import { LoadUsersAdminUsecase } from '../application/usecases/user/LoadUsersAdmin.usecase';
import ILoadUsersAdminUseCase from '../application/interfaces/usecases/user/ILoadUsersAdmin.usecase.FIX';
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
import IAddUserExperienceUsecase from '../application/interfaces/usecases/experience/IAddUserExperience.usecase.FIX';
import AddUserExperienceUsecase from '../application/usecases/experience/AddUserExperience.usecase.FIX';
import IGetUserExperiencesUsecase from '../application/interfaces/usecases/experience/IGetUserExperiences.usecase.FIX';
import GetUserExperiencesUsecase from '../application/usecases/experience/GetUserExperience.usecase.FIX';
import IEducationRepo from '../domain/interfaces/user/IEducationRepo';
import EducationRepository from '../infrastructure/repositories/user/educationRepository';
import IAddUserEducationUsecase from '../application/interfaces/usecases/education/IAddUserEducation.usecase.FIX';
import AddUserEducationUsecase from '../application/usecases/education/AddUserEducation.usecase.FIX';
import IGetUserEducationsUsecase from '../application/interfaces/usecases/education/IGetUserEducations.usecase.FIX';
import GetUserEducationsUsecase from '../application/usecases/education/GetUserEducations.usecase.FIX';
import ISkillRepo from '../domain/interfaces/user/ISkillRepo';
import SkillRepsitory from '../infrastructure/repositories/user/skillRespository';
import IAddUsersSkillUsecase from '../application/interfaces/usecases/skill.user/IAddUsersSkill.usecase.FIX';
import AddUsersSkillsUsecase from '../application/usecases/skill.user/AddUserSkills.usecase.FIX';
import IGetUserSkillsUsecase from '../application/interfaces/usecases/skill.user/IGetUserSkills.usecase.FIX';
import GetUserSkillsUsecase from '../application/usecases/skill.user/GetUserSkills.usecase.FIX';
import IEditUserEducationUsecase from '../application/interfaces/usecases/education/IEditUserEducation.usecase.FIX';
import EditUserEducationUsecase from '../application/usecases/education/EditUserEducation.usecase.FIX';
import IEditUserExperienceUsecase from '../application/interfaces/usecases/experience/IEditUserExperience.usecase.FIX';
import EditUserExperienceUsecase from '../application/usecases/experience/EditUserExperience.usecase.FIX';
import IDeleteUserEducationUsecase from '../application/interfaces/usecases/education/IDeleteUserEducation.usecase.FIX';
import DeleteUserEducationUsecase from '../application/usecases/education/DeleteUserEducation.usecase.FIX';
import IDeleteUserExperienceUsecase from '../application/interfaces/usecases/experience/IDeleteUserExperience.usecase.FIX';
import DeleteUserExperienceUsecase from '../application/usecases/experience/DeleteUserExperience.usecase';
import IDeleteUserSkillUsecase from '../application/interfaces/usecases/skill.user/IDeleteUserSkill.usecase.FIX';
import DeleteUserSkillUsecase from '../application/usecases/skill.user/DeleteUserSkill.usecase.FIX';
import ICloudStroageService from '../application/interfaces/services/ICloudStorageService';
import CloudStorageService from '../infrastructure/services/CloudStorageService';
import IPostRepo from '../domain/interfaces/IPostRepo';
import PostRespository from '../infrastructure/repositories/PostRepository';
import ICreatePostUsecase from '../application/interfaces/usecases/post/ICreatePost.usecase';
import PostController from '../presentation/controllers/postController';
import IGetPostsUsecase from '../application/interfaces/usecases/post/IGetPosts.usecase';
import GetPostsUsecase from '../application/usecases/post/GetPosts.usecase';
import ILikePostUsecase from '../application/interfaces/usecases/post/ILikePost.usecase';
import LikePostUsecase from '../application/usecases/post/LikePost.usecase';
import CreatePostUseCase from '../application/usecases/post/CreatePost.usecase';
import IUnlikePostUsecase from '../application/interfaces/usecases/post/IUnlikePost.usecase';
import UnlikePostUsecase from '../application/usecases/post/UnlikePost.usecase';
import ICommentRepository from '../domain/interfaces/IComment.repository';
import CommentRepository from '../infrastructure/repositories/comment.repository';
import ICreateCommentUsecase from '../application/interfaces/usecases/comment/ICreateComment.usecase';
import CreateCommentUsecase from '../application/usecases/comment/CreateComment.usecase';
import IDeleteCommentUsecase from '../application/interfaces/usecases/comment/IDeleteComment.usecase';
import DeleteCommentUsecase from '../application/usecases/comment/DeleteComment.usecase';
import ICreateRecruiterUsecase from '../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase.FIX';
import CreateRecruiterUsecase from '../application/usecases/recruiter/CreateRecruiter.usecase.FIX';
import IJobRepo from '../domain/interfaces/IJobRepo';
import JobRepository from '../infrastructure/repositories/jobRepository';
import ICreateJobUseCase from '../application/interfaces/usecases/job/ICreateJob.usecase';
import CreateJobUseCase from '../application/usecases/job/CreateJob.usecase';
import ILoadRecruiterJobsUsecase from '../application/interfaces/usecases/job/ILoadRecruiterJobs.usecase';
import { LoadRecruiterJobsUsecase } from '../application/usecases/job/LoadRecruiterJobs.usecase';
import IEditJobUsecase from '../application/interfaces/usecases/job/IEditJob.usecase';
import EditJobUsecase from '../application/usecases/job/EditJob.usecase';
import IDeleteJobUsecase from '../application/interfaces/usecases/job/IDeleteJob.usecase';
import DeleteJobUsecase from '../application/usecases/job/DeleteJob.usecase';
import ILoadJobsAggregatedUsecase from '../application/interfaces/usecases/job/IloadJobsAggregated.usecase.FIX';
import LoadJobsAggregatedUsecase from '../application/usecases/job/LoadJobsAggregated.usecase.FIX';
import IFollowRepo from '../domain/interfaces/IFollowRepo';
import FollowRepository from '../infrastructure/repositories/FollowRepository';
import FollowController from '../presentation/controllers/followController';
import ICreateNotificationUsecase from '../application/interfaces/usecases/notification/ICreateNotification.usecase';
import CreateNotificationUsecase from '../application/usecases/shared/CreateNotification.usecase';
import IFollowUserUseCase from '../application/interfaces/usecases/follow/IFollowUser.usecase';
import FollowUseruseCse from '../application/usecases/follow/FollowUser.usecase';
import IAdminLoadUserDetailsUsecase from '../application/interfaces/usecases/user/IAdminLoadUsersDetails.usecase';
import IAdminBlockUserUsecase from '../application/interfaces/usecases/user/IAdminBlockUser.usecase.FIX';
import IAdminUnblockUserUsecase from '../application/interfaces/usecases/user/IAdminUnblockUser.usecase.FIX';
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
import GoogleLoginUseCase from '../application/usecases/user/GoogleLogin.usecase';
import OAuthController from '../presentation/controllers/oAuthController';
import IAdminDeleteUserUsecase from '../application/interfaces/usecases/user/IAdminDeleteUser.usecase';
import AdminDeleteUserUsecase from '../application/usecases/user/AdminDeleteUser.usecase';
import IAddSocialLinkUsecase from '../application/interfaces/usecases/user/IAddSocialLink.usecase.FIX';
import AddSocialLinkUseCase from '../application/usecases/user/AddSocialLink.usecase.FIX';
import IDeleteSocialLinkUseCase from '../application/interfaces/usecases/user/IDeleteSocialLink.usecase.FIX';
import DeleteSocialLinkUseCase from '../application/usecases/user/DeleteSocialLink.usecase.FIX';
import IEditProfileUseCase from '../application/interfaces/usecases/user/IEditProfile.usecase.FIX';
import EditProfileUseCase from '../application/usecases/candidate/EditProfile.usecase.FIX';
import IRealTimeEventEmitter from '../application/interfaces/services/IRealTimeEventEmitter';
import { RealTimeEventEmitterService } from '../infrastructure/services/RealTimeEventEmitterService';
import IGetUserSpecificNotificationUsecase from '../application/interfaces/usecases/notification/IGetUserSpecificNotifications.usecase';
import GetUserSpecificNotificationsUsecase from '../application/usecases/shared/GetUserSpecificNotifications.usecase';
import NotificationController from '../presentation/controllers/notificationController';
import INotificationRepo from '../domain/interfaces/INotificationRepo';
import NotificationRepository from '../infrastructure/repositories/notificationRepository';
import ILoadUserMetaDataUsecase from '../application/interfaces/usecases/user/ILoadUserMetaData.usecase.FIX';
// import LoadUserMetaData from '../application/usecases/user/LoadUserMetaData.usecase.FIX';
import IUnFollowUserUsercase from '../application/usecases/interfaces/IUnFollowUser.usecase';
import UnfollowUserUseCase from '../application/usecases/follow/UnfollowUser.usecase';
import IGetRecruiterApplicationsUsecase from '../application/interfaces/usecases/recruiter/IGetRecruiterApplications.usecase';
import GetRecruiterApplicationsUsecase from '../application/usecases/recruiter/GetRecruiterApplications.usecase';
import IRejectRecruiterApplication from '../application/interfaces/usecases/recruiter/IRejectRecruiterApplication.usecase.FIX';
import RejectRecruiterApplicationUsecase from '../application/usecases/recruiter/RejectRecruiterApplication.usecase';
import IApproveRecruiterApplicationUsecase from '../application/interfaces/usecases/recruiter/IApproveRecruiterApplication.usecase.FIXED';
import ApproveRecruiterApplicationUsecase from '../application/usecases/recruiter/ApproveRecruiterApplication.usecase.FIX';
import IGetJobDetailsUseCase from '../application/usecases/interfaces/IGetJobDetails.usecase.FIX';
import GetJobDetailsUseCase from '../application/usecases/job/GetJobDetails.usecase.FIX';
import ISaveJobUsecase from '../application/interfaces/usecases/savedJobs/ISaveJob.usecase.FIX';
import SaveJobUsecase from '../application/usecases/savedJob/SaveJob.usecase.FIX';
import ICheckIsJobSavedUseCase from '../application/interfaces/usecases/savedJobs/ICheckIsJobSaved.usecase.FIX';
import CheckIsJobSavedUseCase from '../application/usecases/savedJob/CheckIsJobSaved.usecase.FIX';
import IUnsaveJobUseCase from '../application/interfaces/usecases/savedJobs/IUnsaveJob.usecase.FIX';
import UnsaveJobUseCase from '../application/usecases/savedJob/UnsaveJob.usecase.FIX';
import IGetSavedJobsUsecase from '../application/interfaces/usecases/savedJobs/IGetSavedJobs.usecase.FIX';
import GetSavedJobsUsecase from '../application/usecases/savedJob/GetSavedJobs.usecase.FIX';
import IJobApplicationRepo from '../domain/interfaces/IJobApplicationRepo';
import JObApplicationRepository from '../infrastructure/repositories/JobApplicationRepository';
import IApplyJobUsecase from '../application/interfaces/usecases/jobApplication/IApplyJob.usecase.FIX';
import ApplyJobUsecase from '../application/usecases/jobApplication/ApplyJob.usecase.FIX';
import IResumeRepo from '../domain/interfaces/user/IResumeRepo';
import ResumeRepository from '../infrastructure/repositories/user/resumeRepository';
import IAddResumeUseCase from '../application/interfaces/usecases/resume/IAddResume.usecase.FIX';
import AddResumeUseCase from '../application/usecases/resume/AddResume.usecase.FIX';
import IGetMyApplicationsUsecase from '../application/interfaces/usecases/jobApplication/IGetMyApplications.usecase.FIX';
import GetMyApplicationsUsecase from '../application/usecases/jobApplication/GetMyApplications.usecase';
import IInterviewRepo from '../domain/interfaces/user/IInterviewRepo';
import InterviewRepository from '../infrastructure/repositories/user/interviewRepository';
import IScheduleInterviewUsecase from '../application/interfaces/usecases/interview/IScheduleInterview.usecase';
import ScheduleInterviewUsecase from '../application/usecases/interview/ScheduleInterview.usecase';
import IGetJobApplicationsUseCase from '../application/interfaces/usecases/jobApplication/IGetJobApplications.usecase';
import GetJobApplicationsUseCase from '../application/usecases/jobApplication/GetJobApplications.usecase';
import IUpdateCandidateNotes from '../application/interfaces/usecases/jobApplication/IUpdateCandidateNotes.usecase';
import UpdateCandidateNotesUsecase from '../application/usecases/jobApplication/UpdateCandidateNotes.usecase';
import IUpdateJobApplicationStatusUsecase from '../application/interfaces/usecases/jobApplication/IUpdateJobApplicationStatus.usecase';
import UpdateJobApplicationStatusUsecase from '../application/usecases/jobApplication/UpdateJobApplicationUsecase.usecase';
import ILoadResumeUseCase from '../application/interfaces/usecases/resume/ILoadResumes.usecase.FIX';
import LoadResumesUseCase from '../application/usecases/candidate/LoadResume.usecase.FIX';
import IDeleteResumeUseCase from '../application/usecases/candidate/interface/IDeleteResume.usecase.FIX';
import DeleteResumeUseCase from '../application/usecases/candidate/DeleteResume.usecase.FIX';
import IAddCertificateUseCase from '../application/interfaces/usecases/certificate/IAddCertificate.usecase.FIX';
import AddCertificateUseCase from '../application/usecases/certificate/AddCertificate.usecase.FIX';
import ILoadCertificateUseCase from '../application/interfaces/usecases/certificate/IGetCeritificates.usecase.FIX';
import GetCertificatesUseCase from '../application/usecases/certificate/GetCertificates.usecase.FIX';
import ICertificateRepo from '../domain/interfaces/user/ICertificateRepo';
import CertificateRepository from '../infrastructure/repositories/user/certificateRepository';
import IAdminLoadRecruitersUsecase from '../application/interfaces/usecases/recruiter/IAdminLoadRecruiters.usecase';
import IBlockRecruiterUsecase from '../application/interfaces/usecases/recruiter/IBlockRecruiter.usecase';
import BlockRecruiterUsecase from '../application/usecases/company/BlockComapny.usecase';
import IUnblockRecruiterUsecase from '../application/usecases/admin/interfaces/IUnblockCompany.usecase.FIX';
import UnblockRecruiterUsecase from '../application/usecases/company/UnblockComapny.usecase';
import IDeleteRecruiterUsecase from '../application/usecases/admin/interfaces/ICloseCompany.usecase';
import DeleteRecruiterUsecaase from '../application/usecases/company/CloseCompany.usecase.GARBAGE';
import ISkillSetsRepo from '../domain/interfaces/ISkillSetsRepo';
import SkillSetRepository from '../infrastructure/repositories/SkillSetRepository';
import IAdminAddSkillUsecase from '../application/interfaces/usecases/skill.admin/IAdminAddSkill.usecase';
import AdminAddSkillsUsecase from '../application/usecases/skill.admin/AdminAddSkill.usecase';
import IAdminUpdateSkillUsecase from '../application/interfaces/usecases/skill.admin/IAdminUpdateSkill.usecase';
import AdminUpdateSkillUsecase from '../application/usecases/skill.admin/AdminUpdateSkill.usecase';
import IAdminDeleteSkillUsecase from '../application/interfaces/usecases/skill.admin/IAdminDeleteSkill.usecase';
import AdminDeleteSkillsUsecase from '../application/usecases/skill.admin/AdminDeleteSkill.usecase';
import IAdminGetSkillsUsecase from '../application/interfaces/usecases/skill.admin/IAdminGetSkills.usecase';
import AdminGetSkillsUsecase from '../application/usecases/skill.admin/AdminGetSkills.usecase';
import ILoadRecruiterRecentJobs from '../application/interfaces/usecases/job/ILoadRecruiterRecentJobs.usecase';
import LoadRecruiterRecentJobsUsecase from '../application/usecases/job/LoadRecruiterRecentJobs.usecase';
import IDeleteCertificateUsecase from '../application/interfaces/usecases/certificate/IDeleteCertificate.usecase';
import DeleteCertificateUsecase from '../application/usecases/certificate/DeleteCertificate.usecase';
import ISetResumePrimaryUsecase from '../application/interfaces/usecases/resume/ISetResumePrimary.usecase';
import SetResumePrimaryUsecase from '../application/usecases/resume/SetResumePrimary.usecase';
import IBulckApproveRecruiterApplicationUsecase from '../application/interfaces/usecases/recruiter/IBulckApproveRecruiterApplication.usecase';
import BulckApproveRecruiterApplicationsUSecase from '../application/usecases/recruiter/BulckApproveRecruiterApplications.usecase';
import IGetUsersForPublicUsecase from '../application/interfaces/usecases/user/IGetUsersforPublic.usecase';
import GetUsersForPublicUsecase from '../application/usecases/user/GetUsersForPublic.usecase';
import ILoadMyProfileUsecase from '../application/interfaces/usecases/user/ILoadMyProfile.usecase.FIX';
import IAlertRepo from '../domain/interfaces/user/IAlertRepo';
import AlertRepository from '../infrastructure/repositories/user/alertRepository';
import IGetUserAlertsUsecase from '../application/interfaces/usecases/alerts/IGetUserAlerts.usecase';
import GetUserAlertsUsecase from '../application/usecases/alerts/GetUserAlerts.usecase';
import ILoadUserPublicProfileUsecase from '../application/interfaces/usecases/user/ILoadUserAggregatedProfile.usecase.FIX';
import LoadUserpublicProfileUsecase from '../application/usecases/user/LoadUserAggregatedProfile.usecase.FIX';
import IChangeNotificationStatusUsecase from '../application/interfaces/usecases/notification/IChangeNotificationStatus.usecase';
import ChangeNotificationStatusUsecase from '../application/usecases/shared/ChangeNotificationStatus.usecase';
import ISoftDeleteNotificationUsecase from '../application/interfaces/usecases/notification/ISoftDeleteNotification.usecase';
import SoftDeleteNotificationUsecase from '../application/usecases/shared/SoftDeleteNotification.usecase';
import IConnectionRequestRepository from '../domain/interfaces/IConnectionRequest.repo';
import ConnectionRequestRepository from '../infrastructure/repositories/user/connectionRequest.repository';
import ISendConnectionRequestUsecase from '../application/interfaces/usecases/connection/ISendConnectionRequest.usecase';
import { SendConnectionRequestUsecase } from '../application/usecases/connection/SendConnectionRequest.usecase';
import IRejectConnectionRequestUsecase from '../application/interfaces/usecases/connection/IRejectConnectionRequest.usecase';
import RejectConnectionRequestUsecase from '../application/usecases/connection/RejectConnectionRequest.usecase';
import ICancelConnectionRequestUsecase from '../application/interfaces/usecases/connection/ICancelConnectionRequest.usecase';
import CancelConnectionRequestUsecase from '../application/usecases/connection/CancelConnectionRequest.usecase';
import IAcceptConnectionRequestUsecase from '../application/interfaces/usecases/connection/IAcceptConnectionRequest.usecase';
import AcceptConnectionRequestUsecase from '../application/usecases/connection/AcceptConnectionRequest.usecase';
import IConversationRepo from '../domain/interfaces/user/IConversationRepo';
import ConversationRepository from '../infrastructure/repositories/user/conversationRepository';
import ChatController from '../presentation/controllers/chatController';
import IGetConversationsUsecase from '../application/interfaces/usecases/conversation/IGetConversations.usecase';
import GetconversationsUsecase from '../application/usecases/conversation/GetConversations.usecase';
import IInitializeConversation from '../application/interfaces/usecases/conversation/IInitializeConversation.usecase';
import InitializeConversationUsecase from '../application/usecases/conversation/InitializeConversation.usecase';
import IChatRepository from '../domain/interfaces/user/IChatRepo';
import ChatRepository from '../infrastructure/repositories/user/chatRepository';
import IGetchatsUsecase from '../application/interfaces/usecases/chat/IGetChats.usecase';
import GetChatsUsecase from '../application/usecases/chat/GetChats.usecase';
import UserMapper from '../application/mappers/user/User.mapperClass';
import LoadUserMetaDataUsecase from '../application/usecases/user/LoadUserMetaData.usecase.FIX';
import CertificateMapper from '../application/mappers/certificate/Certificate.mapperClass';
import ResumeMapper from '../application/mappers/resume/Resume.mapperClass';
import { ExperienceMapper } from '../application/mappers/experience/Experience.mapperClass';
import EducationMapper from '../application/mappers/education/Education.mapperClass';
import { SkillsMapper } from '../application/mappers/skill.user/Skill.mapperClass';
import IAdminPermanentBanUserUsecase from '../application/interfaces/usecases/user/IAdminPermanentBanUser.usecase';
import AdminPermanentBanUserUsecase from '../application/usecases/user/AdminPermanentBanUser.usecase';
import IAdminResetUserPasswordUsecase from '../application/interfaces/usecases/user/IAdminResetUserPassword.usecase';
import AdminResetUserPasswordUsecase from '../application/usecases/user/AdminResetUserPassword.usecase';
import IAdminRequestResetUserPasswordUsecase from '../application/interfaces/usecases/admin/IAdminRequestRestPassword.usecase';
import AdminRequestResetUserPasswordUsecase from '../application/usecases/admin/AdminRequestResetUserPassword.usecase';
import ILikePostCommentUsecase from '../application/interfaces/usecases/comment/ILikePostComment.usecase';
import LikeCommentUsecase from '../application/usecases/comment/LikeComment.usecase';
import IUnlikeCommentUsecase from '../application/interfaces/usecases/comment/IUnlikeComment.usecase';
import UnlikeCommentUsecase from '../application/usecases/comment/UnlikeComment.usecase';
import IDeletePostUsecase from '../application/interfaces/usecases/post/IDeletePost.usecase';
import DeletePostUsecase from '../application/usecases/post/DeletePost.usecase';
import { IHidePostUsecase } from '../application/interfaces/usecases/user/IHidePost.usecase';
import HidePostUsecase from '../application/usecases/post/HidePost.usecase';
import { IUnHidePostUsecase } from '../application/interfaces/usecases/user/IUnHidePost.usecase';
import UnHidePostUsecase from '../application/usecases/post/UnHidePost.usecase';
import ISavePostRepo from '../domain/interfaces/user/ISavePostRepo';
import SavePostRepository from '../infrastructure/repositories/user/savePostRepository';
import IToggleSavePostUsecase from '../application/interfaces/usecases/savedPost/IToggleSavePost.usecase';
import ToggleSavePostUsecase from '../application/usecases/savedPost/ToggleSavePost.usecase';
import ICompanyRepo from '../domain/interfaces/ICompanyRepo';
import CompanyRepository from '../infrastructure/repositories/companyRepository';
import IGetCompanyListUsecase from '../application/interfaces/usecases/company/IGetCompanyList.usecase';
import GetCompanyListUsecase from '../application/usecases/company/GetCompanyList.usecase';
import CompanyController from '../presentation/controllers/companyController';
import FollowMapper from '../application/mappers/follow/Follow.mapperClass';
import IGetUnReadNotificationsCountUsecase from '../application/interfaces/usecases/notification/IGetUnreadNotificationsCount.usecase';
import GetUnReadNotificationsCountUsecase from '../application/usecases/shared/GetUnReadNotificationCount.usecase';
import IMarkReadAllNotificationsUsecase from '../application/interfaces/usecases/notification/IMarkReadAllNotifications.usecase';
import MarkReadAllNotifications from '../application/usecases/notifications/MarkReadAllNotification.usecase';
import { IDeleteNotificationsUsecase } from '../application/interfaces/usecases/notification/IDeleteAllNotifications.usecase';
import DeleteNotificationsUsecase from '../application/usecases/notifications/DeleteNotificationsUsecase';
import NotificationMapper from '../application/mappers/notification/Notification.mapperClass';
import CompanyMapper from '../application/mappers/company/Company.mapperClass';
import IAddCompanyUsecase from '../application/interfaces/usecases/company/IAddCompnay.usecase';
import AddCompanyUsecase from '../application/usecases/company/AddCompany.usecase';
import IGetcompaniesBySuggesionUsecase from '../application/interfaces/usecases/company/IGetCompaniesBySuggession.usecase';
import GetCompanySuggesionUsecase from '../application/usecases/company/GetCompaniesSuggesion.usecase';
import RecruiterMapper from '../application/mappers/recruiter/Recruiter.mapperClass';
import IAdminLoadRecruiterDetailsUsecase from '../application/interfaces/usecases/recruiter/IAdminLoadRecruiterDetails.usecase';
import AdminLoadRecruiterDetailsUsecase from '../application/usecases/recruiter/AdminLoadRecruiterDetails.usecase';
// import IAdminReoveRecruiterPermission from '../application/interfaces/usecases/recruiter/IAdminRevokeRecruiterVerification.usecase';
import IAdminRevokeRecruiterVerification from '../application/interfaces/usecases/recruiter/IAdminRevokeRecruiterVerification.usecase';
import AdminRevokeRecruiteerVerificationUsecase from '../application/usecases/recruiter/AdminRevokeRecruiterVerification.usecase';
import IAdminHandlePermissionRevokingUsecase from '../application/interfaces/usecases/recruiter/IAdminHandlePermissionRevoking.usecase';
import AdminHandlePermissionRevoking from '../application/usecases/recruiter/AdminHandlePermissionRevoking.usecase';
import IWorkModeRepository from '../domain/interfaces/admin/IWorkMode.repo';
import WorkModeRepository from '../infrastructure/repositories/admin/workMode.repository';
import WorkModeMapper from '../application/mappers/workMode.admin/WorkMode.mapperClass';
import IAdminAddWorkModeUsecase from '../application/interfaces/usecases/workMode.admin/IAdminAddWorkMode.usecase';
import AdminAddWorkModeUsecase from '../application/usecases/workMode.admin/AdminAddWorkMode.usecase';
import { IAdminGetWorkModesUsecase } from '../application/interfaces/usecases/workMode.admin/IAdminGetWorkModes.usecase';
import AdminGetWorkModesUsecase from '../application/usecases/workMode.admin/AdminGetWorkModes.usecase';
import { IAdminChangeWorkModeStatusUsecase } from '../application/interfaces/usecases/workMode.admin/IAdminChangeWorkmodeStatus.usecase';
import AdminChangeWorkmodeUsecase from '../application/usecases/workMode.admin/AdminChangeWorkmode.usecase';
import IAdminDeleteWorkModeUsecase from '../application/interfaces/usecases/workMode.admin/IAdminDeleteWorkMode.usecase';
import AdminDeleteWorkModeUsecase from '../application/usecases/workMode.admin/AdminDeleteWorkMode.usecase';
import IAdminEditWorkModeUsecase from '../application/interfaces/usecases/workMode.admin/IAdminEditWorkMode.usecase';
import AdminEditWorkModeUsecase from '../application/usecases/workMode.admin/AdminEditWorkMode.usecase';
import IJobLevelRepository from '../domain/interfaces/admin/IJobLevel.repository';
import JobLevelRepository from '../infrastructure/repositories/admin/jobLevel.repository';
import JobLevelMapper from '../application/mappers/jobLevel/JobLevel.mapperClass';
import IAdminAddJobLevelUsecase from '../application/interfaces/usecases/jobLevel.admin/IAdminAddJobLevel.usecase';
import AdminAddJobLevelUsecase from '../application/usecases/jobLevel.admin/AdminAddJobLevel.usecase';
import IAdminGetJobLevelsUsecase from '../application/interfaces/usecases/jobLevel.admin/IAdminGetJobLevel.usecase';
import AdminGetJobLevelsUsecase from '../application/usecases/jobLevel.admin/AdminGetJobLevels.usecase';
import IAdminEditJobLevelUsecase from '../application/interfaces/usecases/jobLevel.admin/IAdminEditJobLevel.usecase';
import AdminEditJobLevelUsecase from '../application/usecases/jobLevel.admin/AdminEditJobLevel.usecase';
import IAdminChangeJobLevelStatusUsecase from '../application/interfaces/usecases/jobLevel.admin/IAdminChangeJobLevelStatus.usecase';
import AdminChangeJobLevelStatus from '../application/usecases/jobLevel.admin/AdminChangeJobLevelStatus.usecase';
import IAdminDeleteJobLevelUsecase from '../application/interfaces/usecases/jobLevel.admin/IAdminDeleteJobLevel.usecase';
import AdminDeleteJobLevelUsecase from '../application/usecases/jobLevel.admin/AdminDeleteJobLevel.usecase';
import IJobTypeRepository from '../domain/interfaces/admin/IJobType.repository';
import JobTypeRepository from '../infrastructure/repositories/admin/jobType.repository';
import JobTypeMapper from '../application/mappers/jobType/JobType.mapperClass';
import IAdminAddJobTypeUsecase from '../application/interfaces/usecases/jobType.admin/IAdminAddJobType.usecase';
import AdminAddJobTypeUsecase from '../application/usecases/jobType.admin/AdminAddJobType.usecase';
import IAdminUpdateJobTypeUse from '../application/interfaces/usecases/jobType.admin/IAdminUpdateJobType.usecase';
import AdminUpdateJobTypeUsecase from '../application/usecases/jobType.admin/AdminUpdateJobType.usecase';
import IAdminChangeJobTypeStatusUsecase from '../application/interfaces/usecases/jobType.admin/IAdminChangeJobTypeStatus.usecase';
import AdminChangeJobTypeStatusUsecase from '../application/usecases/jobType.admin/AdminChangeJobTypeStatus.usecase';
import IAdminGetJobTypesUsecase from '../application/interfaces/usecases/jobType.admin/IAdminGetJobType.usecase';
import AdminGetJobTypesUsecase from '../application/usecases/jobType.admin/AdminGetJobTypes.usecase';
import IAdminDeleteJobTypeUsecase from '../application/interfaces/usecases/jobType.admin/IAdminDeleteJobType.usecase';
import AdminDeleteJobTypeUsecase from '../application/usecases/jobType.admin/AdminDeleteJobType.usecase';
import IAdminChangeRecruiterApplicationStatusToUnderReview from '../application/interfaces/usecases/recruiter/IAdminChangeRecruiterApplicationStatusToUnderReview.usecase';
import AdminChangeRecruiterApplicationStatusToUnderReview from '../application/usecases/recruiter/IAdminChangeRecruiterApplicationStatusToUnderReview.usecase';
import IGetJobTypeListUsecase from '../application/interfaces/usecases/jobType.admin/IGetJobTypeLists.usecase';
import GetJobTypeListsUsecase from '../application/usecases/jobType.admin/GetJobTypeLists.usecase';
import IGetJobLevelListsUsecase from '../application/interfaces/usecases/jobLevel.admin/IGetJobLevelLists.usecase';
import GetJobLevelListsUsecase from '../application/usecases/jobLevel.admin/GetJobLevelList.usecase';
import IGetWorkModeListsUsecase from '../application/interfaces/usecases/workMode.admin/IGetWorkModeLists.usecase';
import GetWorkModesListUsecase from '../application/usecases/workMode.admin/GetWorkModeLists.usecase';
import JobMapper from '../application/mappers/job/Job.mapperClass';
import ILoadJobsUseCase from '../application/interfaces/usecases/job/IAdminLoadJobs.usecase';
import LoadJobsUseCase from '../application/usecases/job/AdminLoadJobs.usecase';
import IAdminLoadJobDetailsUseCase from '../application/usecases/admin/interfaces/ILoadJobDetails.usecase';
import { AdminLoadJobDetailsUseCase } from '../application/usecases/job/LoadJobDetails.usecase';
import IAdminDeleteJobUsecase from '../application/interfaces/usecases/job/IAdminDeleteJob.usecase';
import AdminDeleteJobUsecase from '../application/usecases/job/AdminDeleteJob.usecase';
import JobController from '../presentation/controllers/jobController';
import ISearchJobsFromHomeUseCase from '../application/usecases/interfaces/ISearchJobsFromHome.usecase';
import SearchJobsFromHomeUseCase from '../application/usecases/job/SearchJobsFromHome.usecase';
import JobApplicationMapper from '../application/mappers/jobApplication/JobApplication.mapperClass';
import ICheckIsJobApplied from '../application/interfaces/usecases/jobApplication/ICheckJobApplied.usecase';
import CheckIsJobAppliedUsecase from '../application/usecases/jobApplication/CheckIsJobApplied.usecase';
import SavedJobsMapper from '../application/mappers/job/SavedJob.mapperClass';
import IGetJobApplicationDetailsUseCase from '../application/interfaces/usecases/jobApplication/IGetJobApplicationDetails.usecase';
import GetJobApplicationDetailsUseCase from '../application/usecases/jobApplication/GetJobApplicationDetails.usecase';
import IGetIndividualRecruiterApplicationDetailsUsecase from '../application/interfaces/usecases/recruiter/IGetIndividualRecruiterApplicationDetails.usecase';
import GetIndividualRecruiterApplicationDetailsUsecase from '../application/usecases/recruiter/GetIndividualRecruiterApplicationDetails.usecase';
import ILoadRecruiterJobDetailsUsecase from '../application/interfaces/usecases/job/ILoadRecruiterJobDetails.usecase';
import LoadRecruiterJobDetailsUsecase from '../application/usecases/job/LoadRecruiterJobDetails.usecase';
import { IAdminDeleteRecruiterDataUsecase } from '../application/interfaces/usecases/recruiter/IAdminDeleteRecruiterData.usecase';
import AdminDeleteRecruiterDataUsecase from '../application/usecases/recruiter/AdminDeleteRecruiterData.usecase';
// import IAdminFlagJobUsecase from '../application/interfaces/usecases/job/IAdminToggleFlagJob.usecase';
// import AdminFlagJobPostUsecase from '../application/usecases/job/AdminToggleFlagJob.usecase';
import IAdminToggleFlagJobUsecase from '../application/interfaces/usecases/job/IAdminToggleFlagJob.usecase';
import AdminToggleFlagJobUsecase from '../application/usecases/job/AdminToggleFlagJob.usecase';
import IBlockJobUseCase from '../application/interfaces/usecases/job/IBlockJob.usecase';
import { BlockJobUseCase } from '../application/usecases/job/BlockJob.usecase';
import IUnblockJobUseCase from '../application/interfaces/usecases/job/IUnblockJob.usecase';
import { UnblockJobUseCase } from '../application/usecases/job/UnblockJob.usecase';
import { ITrackMyJobApplicationDetailsUsecase } from '../application/interfaces/usecases/jobApplication/ITrackMyJobApplicationDetails.usecase';
import TrackMyJobApplicationDetailsUsecase from '../application/usecases/jobApplication/TrackMyJobApplicationDetails.usecase';
import { IGetMyScheduledInterviewsUsecase } from '../application/interfaces/usecases/interview/IGetMyScheduledInterviews.usecase';
import GetMyScheduledInterviewsUsecase from '../application/usecases/interview/GetMyScheduledInterviews.usecase';
import IWithdrawApplicationUsecase from '../application/interfaces/usecases/jobApplication/IWithdrawApplication.usecase';
import WithdrawApplicationUsecase from '../application/usecases/jobApplication/WithdrawApplication.usecase';
import ExperienceController from '../presentation/controllers/experienceController';
import EducationController from '../presentation/controllers/educationController';
import { SkillController } from '../presentation/controllers/skillController';
import CertificateController from '../presentation/controllers/certificateController';
import { ResumeController } from '../presentation/controllers/resumeController';
import WorkModeController from '../presentation/controllers/workModeController';
import JobLevelController from '../presentation/controllers/jobLevelController';
import JobTypeController from '../presentation/controllers/jobTypeController';
import AdminSkillSetMapper from '../application/mappers/skill.admin/skillset.mapperClass';
import IGetFollowersUsecase from '../application/interfaces/usecases/follow/IGetFollowers.usecase';
import GetFollowersUseCase from '../application/usecases/follow/GetFollowers.usecase';
import IRemoveAFollowerUsecase from '../application/interfaces/usecases/follow/IRemoveAFollower.usecase';
import RemoveAFollowerUsecase from '../application/usecases/follow/RemoveAFollower.usecase';
import { IGetFollowingsUsecase } from '../application/interfaces/usecases/follow/IGetFollowingsUsecase';
import { GetFollowingsUsecase } from '../application/usecases/follow/GetFollowingsUsecase';
import AlertsController from '../presentation/controllers/alertsController';
import AlertMapper from '../application/mappers/alert/Alert.mapperClass';
import { IGetUnreadAlertsCountUsecase } from '../application/interfaces/usecases/alerts/IGetUnreadAlerts.usecase';
import { GetUnreadAlertsUsecase } from '../application/usecases/alerts/GetUreadAlertsCount.usecase';
import ConnectionRequestMapper from '../application/mappers/user/ConnectionRequest.mapperClass';
import IGetConnectionsUsecase from '../application/interfaces/usecases/connection/IGetConnections.usecase';
import GetConnectionsUsecase from '../application/usecases/connection/GetConnections.usecase';
import { ConnectionController } from '../presentation/controllers/connectionController';
import { IGetSimilarUserUsecase } from '../application/interfaces/usecases/user/IGetSimilarUsers.usecase';
import GetSimlarUsersSuggesionUsecase from '../application/usecases/user/GetSimilarUser.usecase';
import IGetRecommendedJobsUsecase from '../application/interfaces/usecases/job/IGetRecommendedJobs.usecase';
import RecommendedJobUsecase from '../application/usecases/job/GetRecommendedJob.usecase';
import IDeleteChatUsecase from '../application/interfaces/usecases/chat/IDeleteChat.usecase';
import DeletechatUsecase from '../application/usecases/chat/DeleteChat.usecase';
import IDeleteChatForMeUsecase from '../application/interfaces/usecases/chat/IDeleteChatForMe.usecase';
import DeleteChatForMeUsecase from '../application/usecases/chat/DeleteChatForMe.usecase';
import { IPlanRepository } from '../domain/interfaces/plan/IPlanRepository';
import { PlanRepository } from '../infrastructure/repositories/plan/plan.repository';
import { PlanMapper } from '../application/mappers/plan/plan.mapperClass';
import ICreatePlanUsecase from '../application/interfaces/usecases/plan/ICreatePlan.usecase';
import CreatePlanUsecase from '../application/usecases/plan/CreatePlan.usecase';
import IAdminGetPlansUsecase from '../application/interfaces/usecases/plan/IAdminGetPlans.usecase';
import AdminGetPlansUsecase from '../application/usecases/plan/AdminGetPlans.usecase';
import IAdminDeletePlanUsecase from '../application/interfaces/usecases/plan/IAdminDeletePlan.usecase';
import AdminDeletePlanUsecase from '../application/usecases/plan/AdminDeletePlan.usecase';
import IAdminEditPlanUsecase from '../application/interfaces/usecases/plan/IAdminEditPlan.usecase';
import AdminEditplanUsecase from '../application/usecases/plan/AdminEditPlan.usecase';
import { IAdminTogglePlanListingUsecase } from '../application/interfaces/usecases/plan/IAdminTogglePlanListing.usecase';
import AdminTogglePlanListingUsecase from '../application/usecases/plan/AdminTogglePlanListing.usecase';
import IGetPlansForUserUsecase from '../application/interfaces/usecases/plan/IGetPlansForUsers.use ase';
import GetPlansForUsersUsecase from '../application/usecases/plan/GetPlansForUsers.usecase';
import ISubscriptionRepo from '../domain/interfaces/plan/ISubscriptionRepo';
import SubscriptionRepository from '../infrastructure/repositories/plan/subscriptionRepository';
import UserSubscribeFreePlanUsecase from '../application/usecases/subscription/User.subscribe.frePlan.usecase';
import IUserSubscribeFreePlanUsecase from '../application/interfaces/usecases/subscription/IUser.subscribe.freePlan.usecase';
import IHandleWebhookUsecase from '../application/interfaces/usecases/subscription/IHandleWebhookUsecase';
import HandleWebhookUsecase from '../application/usecases/subscription/HandleWebhook.usecase';
import IUserSubscribePaidPlanUsecase from '../application/interfaces/usecases/subscription/IUser.subscribe.paidePlan.usecase';
import UserSubscribePaidPlanUsecase from '../application/usecases/subscription/User.subscribe.paidPlan.usecase';
import IGetSessionDetailsUsecase from '../application/interfaces/usecases/subscription/IGetSessionDetails.usecase';
import GetSessionDetailsUsecase from '../application/DTOs/subscription/GetSessionDetails.usecase';
import IAdminGetAnalyticsUsecase from '../application/interfaces/usecases/plan/IGetAdminAnalytics.usecase';
import AdminGetAnalyticsUsecase from '../application/usecases/plan/AdminGetAnalytics.usecase';
import ILoadMySubscriptionDetailsUsecase from '../application/interfaces/usecases/subscription/ILoadMySubscriptionDetails.usecase';
import LoadMySubscriptionDetailsUsecase from '../application/usecases/subscription/LoadMySubscriptionDetails.usecase';
import IGetUserInvoicesUsecase from '../application/interfaces/usecases/subscription/IGetUserInvoices.usecase';
import GetUserInvoicesUsecase from '../application/usecases/subscription/GetUserInvoices.usecase';
import ISubscriptionPortalUsecase from '../application/interfaces/usecases/subscription/ISubscriptionPortal.usecase';
import SubscriptionPortalUsecase from '../application/usecases/subscription/SubscriptionPortal.usecase';
import IGetPaymentMethodsUsecase from '../application/interfaces/usecases/subscription/IGetPaymentMethods.usecase';
import GetPaymentMethodsUsecase from '../application/usecases/subscription/GetPaymentMethods.usecase';
import ILoadUserDetailsForResumeBuildingUsecase from '../application/interfaces/usecases/user/ILoadUserDetailsForResumeBuidling.usecase';
import LoadUserFullProfileForResumeBuidlingUsecase from '../application/usecases/user/LoadUserFullProfileForResumeBuilding.usecase';
import IAiServices from '../application/interfaces/services/IAiServices';
import AiServices from '../infrastructure/services/AiServices';
import IAnalyzeResumeUsecase from '../application/interfaces/usecases/AI/IAnalyzeResume.ai.usecase';
import AnalyzeResumeUsecase from '../application/usecases/AI/AnalyzeResume.ai.usecase.ts';
import IAnalyzeResumeDetailedUsecase from '../application/interfaces/usecases/AI/IAnalyzeResumeDetailed.usecase';
import AnalyzeResumeDetailedUsecase from '../application/usecases/AI/AiAnalyzeResumeDetailed.usecase';
import IAiInterviewUsecase from '../application/interfaces/usecases/AI/IAiInterview.usecase';
import AiInterviewUsecase from '../application/usecases/AI/AiInterview.usecase';
import IInterviewAiResultRepo from '../domain/entities/interview/interview.ai.result.repo';
import InterviewAIResultRepository from '../infrastructure/repositories/user/interview.ai.result.repository';
import InterviewAIMapper from '../application/mappers/Interview-AI/InterviewAi.mapperClass';
import ILoadInterviewDashboardUsecase from '../application/interfaces/usecases/AI/ILoadInterviewDashboard.usecase';
import LoadInterviewDashboard from '../application/usecases/AI/LoadInterviewDashboard.usecase';
import IUpdateProfileViewUsecase from '../application/interfaces/usecases/user/IUpdateProfileView.usecase';
import UpdateProfileViewUsecase from '../application/usecases/user/UpdateProfileView.usecase';

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
container.registerSingleton<IInterviewAiResultRepo>(
  'IInterviewAiResultRepository',
  InterviewAIResultRepository
);
container.registerSingleton<IChatRepository>('IChatRepository', ChatRepository);
container.registerSingleton<IConversationRepo>('IConversationRepository', ConversationRepository);
container.registerSingleton<IJobApplicationRepo>(
  'IJobApplicationRepository',
  JObApplicationRepository
);
container.registerSingleton<IGetSimilarUserUsecase>(
  'IGetSimilarUser',
  GetSimlarUsersSuggesionUsecase
);
container.registerSingleton<ICertificateRepo>('ICertificateRepository', CertificateRepository);
container.registerSingleton<IResumeRepo>('IResumeRepository', ResumeRepository);
container.registerSingleton<IInterviewRepo>('IInterviewRepository', InterviewRepository);
container.registerSingleton<ISavePostRepo>('ISavePostRepository', SavePostRepository);
container.registerSingleton<ICompanyRepo>('ICompanyRepository', CompanyRepository);
container.registerSingleton<IWorkModeRepository>('IWorkModeRepository', WorkModeRepository);
container.registerSingleton<IJobLevelRepository>('IJobLevelRepository', JobLevelRepository);
container.registerSingleton<IJobTypeRepository>('IJobTypeRepository', JobTypeRepository);
container.registerSingleton<IPlanRepository>('IPlanRepository', PlanRepository);
container.registerSingleton<ISubscriptionRepo>('ISubscriptionRepository', SubscriptionRepository);

container.registerSingleton<IGetchatsUsecase>('IGetChatsUsecase', GetChatsUsecase);
//register usecase
container.registerSingleton<IAdminLoginUseCase>('IAdminLoginUseCase', AdminLoginUseCase);
container.registerSingleton<ILoadUsersAdminUseCase>(
  'ILoadUsersAdminUsecase',
  LoadUsersAdminUsecase
);
container.registerSingleton<ILoadMySubscriptionDetailsUsecase>(
  'ILoadMySubscriptionDetails',
  LoadMySubscriptionDetailsUsecase
);
container.registerSingleton<IGetUserInvoicesUsecase>(
  'IGetUserInvoicesUsecase',
  GetUserInvoicesUsecase
);
container.registerSingleton<ISubscriptionPortalUsecase>(
  'ISubscriptionPortalUsecase',
  SubscriptionPortalUsecase
);
container.registerSingleton<IGetPaymentMethodsUsecase>(
  'IGetPaymentMethodsUsecase',
  GetPaymentMethodsUsecase
);

container.registerSingleton<ILoadUserDetailsForResumeBuildingUsecase>(
  'ILoadusersFullDetailsForResumeBuilding',
  LoadUserFullProfileForResumeBuidlingUsecase
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
container.registerSingleton<IUpdateProfileViewUsecase>(
  'IUpdateProfileViewUsecase',
  UpdateProfileViewUsecase
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
container.registerSingleton<ILoadRecruiterJobDetailsUsecase>(
  'ILoadRecruiterJobDetailsUsecase',
  LoadRecruiterJobDetailsUsecase
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
container.registerSingleton<IGetIndividualRecruiterApplicationDetailsUsecase>(
  'IGetIndividualRecruiterApplicationDetailsUsecase',
  GetIndividualRecruiterApplicationDetailsUsecase
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

// container.registerSingleton<ILoginRecruiterrUseCase>(
//   'ILoginRecruiterUseCase',
//   LoginRecruiterUseCase
// );
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
container.registerSingleton<IAdminDeleteRecruiterDataUsecase>(
  'IAdminDeleteRecruiterDataUsecase',
  AdminDeleteRecruiterDataUsecase
);
container.registerSingleton<IAdminToggleFlagJobUsecase>(
  'IAdminToggleFlagJobUsecase',
  AdminToggleFlagJobUsecase
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
container.registerSingleton<IBlockJobUseCase>('IBlockJobUsecase', BlockJobUseCase);
container.registerSingleton<IUnblockJobUseCase>('IUnblockJobUsecase', UnblockJobUseCase);
container.registerSingleton<ITrackMyJobApplicationDetailsUsecase>(
  'ITrackMyJobApplicationDetailsUsecase',
  TrackMyJobApplicationDetailsUsecase
);
container.registerSingleton<IGetMyScheduledInterviewsUsecase>(
  'IGetMyInterviews',
  GetMyScheduledInterviewsUsecase
);
container.registerSingleton<IWithdrawApplicationUsecase>(
  'IWithdrawApplicationUsecase',
  WithdrawApplicationUsecase
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
container.registerSingleton<IGetFollowersUsecase>('IGetFollowersUsecase', GetFollowersUseCase);
container.registerSingleton<IGetFollowingsUsecase>('IGetFollowingsUsecase', GetFollowingsUsecase);
container.registerSingleton<IGetUnreadAlertsCountUsecase>(
  'IGetUnreadAlertsCountUsecase',
  GetUnreadAlertsUsecase
);
container.registerSingleton<IRemoveAFollowerUsecase>(
  'IRemoveAFollowerUsecase',
  RemoveAFollowerUsecase
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
container.registerSingleton<ICreatePlanUsecase>('ICreatePlanUsecase', CreatePlanUsecase);
container.registerSingleton<IAdminGetPlansUsecase>('IAdminGetPlanUsecase', AdminGetPlansUsecase);
container.registerSingleton<IAdminDeletePlanUsecase>(
  'IAdminDeletePlanUsecase',
  AdminDeletePlanUsecase
);
container.registerSingleton<IAdminEditPlanUsecase>('IAdminEditPlanUsecase', AdminEditplanUsecase);
container.registerSingleton<IAdminTogglePlanListingUsecase>(
  'IAdminTogglePlanListingUsecase',
  AdminTogglePlanListingUsecase
);
container.registerSingleton<IHandleWebhookUsecase>('IHandleWebhookUsecase', HandleWebhookUsecase);
container.registerSingleton<IAdminChangeJobTypeStatusUsecase>(
  'IAdminChangeJobTypeStatusUsecase',
  AdminChangeJobTypeStatusUsecase
);
container.registerSingleton<IAdminGetJobTypesUsecase>(
  'IAdminGetJobTypesUsecase',
  AdminGetJobTypesUsecase
);
container.registerSingleton<IAnalyzeResumeUsecase>('IAnalyzeResumeUsecase', AnalyzeResumeUsecase);
container.registerSingleton<IAnalyzeResumeDetailedUsecase>(
  'IAnalyzeResumeDetailsUsecase',
  AnalyzeResumeDetailedUsecase
);
container.registerSingleton<IAiInterviewUsecase>('IAiInterviewUsecase', AiInterviewUsecase);
container.registerSingleton<IAdminDeleteJobTypeUsecase>(
  'IAdminDeleteJobTypeUsecase',
  AdminDeleteJobTypeUsecase
);
container.registerSingleton<IGetConnectionsUsecase>(
  'IGetConnectionsUsecase',
  GetConnectionsUsecase
);
container.registerSingleton<IGetRecommendedJobsUsecase>(
  'IRecommendedJobsUsecase',
  RecommendedJobUsecase
);
container.registerSingleton<IDeleteChatUsecase>('IDeleteChatUsecase', DeletechatUsecase);
container.registerSingleton<IDeleteChatForMeUsecase>(
  'IDeleteChatForMeUsecase',
  DeleteChatForMeUsecase
);
container.registerSingleton<ILoadInterviewDashboardUsecase>(
  'ILoadInterviewDashboardUsecase',
  LoadInterviewDashboard
);
container.registerSingleton<IGetPlansForUserUsecase>(
  'IGetPlansForUsersUsecase',
  GetPlansForUsersUsecase
);
container.registerSingleton<IAdminGetAnalyticsUsecase>(
  'IAdminGetAnalyticsUsecase',
  AdminGetAnalyticsUsecase
);
container.registerSingleton<IUserSubscribeFreePlanUsecase>(
  'IUserSubscribeFreePlanUsecase',
  UserSubscribeFreePlanUsecase
);
container.registerSingleton<IUserSubscribePaidPlanUsecase>(
  'IUserSubscribePaidPlanUsecase',
  UserSubscribePaidPlanUsecase
);
container.registerSingleton<IGetSessionDetailsUsecase>(
  'IGetSessionDetailsUsecase',
  GetSessionDetailsUsecase
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
container.registerSingleton(ExperienceController);
container.registerSingleton(EducationController);
container.registerSingleton(SkillController);
container.registerSingleton(CertificateController);
container.registerSingleton(ResumeController);
container.registerSingleton(WorkModeController);
container.registerSingleton(JobLevelController);
container.registerSingleton(JobTypeController);
container.registerSingleton(AlertsController);
container.registerSingleton(ConnectionController);

//register other services
container.registerSingleton<IEmailService>('IEmailService', EmailService); //email service
container.registerSingleton<ICloudStroageService>('ICloudStorageService', CloudStorageService);
container.registerSingleton<IDataHashService>('IDataHashService', DataHashService);
container.registerSingleton<IGoogleAuthService>('IGoogleAuthService', GoogleAuthService);
container.registerSingleton<IRealTimeEventEmitter>(
  'IRealTimeEventEmitter',
  RealTimeEventEmitterService
);
container.registerSingleton<IAiServices>('IAiServices', AiServices);

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
container.registerSingleton('AdminSkillMapper', AdminSkillSetMapper);
container.registerSingleton('SavedJobsMapper', SavedJobsMapper);
container.registerSingleton('AlertsMapper', AlertMapper);
container.registerSingleton('ConnectionRequestMapper', ConnectionRequestMapper);
container.registerSingleton('PlanMapper', PlanMapper);
container.registerSingleton('InterviewAIMapper', InterviewAIMapper);

//register socket
