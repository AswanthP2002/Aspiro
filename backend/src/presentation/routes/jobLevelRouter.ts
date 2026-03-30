import express from 'express';
import { container } from 'tsyringe';
import JobLevelController from '../controllers/jobLevelController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { JobLevelApiRoutes } from '../../constants/Apis/jobLevel.api.routes';

function CreateJobLevelRouter() {
  const jobLevelRouter = express.Router();
  const jobLevelController = container.resolve(JobLevelController);

  jobLevelRouter.post(
    JobLevelApiRoutes.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    jobLevelController.addJobLevel.bind(jobLevelController)
  );
  jobLevelRouter.get(
    JobLevelApiRoutes.LOAD,
    centralizedAuthentication,
    authorization(['admin']),
    jobLevelController.getJobLevels.bind(jobLevelController)
  );
  jobLevelRouter.patch(
    JobLevelApiRoutes.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    jobLevelController.editJobLevel.bind(jobLevelController)
  );
  jobLevelRouter.patch(
    JobLevelApiRoutes.CHANGE_STATU_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    jobLevelController.changeJobLevelStatus.bind(jobLevelController)
  );
  jobLevelRouter.delete(
    JobLevelApiRoutes.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    jobLevelController.deleteJobLevel.bind(jobLevelController)
  );

  return jobLevelRouter;
}

export default CreateJobLevelRouter;
