import { inject, injectable } from 'tsyringe';
import IAddUserExperienceUsecase from '../../application/interfaces/usecases/experience/IAddUserExperience.usecase.FIX';
// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IGetUserExperiencesUsecase from '../../application/interfaces/usecases/experience/IGetUserExperiences.usecase.FIX';
import IEditUserExperienceUsecase from '../../application/interfaces/usecases/experience/IEditUserExperience.usecase.FIX';
import IDeleteUserExperienceUsecase from '../../application/interfaces/usecases/experience/IDeleteUserExperience.usecase.FIX';

@injectable()
export default class ExperienceController {
  constructor(
    @inject('IAddUserExperienceUsecase') private _addUserExperience: IAddUserExperienceUsecase,
    @inject('IGetUserExperiencesUsecase') private _getUserExperiencesUC: IGetUserExperiencesUsecase,
    @inject('IEditUserExperienceUsecase') private _editUserExperienceUC: IEditUserExperienceUsecase,
    @inject('IDeleteUserExperienceUsecase')
    private _deleteUserExperienceUC: IDeleteUserExperienceUsecase
  ) {}

  async addExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    try {
      const result = await this._addUserExperience.execute({ userId, ...req.body });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.EXPERIENCE.ADD_SUCCESS,
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getExperiences(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.user?.id;
    try {
      const experience = await this._getUserExperiencesUC.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.EXPERIENCE.FETCH_SUCCESS,
        experience,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async editExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { experienceId } = req.params;
    try {
      const result = await this._editUserExperienceUC.execute({ experienceId, ...req.body });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.EXPERIENCE.UPDATE_SUCCESS, result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteExperience(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { experienceId } = req.params;

    try {
      await this._deleteUserExperienceUC.execute(experienceId);

      res.status(StatusCodes.OK).json({ success: true, message: 'Experience deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }
}
