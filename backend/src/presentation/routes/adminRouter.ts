import express, { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { AdminController } from '../controllers/adminController';
import {
  authorization,
  centralizedAuthentication,
  refreshAccessToken,
} from '../../middlewares/auth';
import Validator from '../../validation/validator.zod';
import { loginSchema } from '../schemas/user/userLoginRequest.zod.schema';
import { LoadRecruiterApplicationSchem } from '../schemas/admin/loadRecruiterApplications';
import { AdminApiRouts } from '../../constants/Apis/admin.routes';

function createAdminRouter() {
  const adminRouter = express.Router();

  const adminController = container.resolve(AdminController);

  adminRouter.post(
    AdminApiRouts.ADMIN_AUTH.LOGIN,
    Validator(loginSchema),
    adminController.adminLogin.bind(adminController)
  );
  adminRouter.get(
    '/v1/users',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadUsers.bind(adminController)
  );
  adminRouter.get(
    AdminApiRouts.ADMIN_RECRUITER_MANAGE.LOAD_ALL_RECRUITERS,
    centralizedAuthentication,
    authorization(['admin']),
    testMiddleware,
    adminController.loadRecruiters.bind(adminController)
  );
  adminRouter.get(
    AdminApiRouts.ADMIN_RECRUITER_MANAGE.LOAD_RECRUITER_DETAILS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.recruiterDetails.bind(adminController)
  );
  adminRouter.get(
    '/v1/users/details/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadUserDetails.bind(adminController)
  );
  adminRouter.patch(
    '/v1/user/block/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.blockUser.bind(adminController)
  );
  adminRouter.patch(
    '/v1/user/unblock/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.unblockCandidate.bind(adminController)
  );
  adminRouter.patch(
    '/v1/user/ban/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.userBan.bind(adminController)
  );
  adminRouter.delete(
    '/v1/user/:userId',
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteUser.bind(adminController)
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
    AdminApiRouts.ADMIN_RECRUITER_APPLICATION.LOAD_ALL_APPLICATIONS,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.loadRecruiterApplications.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_RECRUITER_APPLICATION.REJECT_APPLICATION_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.rejectRecruiterApplication.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_RECRUITER_MANAGE.HANDLE_RECRUITER_VERIFICATION,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.handleRecruiterVerification.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_RECRUITER_MANAGE.HANDLE_RECRUITER_PERMISSIONS,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.handleRecruiterPermission.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_RECRUITER_APPLICATION.APPROVE_APPLICATION_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.approveRecruiterApplication.bind(adminController)
  );
  adminRouter.patch(
    '/recruiter/application/approve/bulck',
    centralizedAuthentication,
    authorization(['user'])
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_RECRUITER_APPLICATION.CHANGE_STATUS_UNDER_REVIEW,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.changeStatusToUnderReview.bind(adminController)
  );
  adminRouter.post(
    AdminApiRouts.ADMIN_CONFIG_WORKMODE.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.addWorkMode.bind(adminController)
  );
  adminRouter.get(
    AdminApiRouts.ADMIN_CONFIG_WORKMODE.LOAD,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.getWorkModes.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_CONFIG_WORKMODE.CHANGE_STATUS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.changeWorkModeStatus.bind(adminController)
  );
  adminRouter.delete(
    AdminApiRouts.ADMIN_CONFIG_WORKMODE.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteWorkMode.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_CONFIG_WORKMODE.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.editWorkMode.bind(adminController)
  );
  adminRouter.post(
    AdminApiRouts.ADMIN_CONFIG_JOBLEVEL.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.addJobLevel.bind(adminController)
  );
  adminRouter.get(
    AdminApiRouts.ADMIN_CONFIG_JOBLEVEL.LOAD,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.getJobLevels.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_CONFIG_JOBLEVEL.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.editJobLevel.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_CONFIG_JOBLEVEL.CHANGE_STATU_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.changeJobLevelStatus.bind(adminController)
  );
  adminRouter.delete(
    AdminApiRouts.ADMIN_CONFIG_JOBLEVEL.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteJobLevel.bind(adminController)
  );
  adminRouter.post(
    AdminApiRouts.ADMIN_CONFIG_JOBTYPE.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.addJobType.bind(adminController)
  );
  adminRouter.get(
    AdminApiRouts.ADMIN_CONFIG_JOBTYPE.LOAD,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.getJobTypes.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_CONFIG_JOBTYPE.CHANGE_STATUS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.changeJobTypeStatus.bind(adminController)
  );
  adminRouter.patch(
    AdminApiRouts.ADMIN_CONFIG_JOBTYPE.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.updateJobType.bind(adminController)
  );
  adminRouter.delete(
    AdminApiRouts.ADMIN_CONFIG_JOBTYPE.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteJobTypes.bind(adminController)
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

  adminRouter.get(
    AdminApiRouts.ADMIN_CONFIG_SKILLS.LOAD,
    centralizedAuthentication,
    authorization(['admin', 'user', 'recruiter']),
    testMiddleware,
    adminController.getSkills.bind(adminController)
  );

  adminRouter.post(
    AdminApiRouts.ADMIN_CONFIG_SKILLS.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    testMiddleware,
    adminController.addSkills.bind(adminController)
  );

  adminRouter.patch(
    AdminApiRouts.ADMIN_CONFIG_SKILLS.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.updateSkills.bind(adminController)
  );

  adminRouter.delete(
    AdminApiRouts.ADMIN_CONFIG_SKILLS.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    adminController.deleteSkills.bind(adminController)
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
