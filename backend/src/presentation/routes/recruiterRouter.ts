import express, { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import RecruiterController from '../controllers/recruiterController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import Validator from '../../validation/validator.zod';
import { CreateJobSchema } from '../schemas/recruiter/createJob.schema';
import { upload } from '../../utilities/multer';
import { RecruiterApiRoutes } from '../../constants/Apis/recruiter.routes';

function createRecruiterRouter() {
  const recruiterRouter = express.Router();

  const recruiterController = container.resolve(RecruiterController);

  recruiterRouter.post(
    RecruiterApiRoutes.RECRUITER_PROFILE.CREATE,
    upload.single('document'),
    centralizedAuthentication,
    authorization(['user']),
    recruiterController.createRecruiter.bind(recruiterController)
  );
  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_PROFILE.LOAD_MY_RECRUITER_PROFILE,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.loadRecruiterProfileData.bind(recruiterController)
  );
  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_JOB_CONFIG_LISTS.JOB_TYPE_LIST_FETCH,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.getJobTypes.bind(recruiterController)
  );
  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_JOB_CONFIG_LISTS.JOB_LEVEL_LIST_FETCH,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.getJobLevels.bind(recruiterController)
  );
  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_JOB_CONFIG_LISTS.WORK_MODE_LIST_FETCH,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.getWorkModes.bind(recruiterController)
  );
  recruiterRouter.post(
    RecruiterApiRoutes.RECRUITER_JOB_MANAGE.POST_A_JOB,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    Validator(CreateJobSchema),
    recruiterController.createJob.bind(recruiterController)
  );
  recruiterRouter.put(
    RecruiterApiRoutes.RECRUITER_JOB_MANAGE.EDIT_A_JOB,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.editJob.bind(recruiterController)
  );
  recruiterRouter.delete(
    RecruiterApiRoutes.RECRUITER_JOB_MANAGE.DELETE_A_JOB,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.deleteJob.bind(recruiterController)
  );

  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_JOB_MANAGE.LOAD_MY_JOBS,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.LoadRecruiterJobs.bind(recruiterController)
  );

  recruiterRouter.post(
    RecruiterApiRoutes.RECRUITER_JOB_APPLICATIONS_MANAGE.SCHEDULE_INTERVIEW,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.scheduleInterview.bind(recruiterController)
  );
  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_JOB_APPLICATIONS_MANAGE.GET_APPLICATIONS_BY_JOBID,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.getJobApplications.bind(recruiterController)
  );
  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_JOB_APPLICATIONS_MANAGE.GET_APPLICATION_DETAILS_BY_APPLICATION_ID,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.getJobApplicationDetails.bind(recruiterController)
  );
  recruiterRouter.patch(
    RecruiterApiRoutes.RECRUITER_JOB_APPLICATIONS_MANAGE.UPDATE_APPLICANT_NOTE_BY_APPLICATION_ID,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.updateCandidateNotes.bind(recruiterController)
  );
  recruiterRouter.patch(
    RecruiterApiRoutes.RECRUITER_JOB_APPLICATIONS_MANAGE.UPDATE_APPLICANT_STATUS,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.updateJobApplicationStatus.bind(recruiterController)
  );

  recruiterRouter.get(
    RecruiterApiRoutes.RECRUITER_JOB_MANAGE.GET_RECENT_JOBS,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.getRecentJobs.bind(recruiterController)
  );

  function testMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('checking request body', req.body);
    next();
    // res.status(200).json({success:true, message:'Ok'})
  }

  return recruiterRouter;
}

export default createRecruiterRouter;
