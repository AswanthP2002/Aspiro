import { Response, Request, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import IAdminAddJobLevelUsecase from '../../application/interfaces/usecases/jobLevel.admin/IAdminAddJobLevel.usecase';
import IAdminGetJobLevelsUsecase from '../../application/interfaces/usecases/jobLevel.admin/IAdminGetJobLevel.usecase';
import IAdminEditJobLevelUsecase from '../../application/interfaces/usecases/jobLevel.admin/IAdminEditJobLevel.usecase';
import IAdminChangeJobLevelStatusUsecase from '../../application/interfaces/usecases/jobLevel.admin/IAdminChangeJobLevelStatus.usecase';
import IAdminDeleteJobLevelUsecase from '../../application/interfaces/usecases/jobLevel.admin/IAdminDeleteJobLevel.usecase';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';

@injectable()
export default class JobLevelController {
  constructor(
    @inject('IAdminAddJobLevelUsecase') private _addJobLevel: IAdminAddJobLevelUsecase,
    @inject('IAdminGetJobLevelUsecase') private _getJobLevels: IAdminGetJobLevelsUsecase,
    @inject('IAdminEditJobLevelUsecase') private _editJobLevel: IAdminEditJobLevelUsecase,
    @inject('IAdminChangeJobLevelStatusUsecase')
    private _changeJobLevelStatus: IAdminChangeJobLevelStatusUsecase,
    @inject('IAdminDeleteJobLevelUsecase') private _deleteJobLeve: IAdminDeleteJobLevelUsecase
  ) {}

  async addJobLevel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addJobLevel.execute(req.body);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Admin Job Level'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobLevels(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const limit = parseInt(req.query.limit as string) || 7;
    const page = parseInt(req.query.page as string) || 1;

    try {
      const result = await this._getJobLevels.execute({ search, limit, page });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Admin Job Level'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async editJobLevel(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobLevelId = req.params.id;
    try {
      const result = await this._editJobLevel.execute({ id: jobLevelId, ...req.body });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Admin Job level'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changeJobLevelStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobLevelId = req.params.id;
    try {
      const result = await this._changeJobLevelStatus.execute(jobLevelId, req.body.isActive);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Admin job level status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJobLevel(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobLevelId = req.params.id;

    try {
      await this._deleteJobLeve.execute(jobLevelId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Admin Job Level'),
      });
    } catch (error) {
      next(error);
    }
  }
}
