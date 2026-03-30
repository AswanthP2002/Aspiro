import express, { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { SkillController } from '../controllers/skillController';
import { SkillApiRoutes } from '../../constants/Apis/skill.api.routes';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';

function CreateSkillRouter() {
  const skillRouter = express.Router();
  const skillController = container.resolve(SkillController);

  skillRouter.post(
    SkillApiRoutes.SKILLS.USER.ADD,
    centralizedAuthentication,
    authorization(['user']),
    skillController.addSkill.bind(skillController)
  );

  skillRouter.get(
    SkillApiRoutes.SKILLS.USER.GET,
    centralizedAuthentication,
    authorization(['user']),
    skillController.getSkills.bind(skillController)
  );

  skillRouter.delete(
    SkillApiRoutes.SKILLS.USER.DELETE,
    centralizedAuthentication,
    authorization(['user']),
    skillController.deleteSkill.bind(skillController)
  );

  skillRouter.post(
    SkillApiRoutes.SKILLS.ADMIN.ADD,
    centralizedAuthentication,
    authorization(['admin']),
    skillController.adminAddSkill.bind(skillController)
  );

  skillRouter.patch(
    SkillApiRoutes.SKILLS.ADMIN.EDIT_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    skillController.adminUpdateSkill.bind(skillController)
  );

  skillRouter.delete(
    SkillApiRoutes.SKILLS.ADMIN.DELETE_BY_ID,
    centralizedAuthentication,
    authorization(['admin']),
    skillController.adminDeleteSkill.bind(skillController)
  );

  skillRouter.get(
    SkillApiRoutes.SKILLS.ADMIN.LOAD,
    centralizedAuthentication,
    authorization(['admin', 'user', 'recruiter']),
    testMiddleware,
    skillController.adminGetSkills.bind(skillController)
  );

  return skillRouter;
}

function testMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('-- checking is this route execute correctly --', req.query, req.url);
  next();
}

export default CreateSkillRouter;
