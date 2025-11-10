import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { AdminAuth, Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import IAdminLoginUseCase from '../../application/interfaces/usecases/admin/IAdminLogin.usecase';
import IBlockCandidateUseCase from '../../application/interfaces/usecases/admin/IAdminBlockUser.usecase';
import IBlockCompanyUseCase from '../../application/usecases/admin/interfaces/IBlockCompany.usecase';
import IBlockJobUseCase from '../../application/usecases/admin/interfaces/IBlockJob.usecase';
import ICloseCompanyUseCase from '../../application/usecases/admin/interfaces/ICloseCompany.usecase';
import ILoadCandidateDetailsUseCase from '../../application/interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import ILoadCandidateUseCase from '../../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase';
import ILoadCompanyDetailsUseCase from '../../application/usecases/admin/interfaces/ILoadCompanyDetails.usecase';
import ILoadCompaniesUseCase from '../../application/interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import ILoadJobsUseCase from '../../application/usecases/admin/interfaces/ILoadJobs.usecase';
import ILoadJobDetailsUseCase from '../../application/usecases/admin/interfaces/ILoadJobDetails.usecase';
import IRejectJobUseCase from '../../application/usecases/admin/interfaces/IRejectJob.usecase';
import IUnblockCompanyUseCase from '../../application/usecases/admin/interfaces/IUnblockCompany.usecase';
import IUnblockCandidateUseCase from '../../application/interfaces/usecases/admin/IAdminUnblockUser.usecase';
import IUnblockJobUseCase from '../../application/usecases/admin/interfaces/IUnblockJob.usecase';
import IUnrejectJobUseCase from '../../application/usecases/admin/interfaces/IUnrejectJob.usecase';
import IFindCandidateByUserIdUseCase from '../../application/usecases/candidate/interface/IFindCandidateByUserId.usecase';
import IFindCandidateByCandidateIdUseCase from '../../application/usecases/interfaces/IFindCandidateByCandidateID.usecase';
import { userLoginSchema } from '../schemas/user/userLogin.schema';
import mapToUserLoginDTO from '../mappers/user/mapToUserLoginDTO';
import ILoadUsersAdminUseCase from '../../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase';
import { loadUsersSchema } from '../schemas/admin/loadUsers.schema';
import mapRequestToLoadUsersQueryDto from '../mappers/user/mapRequestToLoadUsersQueryDto';
import IAdminLoadUserDetailsUsecase from '../../application/interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import { userIdSchema } from '../schemas/user/userId.schema';
import IAdminBlockUserUsecase from '../../application/interfaces/usecases/admin/IAdminBlockUser.usecase';
import IAdminUnblockUserUsecase from '../../application/interfaces/usecases/admin/IAdminUnblockUser.usecase';
import ILoadJobsAggregatedUsecase from '../../application/interfaces/usecases/user/IloadJobsAggregated.usecase';
import mapToLoadJobsQueryDTOFromRequest from '../mappers/user/mapLoadJobsQueryFromRequest.mapper';
import { recruiterJobsSchema } from '../schemas/shared/recruiterJobsQuery.schema';

@injectable()
export class AdminController {
  constructor(
    @inject('IAdminLoginUseCase') private _adminLoginUC: IAdminLoginUseCase,
    @inject('ILoadUsersAdminUsecase') private _loadUsersAdminUC: ILoadUsersAdminUseCase,
    @inject('IAdminLoadUserDetailsUsecase') private _loadUserDetails: IAdminLoadUserDetailsUsecase, // @inject('ILoadCandidatesUseCase')
    @inject('IAdminBlockUserUsecase') private _blockUser: IAdminBlockUserUsecase, // private _loadCandidatesUC: ILoadCandidateUseCase, //usecase interface
    @inject('IAdminUnblockUserUsecase') private _unblockUser: IAdminUnblockUserUsecase,
    @inject('ILoadJobsAggregatedUsecase') private _loadJobs: ILoadJobsAggregatedUsecase
  ) // // private _loadCompaniesUC: ILoadCompaniesUseCase, //usecase interface
  // @inject('ILoadCandidateDetailsUseCase')
  // private _loadCandidateDetailsUC: ILoadCandidateDetailsUseCase, //usecase interface

  // private _blockCandidateUC: IBlockCandidateUseCase, //usecase interface
  // @inject('IFindCandidateByUserIdUseCase')
  // private _findCandidateByUserIdUC: IFindCandidateByUserIdUseCase,
  // @inject('IUnblockCandidateUseCase')
  // private _unblockCandidateUC: IUnblockCandidateUseCase,
  // @inject('IFindCandidateByCandidateIDUseCase')
  // private _findCandidateByCandidateIdUC: IFindCandidateByCandidateIdUseCase,
  // @inject('ILoadCompaniesUseCase')
  // private _loadComapniesUC: ILoadCompaniesUseCase // private _unblockCandidateUC: IUnblockCandidateUseCase, //usecase interface // private _loadCompanyDetailsUC: ILoadCompanyDetailsUseCase, //usecase interface // private _blockCompanyUC: IBlockCompanyUseCase, //usecase interface // private _unblockCompanyUC: IUnblockCompanyUseCase, //usecase interface // private _closeCompanyUC: ICloseCompanyUseCase, //usecase interface // private _loadJobsUC: ILoadJobsUseCase, //usecase interface // private _loadJobDetails: ILoadJobDetailsUseCase, //usecase interface // private _blockJobUC: IBlockJobUseCase, //usecase interface // private _unblockJobUC: IUnblockJobUseCase, //usecase interface // private _rejectJobUC: IRejectJobUseCase, //usecase interface // private _unrejectJobUC: IUnrejectJobUseCase //usecase interface
  {}

  async adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validateInput = userLoginSchema.parse(req.body);
      const dto = mapToUserLoginDTO({ ...validateInput });
      const result: any = await this._adminLoginUC.execute(dto);
      const { refreshToken } = result;

      res
        .status(StatusCodes.OK)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false, //will change to true when it ready for production
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: 'Admin loged in successfully',
          result: { user: result?.user, role: result?.role, accessToken: result?.token },
        });
    } catch (error: unknown) {
      next(error);
    }
  } //common middleware

  // async logoutAdmin(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     res.clearCookie('refreshToken', {
  //       httpOnly: true,
  //       secure: false,
  //       sameSite: 'lax',
  //     });

  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'Admin logout successfull' });
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // }

  async loadUsers(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1; // Removed redundant optional chaining
    const limit = parseInt(req.query.limit as string) || 3; // Removed redundant optional chaining
    const sort = (req.query.sort as string) || ''; // Added default for sort
    let filter = JSON.parse(req.query?.filter as string) || {}; //: Record<string, unknown> = {}; // Explicitly type filter

    try {
      const validatedQuery = loadUsersSchema.parse({
        search,
        page,
        limit,
        sort,
        filter,
      });
      const dto = mapRequestToLoadUsersQueryDto(validatedQuery);
      const result = await this._loadUsersAdminUC.execute(dto);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Users details fetched successfully',
        result,
        pagination: { page, limit },
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async loadCandidateDetails(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    console.log('candidate id from the frontend', userId);
    //return
    try {
      const validatedUserId = userIdSchema.parse({ id: userId });

      const result = await this._loadUserDetails.execute(validatedUserId.id);
      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went worng' });
        return;
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Candidate Details fetched successfully',
        result,
      });

      return;
    } catch (error: any) {
      next(error);
    }
  }

  // // async loadCompanies(
  // //   req: Auth,
  // //   res: Response,
  // //   next: NextFunction
  // // ): Promise<void> {
  // //   //company list
  // //   const search = (req.query.search as string) || '';
  // //   const page = parseInt(req.query.page as string) || 1;
  // //   const limit = parseInt(req.query.limit as string) || 3;
  // //   const sort = (req.query.sort as string) || 'joined-latest';
  // //   try {
  // //     const result = await this._loadComapniesUC.execute(
  // //       search,
  // //       page,
  // //       limit,
  // //       sort
  // //     );

  // //     res.status(201).json({
  // //       success: true,
  // //       message: 'Company list fetched successfully',
  // //       result,
  // //     });
  // //   } catch (error: unknown) {
  // //     if (error instanceof Error) {
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'Internal server error, please try again after some time',
  // //       });
  // //     }
  // //     return res
  // //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //       .json({ success: false, message: 'An unknown error occured' });
  // //   }
  // // }

  async blockCandidate(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;

      const validateUserId = userIdSchema.parse({ id: userId });

      const result = await this._blockUser.execute(validateUserId.id);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
        return;
      }

      res.status(StatusCodes.OK).json({ success: true, message: 'Candidate blocked successfully' });
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async unblockCandidate(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const validateUserId = userIdSchema.parse({id: userId})
      
      const result = await this._unblockUser.execute(validateUserId.id)
      
      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
        return
      }
      res.status(StatusCodes.OK)
        .json({ success: true, message: 'Candidate unblocked successfully' });
    } catch (error: any) {
      next(error);
    }
  }

  // //   async loadCompanyDetails(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { companyId } = req.params;
  // //     if (!companyId)
  // //       return res
  // //         .status(StatusCodes.NOT_ACCEPTABLE)
  // //         .json({ success: false, message: 'Company id not provided' });

  // //     try {
  // //       const companyDetails = await this._loadCompanyDetailsUC.execute(
  // //         companyId
  // //       );
  // //       return res.status(StatusCodes.OK).json({
  // //         success: true,
  // //         message: 'Company details fetched successfully',
  // //         companyDetails,
  // //       });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while fetching comapny details', error);
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }

  // //   async blockRecruiter(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { companyId } = req.params;

  // //     try {
  // //       const blockResult = await this._blockCompanyUC.execute(companyId);
  // //       if (!blockResult) throw new Error('Can not block company');

  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({ success: true, message: 'Company blocked successfully' });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while blocking company');
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }

  // //   async unblockRecruiter(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { companyId } = req.params;

  // //     try {
  // //       const unblockResult = await this._unblockCompanyUC.execute(companyId);
  // //       if (!unblockResult) throw new Error('Can not unlblock company');

  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({ success: true, message: 'Company unblocked successfully' });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while unblocking company');
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }

  // //   async closeCompany(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { companyId } = req.params;
  // //     console.log(
  // //       'Company id for closing the company',
  // //       companyId,
  // //       typeof companyId
  // //     );

  // //     try {
  // //       const closeCompanyResult = await this._closeCompanyUC.execute(companyId);
  // //       if (!closeCompanyResult) throw new Error('Can not close company');
  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({ success: true, message: 'Company closed successfully' });
  // //     } catch (error: unknown) {
  // //       if (error instanceof Error) {
  // //         console.log('Error occured while closing the company', error);
  // //         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }

  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }

    async loadJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
      const search = (req.query.search as string) || '';
          const page = parseInt(req.query.page as string) || 1;
          const limit = parseInt(req.query.limit as string) || 3;
          const sortOption = (req.query.sort as string) || 'Newest';
          const filter = JSON.parse(req.query.filter as string) || {}
          
      
          try {
            const valdiateQueryData = recruiterJobsSchema.parse({search, page, limit, sortOption, filter})
            const dto = mapToLoadJobsQueryDTOFromRequest(valdiateQueryData)
            const result = await this._loadJobs.execute(dto)
            
            if(!result){
              res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
              return
            }
            
            res
              .status(StatusCodes.OK)
              .json({ success: true, message: 'Jobs fetched successfully', result });
          } catch (error: unknown) {
            next(error)
          }
    }

  // //   async loadJObDetails(req: AdminAuth, res: Response): Promise<Response> {
  // //     try {
  // //       const { jobId } = req.params;
  // //       const result = await this._loadJobDetails.execute(jobId);
  // //       const jobDetails = result;
  // //       return res.status(StatusCodes.OK).json({
  // //         success: true,
  // //         message: 'Job details fetched successfully',
  // //         jobDetails,
  // //       });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while fetching job details', error);
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }

  // //       return res
  // //         .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //         .json({ success: false, message: 'An unknown error occured' });
  // //     }
  // //   }

  // //   async blockJob(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { jobId } = req.params;

  // //     try {
  // //       const blockResult = await this._blockJobUC.execute(jobId);
  // //       if (!blockResult) throw new Error('Can not block job');

  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({ success: true, message: 'job blocked successfully' });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while blocking job');
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }

  // //   async unblockJob(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { jobId } = req.params;

  // //     try {
  // //       const blockResult = await this._unblockJobUC.execute(jobId);
  // //       if (!blockResult) throw new Error('Can not unblock job');

  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({ success: true, message: 'job unblocked successfully' });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while unblocking job');
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }

  // //   async rejectJob(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { jobId } = req.params;

  // //     try {
  // //       const blockResult = await this._rejectJobUC.execute(jobId);
  // //       if (!blockResult) throw new Error('Can not block job');

  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({ success: true, message: 'job rejected successfully' });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while rejecting job');
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }

  // //   async unrejectJob(req: AdminAuth, res: Response): Promise<Response> {
  // //     const { jobId } = req.params;

  // //     try {
  // //       const blockResult = await this._unrejectJobUC.execute(jobId);
  // //       if (!blockResult) throw new Error('Can not unreject job');

  // //       return res
  // //         .status(StatusCodes.OK)
  // //         .json({ success: true, message: 'job unrejected successfully' });
  // //     } catch (error: unknown) {
  // //       console.log('Error occured while unrejecting job');
  // //       if (error instanceof Error) {
  // //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //           success: false,
  // //           message: 'Internal server error, please try again after some time',
  // //         });
  // //       }
  // //       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //         success: false,
  // //         message: 'An unknown error occured, please try again after some time',
  // //       });
  // //     }
  // //   }
}
