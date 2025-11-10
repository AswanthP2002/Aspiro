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
import { authorization, centralizedAuthentication, refreshAccessToken } from '../../middlewares/auth';

function createAdminRouter() {
  const adminRouter = express.Router();

  // const candidateRepo = new CandidateRepository();
  // const recruiterRepo = new RecruiterRespository();
  // const jobRepo = new JobRepository();
  // const userRepo = new UserRepository();

  //const adminLoginUC = new AdminLoginUseCase(candidateRepo, userRepo);
  // const loadCandidatesUC = new LoadCandidatesUseCase(candidateRepo);
  // const loadCompaniesUC = new LoadCompaniesUseCase(recruiterRepo);
  // const loadCandidateDetailsUC = new LoadCandidateDetailsUseCase(candidateRepo);
  // //const blockCandidateUC = new BlockCandidateUseCase(candidateRepo);
  // //const unblockCandidateUC = new UnblockCandidateUseCase(candidateRepo);
  // const loadCompanyDetailsUC = new LoadCompanyDetailsUseCase(recruiterRepo);
  // const blockCompanyUC = new BlockCompanyUseCase(recruiterRepo);
  // const unblockCompanyUC = new UnblockCompanyUseCase(recruiterRepo);
  // const closeCompanyUC = new CloseCompanyUseCase(recruiterRepo);
  // const loadJobsUC = new LoadJobsUseCase(jobRepo);
  // const loadJobDetailsUC = new LoadJobDetailsUseCase(jobRepo);
  // const blockJobUC = new BlockJobUseCase(jobRepo);
  // const unblockJobUC = new UnblockJobUseCase(jobRepo);
  // const rejectJobUC = new RejectJobUseCase(jobRepo);
  // const unrejectJobUC = new UnRejectJobUseCase(jobRepo);

  const adminController = container.resolve(AdminController);

  // const adminController = new AdminController(
  //   // loadCandidatesUC,
  //   // loadCompaniesUC,
  //   // loadCandidateDetailsUC,
  //   // blockCandidateUC,
  //   // unblockCandidateUC,
  //   // loadCompanyDetailsUC,
  //   // blockCompanyUC,
  //   // unblockCompanyUC,
  //   // closeCompanyUC,
  //   // loadJobsUC,
  //   // loadJobDetailsUC,
  //   // blockJobUC,
  //   // unblockJobUC,
  //   // rejectJobUC,
  //   // unrejectJobUC
  // );

  adminRouter.post('/login', adminController.adminLogin.bind(adminController));
  adminRouter.get('/users',
    centralizedAuthentication,
    authorization(['admin']),
    testMiddleware,
    adminController.loadUsers.bind(adminController)
  )
  // // adminRouter.get(
  // //   '/companies/data',
  // //   adminAuth,
  // //   testMiddleware,
  // //   adminController.loadCompanies.bind(adminController)
  // // );
  adminRouter.get(
    '/users/details/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadCandidateDetails.bind(adminController)
  );
  adminRouter.patch(
    '/user/block/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.blockCandidate.bind(adminController)
  );
  adminRouter.patch(
    '/user/unblock/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.unblockCandidate.bind(adminController)
  );
  // // adminRouter.get(
  // //   '/admin/company/details/:companyId',
  // //   adminAuth,
  // //   adminController.loadCompanyDetails.bind(adminController)
  // // );
  // // adminRouter.put(
  // //   '/admin/company/block/:companyId',
  // //   adminAuth,
  // //   adminController.blockRecruiter.bind(adminController)
  // // );
  // // adminRouter.put(
  // //   '/admin/company/unblock/:companyId',
  // //   adminAuth,
  // //   adminController.unblockRecruiter.bind(adminController)
  // // );
  // // adminRouter.delete(
  // //   '/admin/company/close/:companyId',
  // //   adminAuth,
  // //   adminController.closeCompany.bind(adminController)
  // // );
  adminRouter.get(
    '/jobs/data',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadJobs.bind(adminController)
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
  // adminRouter.post(
  //   '/admin/logout',
  //   centralizedAuthentication,
  //   authorization(['admin']),
  //   adminController.logoutAdmin
  // );



  return adminRouter;
}

function testMiddleware(req : Request, res : Response, next : NextFunction){
  console.log(req.body)
  console.log(req.query?.filter)
  //console.log('Checking request values filter', JSON.parse(req?.query?.filterOptions as string))
  next()
}

export default createAdminRouter;
