import express from 'express';
import { container } from 'tsyringe';
import JobTypeController from '../controllers/jobTypeController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { JobTypeApiRoutes } from '../../constants/Apis/jobType.api.routes';

function CreateJobTypeRouter() {
  const jobTypeRouter = express.Router();
  const jobTypeController = container.resolve(JobTypeController);

  jobTypeRouter.post(
    JobTypeApiRoutes.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    jobTypeController.addJobType.bind(jobTypeController)
  );
  jobTypeRouter.get(
    JobTypeApiRoutes.LOAD,
    centralizedAuthentication,
    authorization(['admin']),
    jobTypeController.getJobTypes.bind(jobTypeController)
  );
  jobTypeRouter.patch(
    JobTypeApiRoutes.CHANGE_STATUS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    jobTypeController.changeJobTypeStatus.bind(jobTypeController)
  );
  jobTypeRouter.patch(
    JobTypeApiRoutes.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    jobTypeController.updateJobType.bind(jobTypeController)
  );
  jobTypeRouter.delete(
    JobTypeApiRoutes.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    jobTypeController.deleteJobTypes.bind(jobTypeController)
  );

  return jobTypeRouter;
}

export default CreateJobTypeRouter;
