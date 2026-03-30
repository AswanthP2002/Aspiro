import express from 'express';
import { container } from 'tsyringe';
import EducationController from '../controllers/educationController';
import { EducationApiRoutes } from '../../constants/Apis/education.api.routes';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import Validator from '../../validation/validator.zod';
import { addUserEducationSchema } from '../schemas/user/createUserEducation.schema';

function CreateEducationRouter() {
  const educationRouter = express.Router();
  const educationController = container.resolve(EducationController);

  educationRouter.post(
    EducationApiRoutes.EDUCATION.ADD,
    centralizedAuthentication,
    authorization(['user']),
    educationController.addEducation.bind(educationController)
  );

  educationRouter.get(
    EducationApiRoutes.EDUCATION.GET,
    centralizedAuthentication,
    authorization(['user']),
    educationController.getEducations.bind(educationController)
  );

  educationRouter.put(
    EducationApiRoutes.EDUCATION.EDIT,
    centralizedAuthentication,
    authorization(['user']),
    Validator(addUserEducationSchema),
    educationController.editEducation.bind(educationController)
  );

  educationRouter.delete(
    EducationApiRoutes.EDUCATION.DELETE,
    centralizedAuthentication,
    authorization(['user']),
    educationController.deleteEducation.bind(educationController)
  );

  return educationRouter;
}

export default CreateEducationRouter;
