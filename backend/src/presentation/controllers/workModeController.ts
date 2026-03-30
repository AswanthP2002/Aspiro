import { inject, injectable } from 'tsyringe';
import IAdminAddWorkModeUsecase from '../../application/interfaces/usecases/workMode.admin/IAdminAddWorkMode.usecase';
import { IAdminGetWorkModesUsecase } from '../../application/interfaces/usecases/workMode.admin/IAdminGetWorkModes.usecase';
import { IAdminChangeWorkModeStatusUsecase } from '../../application/interfaces/usecases/workMode.admin/IAdminChangeWorkmodeStatus.usecase';
import IAdminDeleteWorkModeUsecase from '../../application/interfaces/usecases/workMode.admin/IAdminDeleteWorkMode.usecase';
import IAdminEditWorkModeUsecase from '../../application/interfaces/usecases/workMode.admin/IAdminEditWorkMode.usecase';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';

@injectable()
export default class WorkModeController {
  constructor(
    @inject('IAdminAddWorkModeUsecase') private _addWorkMode: IAdminAddWorkModeUsecase,
    @inject('IAdminGetWorkModeUsecase') private _getWorkMods: IAdminGetWorkModesUsecase,
    @inject('IAdminChangeWorkModeStatusUsecase')
    private _changeWorkmodeStatus: IAdminChangeWorkModeStatusUsecase,
    @inject('IAdminDeleteWorkModeUsecase') private _deleteWorkMode: IAdminDeleteWorkModeUsecase,
    @inject('IAdminEditWorkModeUsecase') private _editWorkMode: IAdminEditWorkModeUsecase
  ) {}

  async addWorkMode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addWorkMode.execute(req.body);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Admin workmode'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getWorkModes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const limit = parseInt(req.query.limit as string) || 7;
    const page = parseInt(req.query.page as string) || 1;
    try {
      const result = await this._getWorkMods.execute({ search, page, limit });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Admin workmode'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changeWorkModeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const workModeId = req.params.id;

    try {
      const result = await this._changeWorkmodeStatus.execute({ id: workModeId, ...req.body });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Admin workmode active status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWorkMode(req: Request, res: Response, next: NextFunction): Promise<void> {
    const workModeId = req.params.id;
    try {
      await this._deleteWorkMode.execute(workModeId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Admin work mode'),
      });
    } catch (error) {
      next(error);
    }
  }

  async editWorkMode(req: Request, res: Response, next: NextFunction): Promise<void> {
    const workModeId = req.params.id;
    try {
      const result = await this._editWorkMode.execute({ id: workModeId, ...req.body });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Admin work mode'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
