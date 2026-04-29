import { NextFunction, Request, Response } from 'express';
// import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import ICreateJobUseCase from '../../application/interfaces/usecases/job/ICreateJob.usecase';
import ILoadRecruiterProfileOverviewUsecase from '../../application/interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import IGetJobApplicationsUseCase from '../../application/interfaces/usecases/jobApplication/IGetJobApplications.usecase';
import { inject, injectable } from 'tsyringe';
import ICreateRecruiterUsecase from '../../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase.FIX';
import ILoadRecruiterJobsUsecase from '../../application/interfaces/usecases/job/ILoadRecruiterJobs.usecase';
import IEditJobUsecase from '../../application/interfaces/usecases/job/IEditJob.usecase';
import IDeleteJobUsecase from '../../application/interfaces/usecases/job/IDeleteJob.usecase';
import IScheduleInterviewUsecase from '../../application/interfaces/usecases/interview/IScheduleInterview.usecase';
import CreateInterviewDTO from '../../application/DTOs/interview/interview.dto';
import IUpdateCandidateNotes from '../../application/interfaces/usecases/jobApplication/IUpdateCandidateNotes.usecase';
import { JobApplicationDTO } from '../../application/DTOs/jobApplication/jobApplication.dto.FIX';
import IUpdateJobApplicationStatusUsecase from '../../application/interfaces/usecases/jobApplication/IUpdateJobApplicationStatus.usecase';
import UpdateJobApplicationStatusDTO from '../../application/DTOs/jobApplication/UpdateJobApplicationStatus.dto';
import ILoadRecruiterRecentJobs from '../../application/interfaces/usecases/job/ILoadRecruiterRecentJobs.usecase';
import IGetJobTypeListUsecase from '../../application/interfaces/usecases/jobType.admin/IGetJobTypeLists.usecase';
import IGetJobLevelListsUsecase from '../../application/interfaces/usecases/jobLevel.admin/IGetJobLevelLists.usecase';
import IGetWorkModeListsUsecase from '../../application/interfaces/usecases/workMode.admin/IGetWorkModeLists.usecase';
import IGetJobApplicationDetailsUseCase from '../../application/interfaces/usecases/jobApplication/IGetJobApplicationDetails.usecase';
import ILoadRecruiterJobDetailsUsecase from '../../application/interfaces/usecases/job/ILoadRecruiterJobDetails.usecase';
import IGetRecruiterApplicationsUsecase from '../../application/interfaces/usecases/recruiter/IGetRecruiterApplications.usecase';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IRejectRecruiterApplication from '../../application/interfaces/usecases/recruiter/IRejectRecruiterApplication.usecase.FIX';
import IApproveRecruiterApplicationUsecase from '../../application/interfaces/usecases/recruiter/IApproveRecruiterApplication.usecase.FIXED';
import IAdminLoadRecruitersUsecase from '../../application/interfaces/usecases/recruiter/IAdminLoadRecruiters.usecase';
import IAdminLoadRecruiterDetailsUsecase from '../../application/interfaces/usecases/recruiter/IAdminLoadRecruiterDetails.usecase';
import IAdminRevokeRecruiterVerification from '../../application/interfaces/usecases/recruiter/IAdminRevokeRecruiterVerification.usecase';
import IAdminHandlePermissionRevokingUsecase from '../../application/interfaces/usecases/recruiter/IAdminHandlePermissionRevoking.usecase';
import IAdminChangeRecruiterApplicationStatusToUnderReview from '../../application/interfaces/usecases/recruiter/IAdminChangeRecruiterApplicationStatusToUnderReview.usecase';

@injectable()
export default class RecruiterController {
  constructor(
    @inject('ICreateRecruiterUsecase') private _createRecruiter: ICreateRecruiterUsecase,
    @inject('ICreateJobUsecase') private _createJob: ICreateJobUseCase,
    @inject('ILoadRecruiterJobsUsecase') private _loadRecruiterJobs: ILoadRecruiterJobsUsecase,
    @inject('ILoadRecruiterJobDetailsUsecase')
    private _loadRecruiterJobDetails: ILoadRecruiterJobDetailsUsecase,
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
    private _getJobApplicationDetails: IGetJobApplicationDetailsUseCase,
    @inject('IGetRecruiterApplicationsUsecase')
    private _getRecruiterApplications: IGetRecruiterApplicationsUsecase,
    @inject('IRejectRecruiterApplication')
    private _rejectRecruiterApplication: IRejectRecruiterApplication,
    @inject('IAdminChangeRecruiterApplicationStatusToUnderReview')
    private _statusChangeToUnderReview: IAdminChangeRecruiterApplicationStatusToUnderReview,
    @inject('IApproveRecruiterApplicationUsecase')
    private _approveRecruiterApplication: IApproveRecruiterApplicationUsecase,
    @inject('IAdminLoadRecruitersUsecase') private _loadRecruiters: IAdminLoadRecruitersUsecase,
    @inject('IAdminLoadRecruiterDetailsUsecase')
    private _loadRecruiterDetails: IAdminLoadRecruiterDetailsUsecase,
    @inject('IAdminRevokeRecruiterVerificationUsecase')
    private _handleVerificationUpdate: IAdminRevokeRecruiterVerification,
    @inject('IAdminHandlePermissionRevokingUsecase')
    private _handlePermissionRevoking: IAdminHandlePermissionRevokingUsecase
  ) {}

  async createRecruiter(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Recruiter profile'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async LoadRecruiterJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
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

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recruiter jobs'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadRecruiterJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;

    try {
      const result = await this._loadRecruiterJobDetails.execute(jobId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recruiter job details'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;

    try {
      await this._deleteJob.execute(jobId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Delete job'),
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateJobApplicationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const applicationId = req.params.applicationId;
      const result = await this._updateJobApplicationStatus.execute({
        _id: applicationId,
        ...req.body,
      } as UpdateJobApplicationStatusDTO);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('JOb application status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadRecruiterProfileData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.user?.id as string;
    try {
      const result = await this._loadRecruiterProfileOverview.execute(id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recruiter profile data'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked

  async createJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.user?.id as string;
    try {
      const createdJob = await this._createJob.execute({ recruiterId: id, ...req.body });

      if (!createdJob) {
        throw new Error('Can not create job');
      }

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Job'),
        job: createdJob,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked

  async editJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._editJob.execute(req.body);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Job') });
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

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Interview'),
        result,
      });
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
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job applications'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getJobApplicationDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const applicationId = req.params.applicationId;
    try {
      const result = await this._getJobApplicationDetails.execute(applicationId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job application details'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCandidateNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const applicationId = req.params.applicationId;
      const result = await this._updateCandidateNotes.execute({
        _id: applicationId,
        ...req.body,
      } as JobApplicationDTO);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Applicant notes'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getRecentJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const result = await this._loadRecruiterRecentJobs.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recent jobs'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getJobTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getJobTypeLists.execute();
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job types'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobLevels(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getJobLevelLists.execute();
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job levles'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getWorkModes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getWorkModeLists.execute();
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Workmode'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loadRecruiterApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const result = await this._getRecruiterApplications.execute({ page, limit });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recruiter applications'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async rejectRecruiterApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { recruiterId } = req.params;

      const result = await this._rejectRecruiterApplication.execute({
        applicationId: recruiterId,
        ...req.body,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Rejected status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async approveRecruiterApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { recruiterId } = req.params;
      const result = await this._approveRecruiterApplication.execute(recruiterId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Recruiter approve status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async loadRecruiters(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const sort = (req.query.sort as string) || 'joined-latest';
    const recruiterType = (req.query.recruiterType as string) || 'all';
    const recruiterStatus = (req.query.recruiterStatus as string) || 'all';
    try {
      const result = await this._loadRecruiters.execute({
        search,
        page,
        limit,
        sort,
        recruiterType,
        employerStatusFilter: recruiterStatus,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recruiters'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async recruiterDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const recruiterId = req.params.recruiterId as string;

    try {
      const result = await this._loadRecruiterDetails.execute(recruiterId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recruiter details'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async handleRecruiterVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const recruiterId = req.params.recruiterId;
    const action = req.query.action as 'Verified' | 'Revoked';

    try {
      const result = await this._handleVerificationUpdate.execute(recruiterId, action);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Recruiter Verification status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleRecruiterPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    const recruiterId = req.params.recruiterId;
    const action = req.query.action as 'Revoke' | 'Un-Revoke';

    try {
      const result = await this._handlePermissionRevoking.execute(recruiterId, action);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Recruiter Permission status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changeStatusToUnderReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const applicationId = req.params.id;

      const result = await this._statusChangeToUnderReview.execute(applicationId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Recruiter application status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
