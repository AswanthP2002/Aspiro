import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from '../statusCodes';
import IGetJobDetailsUseCase from '../../application/usecases/interfaces/IGetJobDetails.usecase.FIX';
import ISearchJobsFromHomeUseCase from '../../application/usecases/interfaces/ISearchJobsFromHome.usecase';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class JobController {
  constructor(
    @inject('IGetJobDetailsUsecase') private _getJobDetails: IGetJobDetailsUseCase,
    @inject('SearchJobsFromHomeUsecase') private _SearchJobsFromHome: ISearchJobsFromHomeUseCase
  ) {}

  async loadJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { jobId } = req.params;

    try {
      const jobDetails = await this._getJobDetails.execute(jobId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Job details fetched', jobDetails });

      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async searchJobFromHomePage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';

    try {
      const jobs = await this._SearchJobsFromHome.execute(search);

      res.status(StatusCodes.OK).json({ success: true, message: 'success', jobs });

      return;
    } catch (error: unknown) {
      next(error);
    }
  }
}
