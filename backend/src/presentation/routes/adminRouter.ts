import express, { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { AdminController } from '../controllers/adminController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import Validator from '../../validation/validator.zod';
import { loginSchema } from '../schemas/user/userLoginRequest.zod.schema';
import { AdminApiRouts } from '../../constants/Apis/admin.routes';

function createAdminRouter() {
  const adminRouter = express.Router();

  const adminController = container.resolve(AdminController);

  adminRouter.post(
    AdminApiRouts.ADMIN_AUTH.LOGIN,
    Validator(loginSchema),
    adminController.adminLogin.bind(adminController)
  );

  adminRouter.post(
    '/v1/password/reset-request',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.requestReset.bind(adminController)
  );
  adminRouter.patch(
    '/v1/user/password-reset',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.resetUserPassword.bind(adminController)
  );
  adminRouter.get(
    AdminApiRouts.ADMIN_RECRUITER_APPLICATION.LOAD_APPLICATION_DETAILS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.getRecruiterApplicationDetails.bind(adminController)
  );

  adminRouter.patch(
    '/recruiter/application/approve/bulck',
    centralizedAuthentication,
    authorization(['user'])
  );

  adminRouter.delete(
    AdminApiRouts.ADMIN_RECRUITER_MANAGE.DELETE_RECRUITER,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteRecruiterData.bind(adminController)
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
    AdminApiRouts.ADMIN_JOBS_MANAGE.LOAD_ALL_JOBS,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadJobs.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_JOBS_MANAGE.FLAG_JOB_BY_JOBID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.flagJob.bind(adminController)
  );

  adminRouter.get(
    AdminApiRouts.ADMIN_JOBS_MANAGE.LOAD_JOB_DETAILS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadJobDetails.bind(adminController)
  );
  adminRouter.delete(
    AdminApiRouts.ADMIN_JOBS_MANAGE.DELETE_JOB_BY_JOBID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteJob.bind(adminController)
  );
  // // adminRouter.get(
  // //   '/admin/job/details/:jobId',
  // //   adminAuth,
  // //   adminController.loadJObDetails.bind(adminController)
  // // );
  adminRouter.patch(
    AdminApiRouts.ADMIN_JOBS_MANAGE.BLOCK_A_JOB,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.blockJob.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_JOBS_MANAGE.UNBLOCK_A_JOB,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.unblockJob.bind(adminController)
  );
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
