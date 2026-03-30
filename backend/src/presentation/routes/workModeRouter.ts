import express from 'express';
import { container } from 'tsyringe';
import WorkModeController from '../controllers/workModeController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { WorkModeApiRoutes } from '../../constants/Apis/workMode.api.routes';

function CreateWorkModeRouter() {
  const workModeRouter = express.Router();
  const workModeController = container.resolve(WorkModeController);

  workModeRouter.post(
    WorkModeApiRoutes.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    workModeController.addWorkMode.bind(workModeController)
  );
  workModeRouter.get(
    WorkModeApiRoutes.LOAD,
    centralizedAuthentication,
    authorization(['admin']),
    workModeController.getWorkModes.bind(workModeController)
  );
  workModeRouter.patch(
    WorkModeApiRoutes.CHANGE_STATUS_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    workModeController.changeWorkModeStatus.bind(workModeController)
  );
  workModeRouter.delete(
    WorkModeApiRoutes.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    workModeController.deleteWorkMode.bind(workModeController)
  );
  workModeRouter.patch(
    WorkModeApiRoutes.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    workModeController.editWorkMode.bind(workModeController)
  );

  return workModeRouter;
}

export default CreateWorkModeRouter;
