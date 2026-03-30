import { inject, injectable } from 'tsyringe';
import IAddUserEducationUsecase from '../../application/interfaces/usecases/education/IAddUserEducation.usecase.FIX';
// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IGetUserEducationsUsecase from '../../application/interfaces/usecases/education/IGetUserEducations.usecase.FIX';
import IEditUserEducationUsecase from '../../application/interfaces/usecases/education/IEditUserEducation.usecase.FIX';
import IDeleteUserEducationUsecase from '../../application/interfaces/usecases/education/IDeleteUserEducation.usecase.FIX';

@injectable()
export default class EducationController {
  constructor(
    @inject('IAddUserEducationUsecase') private _addUserEducationUC: IAddUserEducationUsecase,
    @inject('IGetUserEducationsUsecase') private _getUserEducationsUC: IGetUserEducationsUsecase,
    @inject('IEditUserEducationUsecase') private _editUserEducationUC: IEditUserEducationUsecase,
    @inject('IDeleteUserEducationUsecase')
    private _deleteUserEducationUC: IDeleteUserEducationUsecase
  ) {}

  async addEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;

    try {
      const result = await this._addUserEducationUC.execute({ userId, ...req.body });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.EDUCATION.ADD_SUCCESS,
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getEducations(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;

    try {
      const result = await this._getUserEducationsUC.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.EDUCATION.FETCH_SUCCESS,
        educations: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async editEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { educationId } = req.params;

    try {
      const result = await this._editUserEducationUC.execute({ _id: educationId, ...req.body });

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.EDUCATION.UPDATE_SUCCESS, result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteEducation(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { educationId } = req.params;
    try {
      await this._deleteUserEducationUC.execute(educationId);

      res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }
}
