import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from '../statusCodes';
import IGetJobDetailsUseCase from '../../application/usecases/interfaces/IGetJobDetails.usecase';
import ISearchJobsFromHomeUseCase from '../../application/usecases/interfaces/ISearchJobsFromHome.usecase';
import { inject, injectable } from 'tsyringe';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IGetRecommendedJobsUsecase from '../../application/interfaces/usecases/job/IGetRecommendedJobs.usecase';
import ResponseHandler from '../../utilities/response.handler';

@injectable()
export default class JobController {
  private _responseHandler: ResponseHandler;
  constructor(
    @inject('IGetJobDetailsUsecase') private _getJobDetails: IGetJobDetailsUseCase,
    @inject('SearchJobsFromHomeUsecase') private _SearchJobsFromHome: ISearchJobsFromHomeUseCase,
    @inject('IRecommendedJobsUsecase') private _recommendedJobs: IGetRecommendedJobsUsecase
  ) {
    this._responseHandler = new ResponseHandler();
  }

  async loadJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { jobId } = req.params;

    try {
      const jobDetails = await this._getJobDetails.execute(jobId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job details'),
        jobDetails,
      });

      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async searchJobFromHomePage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';

    try {
      const jobs = await this._SearchJobsFromHome.execute(search);
      console.log('Job fetched result count of the jobs', jobs?.length ?? null);
      this._responseHandler.success(
        res,
        StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Jobs'),
        StatusCodes.OK,
        jobs
      );

      // res.status(StatusCodes.OK).json({
      //   success: true,
      //   message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job'),
      //   result: jobs,
      // });

      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async getRecommendedJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logedUserId = req.user.id;

    try {
      const result = await this._recommendedJobs.execute(logedUserId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recommended jobs'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
