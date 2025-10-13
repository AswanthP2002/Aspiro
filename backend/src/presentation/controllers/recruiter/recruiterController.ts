import { NextFunction, Request, Response } from 'express';
import { Auth } from '../../../middlewares/auth';
import RegisterRecruiterUseCase from '../../../application/usecases/recruiter/RegisterRecruiter.usecase';
import { StatusCodes } from '../../statusCodes';
import VerifyRecruiterUseCase from '../../../application/usecases/recruiter/VerifyRecruiter.usecase';
import { LoginRecruiterUseCase } from '../../../application/usecases/recruiter/LoginRecruiter.usecase';
import SaveBasicsUseCase from '../../../application/usecases/recruiter/SaveBasicsRecruiter.usecase';
import { LoadRecruiterProfileDataUseCase } from '../../../application/usecases/recruiter/LoadRecruiterProfile.usecase';
import CreateJobUseCase from '../../../application/usecases/recruiter/CreateJob.usecase';
import IRegisterRecruiterUseCase from '../../../application/usecases/recruiter/interface/IRegisterRecruiter.usecase';
import ICreateJobUseCase from '../../../application/usecases/recruiter/interface/ICreateJob.usecase';
import IVerifyRecruiterUseCase from '../../../application/usecases/recruiter/interface/IVerifyRecruiter.usecase';
import ILoginRecruiterrUseCase from '../../../application/usecases/recruiter/interface/ILoginRecruiter.usecase';
import ISaveBasicsUseCase from '../../../application/usecases/recruiter/interface/ISaveBasicsRecruiter.usecase';
import ILoadRecruiterProfileUseCase from '../../../application/usecases/recruiter/interface/ILoadRecruiterProfile.usecase';
import IRejectCandidate from '../../../application/usecases/recruiter/interface/IRejectCandidate.usecase';
import IRejectCandidateUseCase from '../../../application/usecases/recruiter/interface/IRejectCandidate.usecase';
import ICreateNotification from '../../../application/usecases/common/interface/ICreateNotification.usecase';
import IFinalizeShortlist from '../../../application/usecases/recruiter/interface/IFinalizeShortlist.usecase';
import IGetFinalizedShortlistData from '../../../application/usecases/recruiter/interface/IGetFinalizedData.usecase';
import IGetJobApplicationsUseCase from '../../../application/usecases/recruiter/interface/IGetJobApplications.usecase';
import IGetJobApplicationDetailsUseCase from '../../../application/usecases/recruiter/interface/IGetJobApplicationDetails.usecase';
import mapToCreateRecruiterDTOFromRequest from '../../mappers/recruiter/mapToCreateRecruiterDTOFromRequest';
import mapToVerifyRecruiterDTOFromRequest from '../../mappers/recruiter/mapToVerifyRecruiterDTOFromRequest';
import mapToLoginRecruiterDTOFromRequest from '../../mappers/recruiter/mapToLoginRecruiterDTOFromRequest';
import mapToSaveIntroDetailsDTOFromRequest from '../../mappers/recruiter/mapToSaveIntroDetailsDTOFromRequest';
import mapToCreateJobDTOFromRequest from '../../mappers/recruiter/mapToCreateJobDTOFromRequest';
import mapToCreateNotificationFromRejectRequest from '../../mappers/recruiter/mapToCreateNotificationFromRejectRequest';
import { inject, injectable } from 'tsyringe';
import mapCreateUserRequestToDTO from '../../mappers/mapCreateUserRequestToDTO.refactored';
import ICreateUserUseCase from '../../../application/usecases/interfaces/ICreateUser.usecase';
import { RecruiterRegisterValidator } from '../../../application/validators/recruiterRegister.validator';
import IVerifyUserUseCase from '../../../application/usecases/interfaces/IVerifyUser.usecase';
import { VerifyUserValidator } from '../../../application/validators/verifyUser.validator';
import mapToVerifyUserDTO from '../../mappers/candidate/mapToVerifyUserRequestDTO';

@injectable()
export default class RecruiterController {
  constructor(
    @inject('ICreateUserUseCase') private _createUserUC: ICreateUserUseCase,
    @inject('IRegisterRecruiterUseCase')
    private _registerRecruiterUC: IRegisterRecruiterUseCase,
    @inject('IVerifyUserUseCase') private _verifyUserUC: IVerifyUserUseCase,
    @inject('ILoginRecruiterUseCase')
    private _loginRecruiterUC: ILoginRecruiterrUseCase,
    @inject('ILoadRecruiterProfileUseCase')
    private _loadRecruiterProfileUC: ILoadRecruiterProfileUseCase // private _createJobUseCase: ICreateJobUseCase, //usecase interface //usecase interface // private _verifyRecruiterUC: IVerifyRecruiterUseCase, //usecase interface // private _loginRecruiterUC: ILoginRecruiterrUseCase, //usecase interface // private _saveBasicsUC: ISaveBasicsUseCase, //usecase interface // private _loadCompanyProfileUseCase: ILoadRecruiterProfileUseCase, //usecase interface // private _getJobApplications: IGetJobApplicationsUseCase, //usecase interface // private _rejectCandidateJobApplicationUseCase: IRejectCandidateUseCase, // private _createNotificationUseCase: ICreateNotification, // // private _saveShortlistUseCase : IFinalizeShortlist, // // private _getFinalizedShortlistDataUC : IGetFinalizedShortlistData, // private _getJobApplicationDetailsUC: IGetJobApplicationDetailsUseCase
  ) {}

  // async registerRecruiter(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const validatedData = RecruiterRegisterValidator.parse(req.body);
  //     const dto = mapCreateUserRequestToDTO({
  //       role: 'recruiter',
  //       ...validatedData,
  //     });
  //     const createUser = await this._createUserUC.execute(dto);
  //     const createRecruiter = await this._registerRecruiterUC.execute({
  //       userId: createUser?._id as string,
  //       name: validatedData.fullName,
  //     });
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Recruiter created',
  //       email: createUser?.email,
  //       id: createUser?._id,
  //     });
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked

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

  // async loadRecruiterProfileData(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const id = req.user.id;
  //   try {
  //     const recruiterDetails = await this._loadRecruiterProfileUC.execute(id);

  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Recruiter details fetched successfully',
  //       recruiterDetails,
  //     });
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked

  // // async createJob(req: Auth, res: Response): Promise<Response> {
  // //   const id = req.user.id;
  // //   try {
  // //     const dto = mapToCreateJobDTOFromRequest({ companyId: id, ...req.body });
  // //     const createdJob = await this._createJobUseCase.execute(dto);
  // //     return res
  // //       .status(StatusCodes.OK)
  // //       .json({ success: true, message: 'job created', job: createdJob });
  // //   } catch (error: unknown) {
  // //     console.log('Error occured while creating the job', error);
  // //     return res
  // //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //       .json({
  // //         success: false,
  // //         message: 'Internal server error, please try again after some time',
  // //       });
  // //   }
  // // } //reworked

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
