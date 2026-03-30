import { inject, injectable } from 'tsyringe';
import IAddUsersSkillUsecase from '../../application/interfaces/usecases/skill.user/IAddUsersSkill.usecase.FIX';
// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IGetUserSkillsUsecase from '../../application/interfaces/usecases/skill.user/IGetUserSkills.usecase.FIX';
import IDeleteUserSkillUsecase from '../../application/interfaces/usecases/skill.user/IDeleteUserSkill.usecase.FIX';
import IAdminAddSkillUsecase from '../../application/interfaces/usecases/skill.admin/IAdminAddSkill.usecase';
import IAdminUpdateSkillUsecase from '../../application/interfaces/usecases/skill.admin/IAdminUpdateSkill.usecase';
import IAdminDeleteSkillUsecase from '../../application/interfaces/usecases/skill.admin/IAdminDeleteSkill.usecase';
import IAdminGetSkillsUsecase from '../../application/interfaces/usecases/skill.admin/IAdminGetSkills.usecase';

@injectable()
export class SkillController {
  constructor(
    @inject('IAddUsersSkillUsecase') private _addUserSkillUC: IAddUsersSkillUsecase,
    @inject('IGetUsersSkillsUsecase') private _getUserSkillsUC: IGetUserSkillsUsecase,
    @inject('IDeleteUserSkillUsecase') private _deleteUserSkillUC: IDeleteUserSkillUsecase,
    @inject('IAdminAddSkillsUsecase') private _addSkills: IAdminAddSkillUsecase,
    @inject('IAdminUpdateSkillsUsecase') private _updateSkills: IAdminUpdateSkillUsecase,
    @inject('IAdminDeleteSkillsUsecase') private _deleteSkills: IAdminDeleteSkillUsecase,
    @inject('IAdminGetSkillsUsecase') private _getSkills: IAdminGetSkillsUsecase
  ) {}

  async addSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    try {
      const result = await this._addUserSkillUC.execute({ userId, ...req.body });
      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: StatusMessage.SKILL.ADD_SUCCESS, result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getSkills(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    try {
      const skills = await this._getUserSkillsUC.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.SKILL.FETCH_SUCCESS,
        skills,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { skillId } = req.params;

    try {
      await this._deleteUserSkillUC.execute(skillId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.SKILL.DELETE_SUCCESS });
    } catch (error: unknown) {
      next(error);
    }
  }

  async adminAddSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addSkills.execute(req.body);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Skill'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async adminUpdateSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skillId } = req.params;

      const result = await this._updateSkills.execute({ _id: skillId, ...req.body });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Admin Skill'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async adminDeleteSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skillId } = req.params;
      const result = await this._deleteSkills.execute(skillId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Admin skill'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async adminGetSkills(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('-- load skill controller trigerred --');
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || '';

    try {
      const result = await this._getSkills.execute({ search, page, limit });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Admin skills'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
