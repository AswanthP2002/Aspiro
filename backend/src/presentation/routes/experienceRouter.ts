import express from 'express';
import { container } from 'tsyringe';
import ExperienceController from '../controllers/experienceController';
import { ExperienceApiRoutes } from '../../constants/Apis/experience.api.routes';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';

function CreateExperienceRouter() {
  const experienceRouter = express.Router();
  const experienceController = container.resolve(ExperienceController);

  experienceRouter.post(
    ExperienceApiRoutes.EXPERIENCE.ADD,
    centralizedAuthentication,
    authorization(['user']),
    experienceController.addExperience.bind(experienceController)
  );

  experienceRouter.get(
    ExperienceApiRoutes.EXPERIENCE.GET,
    centralizedAuthentication,
    authorization(['user']),
    experienceController.getExperiences.bind(experienceController)
  );

  experienceRouter.put(
    ExperienceApiRoutes.EXPERIENCE.EDIT,
    centralizedAuthentication,
    authorization(['user']),
    experienceController.editExperience.bind(experienceController)
  );

  experienceRouter.delete(
    ExperienceApiRoutes.EXPERIENCE.DELETE,
    centralizedAuthentication,
    authorization(['user']),
    experienceController.deleteExperience.bind(experienceController)
  );

  return experienceRouter;
}

export default CreateExperienceRouter;
