import express, { NextFunction, Request, Response } from 'express';
// import { Request, Response, NextFunction } from 'express';
// import { AdminLoginUseCase } from '../../../application/usecases/admin/AdminLogin.usecase';
// import { BlockCandidateUseCase } from '../../../application/usecases/admin/BlockCandidate.usecase';
// import BlockCompanyUseCase from '../../../application/usecases/admin/BlockComapny.usecase';
// import { BlockJobUseCase } from '../../../application/usecases/admin/BlockJob.usecase';
// import CloseCompanyUseCase from '../../../application/usecases/admin/CloseCompany.usecase';
// import { LoadCandidateDetailsUseCase } from '../../../application/usecases/admin/LoadCandidateDetails.usecase';
// import { LoadCandidatesUseCase } from '../../../application/usecases/admin/LoadCandidates.usecase';
// import LoadCompanyDetailsUseCase from '../../../application/usecases/admin/LoadCompanyDetails.usecase';
// import { LoadCompaniesUseCase } from '../../../application/usecases/admin/LoadCompanies.usecase';
// import { LoadJobDetailsUseCase } from '../../../application/usecases/admin/LoadJobDetails.usecase';
// import LoadJobsUseCase from '../../../application/usecases/admin/LoadJobs.usecase';
// import { RejectJobUseCase } from '../../../application/usecases/admin/RejectJob.usecase';
// import { UnblockCandidateUseCase } from '../../../application/usecases/admin/UnblockCandidate.usecase';
// import UnblockCompanyUseCase from '../../../application/usecases/admin/UnblockComapny.usecase';
// import { UnblockJobUseCase } from '../../../application/usecases/admin/UnblockJob.usecase';
// import { UnRejectJobUseCase } from '../../../application/usecases/admin/UnrejectJob.usecase';
// import CandidateRepository from '../../../infrastructure/repositories/candidate/candidateRepository';
// import JobRepository from '../../../infrastructure/repositories/jobRepository';
// import RecruiterRespository from '../../../infrastructure/repositories/recruiter/recruiterRepository';
// import {
//   adminAuth,
//   authorization,
//   centralizedAuthentication,
//   refreshAccessToken,
// } from '../../../middlewares/auth';
// import { AdminController } from '../../controllers/adminController';
// import { Db } from 'mongodb';
// import UserRepository from '../../../infrastructure/repositories/userRepository';
import { container } from 'tsyringe';
import { AdminController } from '../controllers/adminController';
import {
  authorization,
  centralizedAuthentication,
  refreshAccessToken,
} from '../../middlewares/auth';
import Validator from '../../validation/validator.zod';
import { loginSchema } from '../schemas/user/userLogin.schema';
import { LoadRecruiterApplicationSchem } from '../schemas/admin/loadRecruiterApplications';

function createAdminRouter() {
  const adminRouter = express.Router();

  const adminController = container.resolve(AdminController);

  adminRouter.post(
    '/login',
    Validator(loginSchema),
    testMiddleware,
    adminController.adminLogin.bind(adminController)
  );
  adminRouter.get(
    '/users',
    centralizedAuthentication,
    authorization(['admin']),
    testMiddleware,
    adminController.loadUsers.bind(adminController)
  );
  adminRouter.get(
    '/recruiters/data',
    centralizedAuthentication,
    authorization(['admin']),
    testMiddleware,
    adminController.loadCompanies.bind(adminController)
  );
  adminRouter.get(
    '/users/details/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadUserDetails.bind(adminController)
  );
  adminRouter.patch(
    '/user/block/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.blockUser.bind(adminController)
  );
  adminRouter.patch(
    '/user/unblock/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.unblockCandidate.bind(adminController)
  );
  adminRouter.delete(
    '/user/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteUser.bind(adminController)
  );
  adminRouter.get(
    '/recruiter/applications',
    centralizedAuthentication,
    authorization(['admin']),
    // Validator(LoadRecruiterApplicationSchem),
    adminController.loadRecruiterApplications.bind(adminController)
  );
  adminRouter.patch(
    '/recruiter/application/:recruiterId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.rejectRecruiterApplication.bind(adminController)
  );
  adminRouter.patch(
    '/recruiter/application/approve/:recruiterId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.approveRecruiterApplication.bind(adminController)
  );

  // // adminRouter.get(
  // //   '/admin/company/details/:companyId',
  // //   adminAuth,
  // //   adminController.loadCompanyDetails.bind(adminController)
  // // );
  adminRouter.patch(
    '/recruiter/block/:companyId',
    centralizedAuthentication,
    authorization(['admin']),
    testMiddleware,
    adminController.blockRecruiter.bind(adminController)
  );
  adminRouter.patch(
    '/recruiter/unblock/:companyId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.unblockRecruiter.bind(adminController)
  );
  adminRouter.patch(
    '/recruiter/close/:companyId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.closeCompany.bind(adminController)
  );
  adminRouter.get(
    '/jobs/data',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadJobs.bind(adminController)
  );

  adminRouter.get(
    '/skills',
    centralizedAuthentication,
    authorization(['admin', 'user', 'recruiter']),
    testMiddleware,
    adminController.getSkills.bind(adminController)
  );

  adminRouter.post(
    '/skills',
    centralizedAuthentication,
    authorization(['admin']),
    testMiddleware,
    adminController.addSkills.bind(adminController)
  );

  adminRouter.patch(
    '/skills/:skillId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.updateSkills.bind(adminController)
  );

  adminRouter.delete(
    '/skills/:skillId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteSkills.bind(adminController)
  );
  // // adminRouter.get(
  // //   '/admin/job/details/:jobId',
  // //   adminAuth,
  // //   adminController.loadJObDetails.bind(adminController)
  // // );
  // // adminRouter.put(
  // //   '/admin/job/block/:jobId',
  // //   adminAuth,
  // //   adminController.blockJob.bind(adminController)
  // // );
  // // adminRouter.put(
  // //   '/admin/job/unblock/:jobId',
  // //   adminAuth,
  // //   adminController.unblockJob.bind(adminController)
  // // );
  // // adminRouter.put(
  // //   '/admin/job/reject/:jobId',
  // //   adminAuth,
  // //   adminController.rejectJob.bind(adminController)
  // // );
  // // adminRouter.put(
  // //   '/admin/job/unreject/:jobId',
  // //   adminAuth,
  // //   adminController.unrejectJob.bind(adminController)
  // // );

  //adminRouter.post('/token/refresh', refreshAccessToken);
  adminRouter.post('/logout', adminController.logoutAdmin);

  return adminRouter;
}

function testMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('testing logout flow');
  console.log('--req url for testing--', req.url);
  console.log(req.body);
  next();
}

export default createAdminRouter;
