import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import IAdminAddJobTypeUsecase from '../../application/interfaces/usecases/jobType.admin/IAdminAddJobType.usecase';
import IAdminUpdateJobTypeUse from '../../application/interfaces/usecases/jobType.admin/IAdminUpdateJobType.usecase';
import IAdminChangeJobTypeStatusUsecase from '../../application/interfaces/usecases/jobType.admin/IAdminChangeJobTypeStatus.usecase';
import IAdminGetJobTypesUsecase from '../../application/interfaces/usecases/jobType.admin/IAdminGetJobType.usecase';
import IAdminDeleteJobTypeUsecase from '../../application/interfaces/usecases/jobType.admin/IAdminDeleteJobType.usecase';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';

@injectable()
export default class JobTypeController {
  constructor(
    @inject('IAdminAddJobTypeUsecase') private _addJobType: IAdminAddJobTypeUsecase,
    @inject('IAdminUpdateJobTypeUsecase') private _updateJobType: IAdminUpdateJobTypeUse,
    @inject('IAdminChangeJobTypeStatusUsecase')
    private _changeJobTypeStatus: IAdminChangeJobTypeStatusUsecase,
    @inject('IAdminGetJobTypesUsecase') private _getJobTypes: IAdminGetJobTypesUsecase,
    @inject('IAdminDeleteJobTypeUsecase') private _deleteJobType: IAdminDeleteJobTypeUsecase
  ) {}

  async addJobType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addJobType.execute(req.body);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Admin Job type'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateJobType(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this._updateJobType.execute({ id, ...req.body });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Admin Job Type'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changeJobTypeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this._changeJobTypeStatus.execute({ id, ...req.body });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Admin job type status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const limit = parseInt(req.query.limit as string) || 7;
    const page = parseInt(req.query.page as string) || 1;

    try {
      const result = await this._getJobTypes.execute({ search, page, limit });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Admin job type'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJobTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this._deleteJobType.execute(id);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Admin job type'),
      });
    } catch (error) {
      next(error);
    }
  }
}
