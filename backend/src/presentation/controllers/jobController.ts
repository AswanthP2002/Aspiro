import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from '../statusCodes';
import IGetJobsUseCase from '../../application/usecases/interfaces/IGetJobs.usecase';
import IGetJobDetailsUseCase from '../../application/usecases/interfaces/IGetJobDetails.usecase';
import ISearchJobsFromHomeUseCase from '../../application/usecases/interfaces/ISearchJobsFromHome.usecase';
export default class JobController {
  constructor(
    private _getJobs: IGetJobsUseCase,
    private _getJobDetails: IGetJobDetailsUseCase,
    private _SearchJobsFromHome: ISearchJobsFromHomeUseCase
  ) {}

  async loadJobs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortvalue = (req.query.sort as string) || 'job-latest';
    const minSalary = req.query?.minSalary as string;
    const maxSalary = req.query?.maxSalary as string;
    //console.log('filter before parsing', req.query.filter)
    const filters = JSON.parse(req.query.filter as string) || {};
    //console.log('filter after parsing', filters)

    try {
      console.log('job request from the backend', req.query);
      const result = await this._getJobs.execute({
        search,
        page,
        limit,
        sort: sortvalue,
        filters,
        maxSalary,
        minSalary,
      });
      console.log('Result before sending', result);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs fetched successfully', result });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async loadJobDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

  async searchJobFromHomePage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const search = (req.query.search as string) || '';
    //console.log('search query from the controller', search)

    try {
      const jobs = await this._SearchJobsFromHome.execute(search);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'success', jobs });

      return;
    } catch (error: unknown) {
      next(error);
    }
  }
}
