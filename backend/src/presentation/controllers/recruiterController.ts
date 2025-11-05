import { NextFunction, Request, Response } from 'express';
import { Auth } from '../../middlewares/auth';
import RegisterRecruiterUseCase from '../../application/usecases/recruiter/CreateRecruiter.usecase';
import { StatusCodes } from '../statusCodes';
import VerifyRecruiterUseCase from '../../application/usecases/recruiter/VerifyRecruiter.usecase';
import { LoginRecruiterUseCase } from '../../application/usecases/recruiter/LoginRecruiter.usecase';
import SaveBasicsUseCase from '../../application/usecases/recruiter/SaveBasicsRecruiter.usecase';
import { LoadRecruiterProfileOverviewUsecase } from '../../application/usecases/recruiter/LoadRecruiterProfileOverview.usecase';
import CreateJobUseCase from '../../application/usecases/recruiter/CreateJob.usecase';
import IRegisterRecruiterUseCase from '../../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase';
import ICreateJobUseCase from '../../application/interfaces/usecases/recruiter/ICreateJob.usecase';
import IVerifyRecruiterUseCase from '../../application/usecases/recruiter/interface/IVerifyRecruiter.usecase';
import ILoginRecruiterrUseCase from '../../application/usecases/recruiter/interface/ILoginRecruiter.usecase';
import ISaveBasicsUseCase from '../../application/usecases/recruiter/interface/ISaveBasicsRecruiter.usecase';
import ILoadRecruiterProfileOverviewUsecase from '../../application/interfaces/usecases/recruiter/ILoadRecruiterProfileOverview.usecase';
import IRejectCandidate from '../../application/usecases/recruiter/interface/IRejectCandidate.usecase';
import IRejectCandidateUseCase from '../../application/usecases/recruiter/interface/IRejectCandidate.usecase';
import ICreateNotification from '../../application/interfaces/usecases/shared/ICreateNotification.usecase';
import IFinalizeShortlist from '../../application/usecases/recruiter/interface/IFinalizeShortlist.usecase';
import IGetFinalizedShortlistData from '../../application/usecases/recruiter/interface/IGetFinalizedData.usecase';
import IGetJobApplicationsUseCase from '../../application/usecases/recruiter/interface/IGetJobApplications.usecase';
import IGetJobApplicationDetailsUseCase from '../../application/usecases/recruiter/interface/IGetJobApplicationDetails.usecase';
import mapToCreateRecruiterDTOFromRequest from '../mappers/recruiter/mapToCreateRecruiterDTOFromRequest';
import mapToVerifyRecruiterDTOFromRequest from '../mappers/recruiter/mapToVerifyRecruiterDTOFromRequest';
import mapToLoginRecruiterDTOFromRequest from '../mappers/recruiter/mapToLoginRecruiterDTOFromRequest';
import mapToSaveIntroDetailsDTOFromRequest from '../mappers/recruiter/mapToSaveIntroDetailsDTOFromRequest';
import mapToCreateJobDTOFromRequest from '../mappers/recruiter/mapToCreateJobDTOFromRequest';
import mapToCreateNotificationFromRejectRequest from '../mappers/recruiter/mapToCreateNotificationFromRejectRequest';
import { inject, injectable } from 'tsyringe';
import mapCreateUserRequestToDTO from '../mappers/user/mapCreateUserRequestToDTO.refactored';
import ICreateUserUseCase from '../../application/interfaces/usecases/user/ICreateUser.usecase';
import { RecruiterRegisterValidator } from '../../application/validators/recruiterRegister.validator';
import IVerifyUserUseCase from '../../application/interfaces/usecases/user/IVerifyUser.usecase';
import { VerifyUserValidator } from '../../application/validators/verifyUser.validator';
import mapToVerifyUserDTO from '../mappers/user/mapToVerifyUserRequestDTO';
import ICreateRecruiterUsecase from '../../application/interfaces/usecases/recruiter/ICreateRecruiter.usecase';
import { CreateRecruiterValidator } from '../schemas/recruiter/createRecruiter.schema';
import { CreateJobSchema } from '../schemas/recruiter/createJob.schema';
import ILoadRecruiterJobsUsecase from '../../application/interfaces/usecases/recruiter/ILoadRecruiterJobs.usecase';
import { recruiterJobsSchema } from '../schemas/shared/recruiterJobsQuery.schema';
import mapToLoadRecruiterJobsDTO from '../mappers/recruiter/mapToLoadRecruiterJobsDTO.mapper';
import IEditJobUsecase from '../../application/interfaces/usecases/recruiter/IEditJob.usecase';
import { editJobSchema } from '../schemas/recruiter/editJob.schema';
import mapToEditJobDTOFromRequest from '../mappers/recruiter/mapToEditJobDTOFromRequest';
import IDeleteJobUsecase from '../../application/interfaces/usecases/recruiter/IDeleteJob.usecase';

@injectable()
export default class RecruiterController {
  constructor(
    @inject('ICreateRecruiterUsecase') private _createRecruiter: ICreateRecruiterUsecase,
    @inject('ICreateJobUsecase') private _createJob: ICreateJobUseCase,
    @inject('ILoadRecruiterJobsUsecase') private _loadRecruiterJobs: ILoadRecruiterJobsUsecase,
    @inject('ILoadRecruiterProfileOverviewUsecase')
    private _loadRecruiterProfileOverview: ILoadRecruiterProfileOverviewUsecase,
    @inject('IEditJobUsecase') private _editJob: IEditJobUsecase,
    @inject('IDeleteJobUsecase') private _deleteJob: IDeleteJobUsecase
  ) // @inject('IRegisterRecruiterUseCase')
  // private _registerRecruiterUC: IRegisterRecruiterUseCase,
  // @inject('IVerifyUserUseCase') private _verifyUserUC: IVerifyUserUseCase,
  // @inject('ILoginRecruiterUseCase')
  // private _loginRecruiterUC: ILoginRecruiterrUseCase,
  // @inject('ILoadRecruiterProfileUseCase')
  // private _loadRecruiterProfileUC: ILoadRecruiterProfileUseCase // private _createJobUseCase: ICreateJobUseCase, //usecase interface //usecase interface // private _verifyRecruiterUC: IVerifyRecruiterUseCase, //usecase interface // private _loginRecruiterUC: ILoginRecruiterrUseCase, //usecase interface // private _saveBasicsUC: ISaveBasicsUseCase, //usecase interface // private _loadCompanyProfileUseCase: ILoadRecruiterProfileUseCase, //usecase interface // private _getJobApplications: IGetJobApplicationsUseCase, //usecase interface // private _rejectCandidateJobApplicationUseCase: IRejectCandidateUseCase, // private _createNotificationUseCase: ICreateNotification, // // private _saveShortlistUseCase : IFinalizeShortlist, // // private _getFinalizedShortlistDataUC : IGetFinalizedShortlistData, // private _getJobApplicationDetailsUC: IGetJobApplicationDetailsUseCase
  {}

  async CreateRecruiter(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.user?.id;
    try {
      const validatedData = CreateRecruiterValidator.parse({ userId, ...req.body });
      console.log('Data after parsing from controller-----', validatedData);

      const dto = mapToCreateRecruiterDTOFromRequest({
        organizationDetails: {
          organizationName: validatedData.organizationName,
          organizationType: validatedData.organizationType,
          industry: validatedData.industry,
          organizationContactNumber: validatedData.organizationContactNumber,
          organizationEmail: validatedData.organizationEmail,
          teamStrength: validatedData.teamStrength,
          aboutCompany: validatedData.aboutCompany,
          website: validatedData.website,
          vision: validatedData.vision,
        },
        ...validatedData,
      });

      const result = await this._createRecruiter.execute(dto);

      if (!result) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Something went',
        });
      }

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
    const search = req.query.search as string || ""
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 3
    const sortOption = req.query.sortOption as string || 'Newest'
    const filter = JSON.parse(req.query.filter as string) || {}
    
    try {
      const validateQuery = recruiterJobsSchema.parse({search, page, limit, sortOption, filter})
      const dto = mapToLoadRecruiterJobsDTO({recruiterId:userId, ...validateQuery})
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
    const jobId = req.params.jobId

    try {
      await this._deleteJob.execute(jobId)
      res.status(StatusCodes.OK).json({success:true, message:'Job deleted successfully'})
    } catch (error: unknown) {
      next(error)
    }
  }

  // async verifyRecruiter(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const validatedData = VerifyUserValidator.parse(req.body);
  //     const dto = mapToVerifyUserDTO(validatedData);
  //     const result = await this._verifyUserUC.execute(dto);
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Email verified successfully, please login to continue',
  //     });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked

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

  // // async saveIntroDetailsRecruiter(req: Auth, res: Response): Promise<Response> {
  // //   const id = req.user?.id;
  // //   try {
  // //     const dto = mapToSaveIntroDetailsDTOFromRequest({
  // //       id,
  // //       ...req.body?.details,
  // //     });
  // //     const isSaved = await this._saveBasicsUC.execute(dto);
  // //     return isSaved
  // //       ? res
  // //           .status(StatusCodes.OK)
  // //           .json({ success: true, message: 'Basic details saved' })
  // //       : res
  // //           .status(StatusCodes.BAD_REQUEST)
  // //           .json({ success: false, messsage: 'Something went wrong' });
  // //   } catch (error: unknown) {
  // //     console.log('Error occured while saving basics details', error);
  // //     return res
  // //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //       .json({
  // //         success: false,
  // //         message: 'Internal server error please try again after some time',
  // //       });
  // //   }
  // // } //reworked

  async loadRecruiterProfileData(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;
    try {
      const result = await this._loadRecruiterProfileOverview.execute(id)

      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'something went wrong'})
      }

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
      //validate job details using zod
      const validatedData = CreateJobSchema.parse({ recruiterId: id, ...req.body });
      const dto = mapToCreateJobDTOFromRequest(validatedData);

      const createdJob = await this._createJob.execute(dto);

      if (!createdJob) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
      }

      res.status(StatusCodes.OK).json({ success: true, message: 'job created', job: createdJob });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked

  async editJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const validdateData = editJobSchema.parse(req.body)
      const dto = mapToEditJobDTOFromRequest(validdateData)
      const result = await this._editJob.execute(dto)

      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
      }

      res.status(StatusCodes.OK).json({success:true, message:'Job edited successfully', result})

    } catch (error: unknown) {
      next(error)
    }
  }

  // // async getJobApplications(req: Request, res: Response): Promise<Response> {
  // //   const jobId = req.params.jobId;

  // //   try {
  // //     const result = await this._getJobApplications.execute(jobId);
  // //     return res
  // //       .status(StatusCodes.OK)
  // //       .json({ success: true, message: 'success', result });
  // //   } catch (error: unknown) {
  // //     console.log(error);
  // //     return res
  // //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //       .json({ success: false, message: 'internal server error' });
  // //   }
  // // }

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
