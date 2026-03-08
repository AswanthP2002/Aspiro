import { NextFunction, Request, Response } from 'express';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import ICreateJobUseCase from '../../application/interfaces/usecases/recruiter/ICreateJob.usecase';
import ILoadRecruiterProfileOverviewUsecase from '../../application/interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import IGetJobApplicationsUseCase from '../../application/interfaces/usecases/recruiter/IGetJobApplications.usecase';
import { inject, injectable } from 'tsyringe';
import ICreateRecruiterUsecase from '../../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase.FIX';
import ILoadRecruiterJobsUsecase from '../../application/interfaces/usecases/recruiter/ILoadRecruiterJobs.usecase';
import IEditJobUsecase from '../../application/interfaces/usecases/recruiter/IEditJob.usecase';
import IDeleteJobUsecase from '../../application/interfaces/usecases/recruiter/IDeleteJob.usecase';
import IScheduleInterviewUsecase from '../../application/interfaces/usecases/recruiter/IScheduleInterview.usecase';
import CreateInterviewDTO from '../../application/DTOs/user/interview.dto';
import IUpdateCandidateNotes from '../../application/interfaces/usecases/recruiter/IUpdateCandidateNotes.usecase';
import { JobApplicationDTO } from '../../application/DTOs/job/jobApplication.dto.FIX';
import IUpdateJobApplicationStatusUsecase from '../../application/interfaces/usecases/recruiter/IUpdateJobApplicationStatus.usecase';
import UpdateJobApplicationStatusDTO from '../../application/DTOs/recruiter/UpdateJobApplicationStatus.dto';
import ILoadRecruiterRecentJobs from '../../application/interfaces/usecases/recruiter/ILoadRecruiterRecentJobs.usecase';
import IGetJobTypeListUsecase from '../../application/interfaces/usecases/recruiter/IGetJobTypeLists.usecase';
import IGetJobLevelListsUsecase from '../../application/interfaces/usecases/recruiter/IGetJobLevelLists.usecase';
import IGetWorkModeListsUsecase from '../../application/interfaces/usecases/recruiter/IGetWorkModeLists.usecase';
import IGetJobApplicationDetailsUseCase from '../../application/interfaces/usecases/recruiter/IGetJobApplicationDetails.usecase';

@injectable()
export default class RecruiterController {
  constructor(
    @inject('ICreateRecruiterUsecase') private _createRecruiter: ICreateRecruiterUsecase,
    @inject('ICreateJobUsecase') private _createJob: ICreateJobUseCase,
    @inject('ILoadRecruiterJobsUsecase') private _loadRecruiterJobs: ILoadRecruiterJobsUsecase,
    @inject('ILoadRecruiterProfileOverviewUsecase')
    private _loadRecruiterProfileOverview: ILoadRecruiterProfileOverviewUsecase,
    @inject('IEditJobUsecase') private _editJob: IEditJobUsecase,
    @inject('IDeleteJobUsecase') private _deleteJob: IDeleteJobUsecase,
    @inject('IScheduleInterviewUsecase') private _scheduleInterview: IScheduleInterviewUsecase,
    @inject('IGetJobApplicationsUsecase') private _getJobApplications: IGetJobApplicationsUseCase,
    @inject('IUpdateCandidateNotesUsecase') private _updateCandidateNotes: IUpdateCandidateNotes,
    @inject('IUpdateJobApplicationStatusUsecase')
    private _updateJobApplicationStatus: IUpdateJobApplicationStatusUsecase,
    @inject('ILoadRecruiterRecentJobs') private _loadRecruiterRecentJobs: ILoadRecruiterRecentJobs,
    @inject('IGetJobTypeListsUsecase') private _getJobTypeLists: IGetJobTypeListUsecase,
    @inject('IGetJobLevelListsUsecase') private _getJobLevelLists: IGetJobLevelListsUsecase,
    @inject('IGetWorkModeListsUsecase') private _getWorkModeLists: IGetWorkModeListsUsecase,
    @inject('IGetJobApplicationDetailsUsecase')
    private _getJobApplicationDetails: IGetJobApplicationDetailsUseCase
  ) {}

  async createRecruiter(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.user?.id;
    try {
      const file = req.file?.buffer;
      const path = req.file?.originalname.split('.')[0];
      const result = await this._createRecruiter.execute({
        userId: userId,
        verificationDocumentFile: file,
        verificationDocumentFilePath: path,
        ...req.body,
      });

      res.status(StatusCodes.CREATED).json({
        succcess: true,
        message: 'Recruiter profile created successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async LoadRecruiterJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortOption = (req.query.sortOption as string) || 'Newest';
    const filter = JSON.parse(req.query.filter as string) || {};

    try {
      const result = await this._loadRecruiterJobs.execute({
        recruiterId: userId,
        search,
        page,
        limit,
        sortOption,
        filter,
      });

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;

    try {
      await this._deleteJob.execute(jobId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Job deleted successfully' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateJobApplicationStatus(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const applicationId = req.params.applicationId;
      const result = await this._updateJobApplicationStatus.execute({
        _id: applicationId,
        ...req.body,
      } as UpdateJobApplicationStatusDTO);

      res.status(StatusCodes.OK).json({ success: true, message: 'Updated', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadRecruiterProfileData(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;
    try {
      const result = await this._loadRecruiterProfileOverview.execute(id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Recruiter details fetched successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked

  async createJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;
    try {
      const createdJob = await this._createJob.execute({ recruiterId: id, ...req.body });

      if (!createdJob) {
        throw new Error('Can not create job');
      }

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'job created', job: createdJob });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked

  async editJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._editJob.execute(req.body);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
      }

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Job edited successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async scheduleInterview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const candidateId = req.params.candidateId;
      const jobId = req.params.jobId;
      const result = await this._scheduleInterview.execute({
        candidateId,
        jobId,
        ...(req.body as CreateInterviewDTO),
      });

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Interview Scheduled', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getJobApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;
    const search = (req.query.search as string) || '';
    const limit = parseInt(req.query.limit as string) || 5;
    const page = parseInt(req.query.page as string) || 1;
    const filter = (req.query.status as string) || 'all';
    try {
      const result = await this._getJobApplications.execute({
        jobId,
        search,
        page,
        limit,
        filter,
      });
      res.status(StatusCodes.OK).json({ success: true, message: 'success', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getJobApplicationDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const applicationId = req.params.applicationId;
    try {
      const result = await this._getJobApplicationDetails.execute(applicationId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Applicatio details fetched succesfully', result });
    } catch (error) {
      next(error);
    }
  }

  async updateCandidateNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { applicationId } = req.params;
      const result = await this._updateCandidateNotes.execute({
        _id: applicationId,
        ...req.body,
      } as JobApplicationDTO);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Notes updated',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getRecentJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const result = await this._loadRecruiterRecentJobs.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Recent jobs fetched successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getJobTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getJobTypeLists.execute();
      res.status(StatusCodes.OK).json({ success: true, message: 'Fetched', result });
    } catch (error) {
      next(error);
    }
  }

  async getJobLevels(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getJobLevelLists.execute();
      res.status(StatusCodes.OK).json({ success: true, message: 'Fetched', result });
    } catch (error) {
      next(error);
    }
  }

  async getWorkModes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getWorkModeLists.execute();
      res.status(StatusCodes.OK).json({ success: true, message: 'Fetched', result });
    } catch (error) {
      next(error);
    }
  }
}
