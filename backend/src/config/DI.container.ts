import { container } from 'tsyringe';
import IUserRepository from '../domain/interfaces/IUserRepo.refactored';
import UserRepository from '../infrastructure/repositories/userRepository';
import IAdminLoginUseCase from '../application/usecases/admin/interfaces/IAdminLogin.usecase';
import { AdminLoginUseCase } from '../application/usecases/admin/AdminLogin.usecase';
import { AdminController } from '../presentation/controllers/admin/adminController';
import ICandidateRepo from '../domain/interfaces/candidate/ICandidateRepo';
import CandidateRepository from '../infrastructure/repositories/candidate/candidateRepository';
import ILoadCandidateUseCase from '../application/usecases/admin/interfaces/ILoadCandidate.usecase';
import { LoadCandidatesUseCase } from '../application/usecases/admin/LoadCandidates.usecase';
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
import IVerifyUserUseCase from '../application/usecases/interfaces/IVerifyUser.usecase';
import VerifyUserUseCase from '../application/usecases/VerifyUser.usecase';
import ILoginRecruiterrUseCase from '../application/usecases/recruiter/interface/ILoginRecruiter.usecase';
import { LoginRecruiterUseCase } from '../application/usecases/recruiter/LoginRecruiter.usecase';
import ILoadRecruiterProfileUseCase from '../application/usecases/recruiter/interface/ILoadRecruiterProfile.usecase';
import { LoadRecruiterProfileDataUseCase } from '../application/usecases/recruiter/LoadRecruiterProfile.usecase';
import ILoadCompaniesUseCase from '../application/usecases/admin/interfaces/ILoadCompanies.usecase';
import { LoadCompaniesUseCase } from '../application/usecases/admin/LoadCompanies.usecase';
import IEmailService from '../application/interfaces/services/IEmailService';
import EmailService from '../infrastructure/services/EmailService';
import { UserController } from '../presentation/controllers/userController';

//register repo
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<ICandidateRepo>('ICandidateRepository', CandidateRepository);
container.registerSingleton<IRecruiterRepo>('IRecruiterRepository', RecruiterRespository);

//register usecase
container.registerSingleton<IAdminLoginUseCase>('IAdminLoginUseCase', AdminLoginUseCase);
container.registerSingleton<ILoadCandidateUseCase>('ILoadCandidatesUseCase', LoadCandidatesUseCase);
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
container.registerSingleton<IRegisterRecruiterUseCase>(
  'IRegisterRecruiterUseCase',
  RegisterRecruiterUseCase
);
container.registerSingleton<IVerifyUserUseCase>('IVerifyUserUseCase', VerifyUserUseCase);
container.registerSingleton<ILoginRecruiterrUseCase>(
  'ILoginRecruiterUseCase',
  LoginRecruiterUseCase
);
container.registerSingleton<ILoadRecruiterProfileUseCase>(
  'ILoadRecruiterProfileUseCase',
  LoadRecruiterProfileDataUseCase
);
container.registerSingleton<ILoadCompaniesUseCase>('ILoadCompaniesUseCase', LoadCompaniesUseCase);

//register controller
container.registerSingleton(UserController);
container.registerSingleton(AdminController);
container.registerSingleton(RecruiterController);

//register other services
container.registerSingleton<IEmailService>('IEmailService', EmailService); //email service
