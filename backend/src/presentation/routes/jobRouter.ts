import express from 'express';
import JobController from '../controllers/jobController';
import { container } from 'tsyringe';
import { JobApiRoutes } from '../../constants/Apis/job.routes';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';

function CreateJobRouter() {
  const jobRouter = express.Router();

  const jobController = container.resolve(JobController);

  jobRouter.get(JobApiRoutes.LOAD_JOB_DETAILS, jobController.loadJobDetails.bind(jobController));
  jobRouter.get(
    JobApiRoutes.LOAD_JOBS_HOMPE_PAGE,
    jobController.searchJobFromHomePage.bind(jobController)
  );
  jobRouter.get(
    JobApiRoutes.LOAD_RECOMMENDED_JOBS,
    centralizedAuthentication,
    authorization(['user']),
    jobController.getRecommendedJobs.bind(jobController)
  );

  return jobRouter;
}

export default CreateJobRouter;
