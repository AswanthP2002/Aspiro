import { container } from 'tsyringe';
import IUserRepository from '../domain/interfaces/IUserRepo';
import UserRepository from '../infrastructure/repositories/userRepository';
import IAdminLoginUseCase from '../application/interfaces/usecases/admin/IAdminLogin.usecase';
import { AdminLoginUseCase } from '../application/usecases/admin/AdminLogin.usecase';
import { AdminController } from '../presentation/controllers/adminController';
import ICandidateRepo from '../domain/interfaces/candidate/ICandidateRepo';
import CandidateRepository from '../infrastructure/repositories/candidate/candidateRepository';
import ILoadCandidateUseCase from '../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase';
import ILoadCandidateDetailsUseCase from '../application/usecases/admin/interfaces/ILoadCandidateDetails.usecase';
import { LoadCandidateDetailsUseCase } from '../application/usecases/admin/LoadCandidateDetails.usecase';
import IBlockCandidateUseCase from '../application/usecases/admin/interfaces/IBlockCandidate.usecase';
import { BlockCandidateUseCase } from '../application/usecases/admin/BlockCandidate.usecase';
import IFindCandidateByUserIdUseCase from '../application/usecases/candidate/interface/IFindCandidateByUserId.usecase';
import FindCandidateByUserIdUseCase from '../application/usecases/candidate/FindCandidateByUserId.usecase';
import IUnblockCandidateUseCase from '../application/usecases/admin/interfaces/IUnblockCandidate.usecase';
import { UnblockCandidateUseCase } from '../application/usecases/admin/UnblockCandidate.usecase';
import IFindCandidateByCandidateIdUseCase from '../application/usecases/interfaces/IFindCandidateByCandidateID.usecase';
import FindCandidateByCandidateIDUseCase from '../application/usecases/FindCandidateByCandidateID.usecase';
import ICreateUserUseCase from '../application/interfaces/usecases/user/ICreateUser.usecase';
import CreateUserUseCase from '../application/usecases/user/CreateUser.usecase';
import RecruiterController from '../presentation/controllers/recruiter/recruiterController';
import IRecruiterRepo from '../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterRespository from '../infrastructure/repositories/recruiter/recruiterRepository';
import IRegisterRecruiterUseCase from '../application/usecases/recruiter/interface/IRegisterRecruiter.usecase';
import RegisterRecruiterUseCase from '../application/usecases/recruiter/RegisterRecruiter.usecase';
import IVerifyUserUseCase from '../application/interfaces/usecases/user/IVerifyUser.usecase';
import VerifyUserUseCase from '../application/usecases/user/VerifyUser.usecase';
import ILoginRecruiterrUseCase from '../application/usecases/recruiter/interface/ILoginRecruiter.usecase';
import { LoginRecruiterUseCase } from '../application/usecases/recruiter/LoginRecruiter.usecase';
import ILoadRecruiterProfileUseCase from '../application/usecases/recruiter/interface/ILoadRecruiterProfile.usecase';
import { LoadRecruiterProfileDataUseCase } from '../application/usecases/recruiter/LoadRecruiterProfile.usecase';
import ILoadCompaniesUseCase from '../application/usecases/admin/interfaces/ILoadCompanies.usecase';
import { LoadCompaniesUseCase } from '../application/usecases/admin/LoadCompanies.usecase';
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
import IExperienceRepo from '../domain/interfaces/candidate/IExperienceRepo';
import ExperienceRepository from '../infrastructure/repositories/candidate/experienceRepository';
import IAddUserExperienceUsecase from '../application/interfaces/usecases/user/IAddUserExperience.usecase';
import AddUserExperienceUsecase from '../application/usecases/user/AddUserExperience.usecase';
import IGetUserExperiencesUsecase from '../application/interfaces/usecases/user/IGetUserExperiences.usecase';
import GetUserExperiencesUsecase from '../application/usecases/user/GetUserExperience.usecase';
import IEducationRepo from '../domain/interfaces/candidate/IEducationRepo';
import EducationRepository from '../infrastructure/repositories/candidate/educationRepository';
import IAddUserEducationUsecase from '../application/interfaces/usecases/user/IAddUserEducation.usecase';
import AddUserEducationUsecase from '../application/usecases/user/AddUserEducation.usecase';
import IGetUserEducationsUsecase from '../application/interfaces/usecases/user/IGetUserEducations.usecase';
import GetUserEducationsUsecase from '../application/usecases/user/GetUserEducations.usecase';
import ISkillRepo from '../domain/interfaces/candidate/ISkillRepo';
import SkillRepsitory from '../infrastructure/repositories/candidate/skillRespository';
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

//register repo
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<ICandidateRepo>('ICandidateRepository', CandidateRepository);
container.registerSingleton<IRecruiterRepo>('IRecruiterRepository', RecruiterRespository);
container.registerSingleton<IExperienceRepo>('IExperienceRepository', ExperienceRepository)
container.registerSingleton<IEducationRepo>('IEducationRepository', EducationRepository)
container.registerSingleton<ISkillRepo>('ISkillRepository', SkillRepsitory)

//register usecase
container.registerSingleton<IAdminLoginUseCase>('IAdminLoginUseCase', AdminLoginUseCase);
container.registerSingleton<ILoadUsersAdminUseCase>('ILoadUsersAdminUsecase', LoadUsersAdminUsecase);
container.registerSingleton<ILoadCandidateDetailsUseCase>(
  'ILoadCandidateDetailsUseCase',
  LoadCandidateDetailsUseCase
);
container.registerSingleton<IBlockCandidateUseCase>(
  'IBlockCandidateUseCase',
  BlockCandidateUseCase
);
container.registerSingleton<IUnblockCandidateUseCase>(
  'IUnblockCandidateUseCase',
  UnblockCandidateUseCase
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


container.registerSingleton<ILoginRecruiterrUseCase>(
  'ILoginRecruiterUseCase',
  LoginRecruiterUseCase
);
container.registerSingleton<ILoadRecruiterProfileUseCase>(
  'ILoadRecruiterProfileUseCase',
  LoadRecruiterProfileDataUseCase
);
container.registerSingleton<IRegisterRecruiterUseCase>(
  'IRegisterRecruiterUseCase',
  RegisterRecruiterUseCase
);
container.registerSingleton<ILoadCompaniesUseCase>('ILoadCompaniesUseCase', LoadCompaniesUseCase);
container.registerSingleton<IVerifyUserUseCase>('IVerifyUserUsecase', VerifyUserUseCase);

//register controller
container.registerSingleton(UserController);
container.registerSingleton(AdminController);
container.registerSingleton(RecruiterController);

//register other services
container.registerSingleton<IEmailService>('IEmailService', EmailService); //email service
