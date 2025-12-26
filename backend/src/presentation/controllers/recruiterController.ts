import { NextFunction, Request, Response } from 'express';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import ICreateJobUseCase from '../../application/interfaces/usecases/recruiter/ICreateJob.usecase';
import ILoadRecruiterProfileOverviewUsecase from '../../application/interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import IGetJobApplicationsUseCase from '../../application/interfaces/usecases/recruiter/IGetJobApplications.usecase';
import mapToCreateJobDTOFromRequest from '../mappers/recruiter/mapToCreateJobDTOFromRequest';
import { inject, injectable } from 'tsyringe';
import ICreateRecruiterUsecase from '../../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase.FIX';
import ILoadRecruiterJobsUsecase from '../../application/interfaces/usecases/recruiter/ILoadRecruiterJobs.usecase';
import { recruiterJobsSchema } from '../schemas/shared/recruiterJobsQuery.schema';
import mapToLoadRecruiterJobsDTO from '../mappers/recruiter/mapToLoadRecruiterJobsDTO.mapper';
import IEditJobUsecase from '../../application/interfaces/usecases/recruiter/IEditJob.usecase';
import { editJobSchema } from '../schemas/recruiter/editJob.schema';
import mapToEditJobDTOFromRequest from '../mappers/recruiter/mapToEditJobDTOFromRequest';
import IDeleteJobUsecase from '../../application/interfaces/usecases/recruiter/IDeleteJob.usecase';
import IScheduleInterviewUsecase from '../../application/interfaces/usecases/recruiter/IScheduleInterview.usecase';
import CreateInterviewDTO from '../../application/DTOs/user/interview.dto';
import IUpdateCandidateNotes from '../../application/interfaces/usecases/recruiter/IUpdateCandidateNotes.usecase';
import { JobApplicationDTO } from '../../application/DTOs/candidate -LEGACY/jobApplication.dto.FIX';
import IUpdateJobApplicationStatusUsecase from '../../application/interfaces/usecases/recruiter/IUpdateJobApplicationStatus.usecase';
import UpdateJobApplicationStatusDTO from '../../application/DTOs/recruiter/UpdateJobApplicationStatus.dto';
import { plainToInstance } from 'class-transformer';
import CreateRecruiterDTO from '../../application/DTOs/recruiter/recruiter.dto.FIX';
import { validate, ValidationError } from 'class-validator';
import ILoadRecruiterRecentJobs from '../../application/interfaces/usecases/recruiter/ILoadRecruiterRecentJobs.usecase';

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
    @inject('ILoadRecruiterRecentJobs') private _loadRecruiterRecentJobs: ILoadRecruiterRecentJobs
  ) {}

  async createRecruiter(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.user?.id;
    try {
      const dto = plainToInstance(CreateRecruiterDTO, { userId, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._createRecruiter.execute(dto);

      res.status(StatusCodes.CREATED).json({
        succcess: true,
        message: 'Recruiter profile created successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked

  async LoadRecruiterJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortOption = (req.query.sortOption as string) || 'Newest';
    const filter = JSON.parse(req.query.filter as string) || {};

    try {
      const validateQuery = recruiterJobsSchema.parse({ search, page, limit, sortOption, filter });
      const dto = mapToLoadRecruiterJobsDTO({ recruiterId: userId, ...validateQuery });
      const result = await this._loadRecruiterJobs.execute(dto);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
      }

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

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
  }

  // async loginRecruiter(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const dto = mapToLoginRecruiterDTOFromRequest(req.body);
  //     const result: any = await this._loginRecruiterUC.execute(dto);
  //     const { refreshToken } = result;
  //     res
  //       .status(StatusCodes.OK)
  //       .cookie('refreshToken', refreshToken, {
  //         httpOnly: true,
  //         secure: false,
  //         sameSite: 'lax',
  //         maxAge: 24 * 60 * 60 * 1000,
  //       })
  //       .json({
  //         success: true,
  //         message: 'Recruiter loged in successfully',
  //         result,
  //       });
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked

  // // async recruiterLogout(req: Auth, res: Response): Promise<Response> {
  // //   try {
  // //     res.clearCookie('recruiterRefreshToken', {
  // //       httpOnly: true,
  // //       secure: false,
  // //       sameSite: 'lax',
  // //     });

  // //     return res
  // //       .status(StatusCodes.OK)
  // //       .json({ success: true, message: 'Logouted successfully' });
  // //   } catch (error: unknown) {
  // //     console.log('Error occured while recruiter logout', error);
  // //     return res
  // //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //       .json({
  // //         success: false,
  // //         message: 'Something went wrong, please try again after some time',
  // //       });
  // //   }
  // // } //reworked

  async loadRecruiterProfileData(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;
    try {
      const result = await this._loadRecruiterProfileOverview.execute(id);

      // if(!result){
      //   res.status(StatusCodes.NOT_FOUND).json({success:false, message:'something went wrong'})
      //   return
      // }
      //console.log('---- result ----', result)
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
      const dto = mapToCreateJobDTOFromRequest({ recruiterId: id, ...req.body });

      const createdJob = await this._createJob.execute(dto);

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
      const validdateData = editJobSchema.parse(req.body);
      const dto = mapToEditJobDTOFromRequest(validdateData);
      const result = await this._editJob.execute(dto);

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

    try {
      const result = await this._getJobApplications.execute(jobId);
      res.status(StatusCodes.OK).json({ success: true, message: 'success', result });
    } catch (error: unknown) {
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

  // // async rejectCandidateJobApplication(
  // //   req: Auth,
  // //   res: Response
  // // ): Promise<Response> {
  // //   const { applicationId } = req.params;
  // //   const message = req.body.message as string;
  // //   const reason = req.body.reason as string;
  // //   const id = req.user.id;
  // //   //title : string, description : string, type, relatedid

  // //   try {
  // //     const rejectResult =
  // //       await this._rejectCandidateJobApplicationUseCase.execute(applicationId);

  // //     if (!rejectResult)
  // //       return res
  // //         .status(StatusCodes.BAD_REQUEST)
  // //         .json({
  // //           success: false,
  // //           message:
  // //             'Can not reject request right now, please try again after some time',
  // //         });
  // //     const dto = mapToCreateNotificationFromRejectRequest({
  // //       rejector: id,
  // //       rejectee: req.body.candidateId,
  // //       message: req.body.description,
  // //       ...req.body,
  // //     });

  // //     const createNotificationResult =
  // //       await this._createNotificationUseCase.execute(dto);

  // //     if (createNotificationResult) {
  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({
  // //           success: true,
  // //           message: 'Application rejected successfully',
  // //         });
  // //     }
  // //     return res
  // //       .status(StatusCodes.BAD_REQUEST)
  // //       .json({ success: false, message: 'Something went wrong' });
  // //   } catch (error: unknown) {
  // //     console.log(
  // //       'error occured while rejecting the candidate application',
  // //       error
  // //     );
  // //     return res
  // //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //       .json({
  // //         success: false,
  // //         message: 'Internal server error, please try again after some time',
  // //       });
  // //   }
  // // }

  // // // async finalizeShortlist(req : Auth, res : Response) : Promise<Response> {
  // // //     const {jobId} = req.params
  // // //     const applications = req.body.applications
  // // //     const recruiterId = req.user?.id

  // // //     try {
  // // //         const result = await this._saveShortlistUseCase.execute(jobId, recruiterId, applications)
  // // //         return res.status(StatusCodes.OK).json({success:true, message:'Shortlist finalized'})
  // // //     } catch (error : unknown) {
  // // //         console.log('Error occured while saving shortlist', error)
  // // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
  // // //     }
  // // // }

  // // // async getFinalizedShortlistData(req : Auth, res : Response) : Promise<Response> {
  // // //     const {jobId} = req.params
  // // //     console.log('jobid before fetching', jobId)
  // // //     try {
  // // //         const result = await this._getFinalizedShortlistDataUC.execute(jobId)
  // // //         return res.status(StatusCodes.OK).json({success:true, message:'Data fetched successfully', result})
  // // //     } catch (error : unknown) {
  // // //         console.log('error occured while fetching finalized list', error)
  // // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
  // // //     }
  // // // }

  // // async getJobApplicationDetails(req: Auth, res: Response): Promise<Response> {
  // //   const applicationId = req.params?.applicationId as string;
  // //   try {
  // //     const result = await this._getJobApplicationDetailsUC.execute(
  // //       applicationId
  // //     );
  // //     return result
  // //       ? res
  // //           .status(StatusCodes.OK)
  // //           .json({
  // //             success: true,
  // //             message: 'Application details fetched successfully',
  // //             result,
  // //           })
  // //       : res
  // //           .status(StatusCodes.BAD_REQUEST)
  // //           .json({
  // //             success: false,
  // //             message: 'Can not fetch application details right now',
  // //           });
  // //   } catch (error: unknown) {
  // //     console.log('Error occured while fetching application details', error);
  // //     return res
  // //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //       .json({
  // //         success: false,
  // //         message: 'Internal server error, please try again after some time',
  // //       });
  // //   }
  // // }
}
