import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import IAdminLoginUseCase from '../../application/interfaces/usecases/admin/IAdminLogin.usecase..FIX';
import mapToUserLoginDTO from '../mappers/user/mapToUserLoginDTO';
import ILoadUsersAdminUseCase from '../../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase.FIX';
import { loadUsersSchema } from '../schemas/admin/loadUsers.schema';
import mapRequestToLoadUsersQueryDto from '../mappers/user/mapRequestToLoadUsersQueryDto';
import IAdminLoadUserDetailsUsecase from '../../application/interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import { userIdSchema } from '../schemas/user/userId.schema';
import IAdminBlockUserUsecase from '../../application/interfaces/usecases/admin/IAdminBlockUser.usecase.FIX';
import IAdminUnblockUserUsecase from '../../application/interfaces/usecases/admin/IAdminUnblockUser.usecase.FIX';
import ILoadJobsAggregatedUsecase from '../../application/interfaces/usecases/user/IloadJobsAggregated.usecase.FIX';
import { recruiterJobsSchema } from '../schemas/shared/recruiterJobsQuery.schema';
import IAdminDeleteUserUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteUser.usecase';
import IGetRecruiterApplicationsUsecase from '../../application/interfaces/usecases/admin/IGetRecruiterApplications.usecase';
import IRejectRecruiterApplication from '../../application/interfaces/usecases/admin/IRejectRecruiterApplication.usecase.FIX';
import IApproveRecruiterApplicationUsecase from '../../application/interfaces/usecases/admin/IApproveRecruiterApplication.usecase.FIXED';
import { plainToInstance } from 'class-transformer';
import { LoadJobsAggregatedQueryDto } from '../../application/DTOs/job/loadJobsAggregatedQuery.dto.FIX';
import AdminLoginRequestDTO from '../../application/DTOs/admin/adminLoginReq.dto.FIX';
import { validate } from 'class-validator';
import { ValidationError } from '../../domain/errors/AppError';
import LoadUsersQueryDTO from '../../application/DTOs/admin/loadUsersAdminside.dto.FIX';
import LoadRecruiterApplicationDTO from '../../application/DTOs/admin/loadRecruiterApplication.dto.FIX';
import RejectRecruiterApplicationDTO from '../../application/DTOs/admin/rejectRecruiter.dto.FIX';
import IAdminLoadRecruitersUsecase from '../../application/interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import LoadRecruitersDTO from '../../application/DTOs/admin/loadCompanies.dto';
import IBlockRecruiterUsecase from '../../application/usecases/admin/interfaces/IBlockCompany.usecase.FIX';
import IUnblockRecruiterUsecase from '../../application/usecases/admin/interfaces/IUnblockCompany.usecase.FIX';
import IDeleteRecruiterUsecase from '../../application/usecases/admin/interfaces/ICloseCompany.usecase';
import IAdminAddSkillUsecase from '../../application/interfaces/usecases/admin/IAdminAddSkill.usecase';
import IAdminUpdateSkillUsecase from '../../application/interfaces/usecases/admin/IAdminUpdateSkill.usecase';
import IAdminDeleteSkillUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteSkill.usecase';
import IAdminGetSkillsUsecase from '../../application/interfaces/usecases/admin/IAdminGetSkills.usecase';
import {
  CreateSkillDTO,
  GetSkillsDTO,
  UpdateSkillsDTO,
} from '../../application/DTOs/admin/skills.dto';

@injectable()
export class AdminController {
  constructor(
    @inject('IAdminLoginUseCase') private _adminLoginUC: IAdminLoginUseCase,
    @inject('ILoadUsersAdminUsecase') private _loadUsersAdminUC: ILoadUsersAdminUseCase,
    @inject('IAdminLoadUserDetailsUsecase') private _loadUserDetails: IAdminLoadUserDetailsUsecase, // @inject('ILoadCandidatesUseCase')
    @inject('IAdminBlockUserUsecase') private _blockUser: IAdminBlockUserUsecase, // private _loadCandidatesUC: ILoadCandidateUseCase, //usecase interface
    @inject('IAdminUnblockUserUsecase') private _unblockUser: IAdminUnblockUserUsecase,
    @inject('ILoadJobsAggregatedUsecase') private _loadJobs: ILoadJobsAggregatedUsecase, // // private _loadCompaniesUC: ILoadCompaniesUseCase, //usecase interface
    @inject('IAdminDeleteUserUsecase') private _deleteUser: IAdminDeleteUserUsecase,
    @inject('IGetRecruiterApplicationsUsecase')
    private _getRecruiterApplications: IGetRecruiterApplicationsUsecase,
    @inject('IRejectRecruiterApplication')
    private _rejectRecruiterApplication: IRejectRecruiterApplication,
    @inject('IApproveRecruiterApplicationUsecase')
    private _approveRecruiterApplication: IApproveRecruiterApplicationUsecase,
    @inject('IAdminLoadRecruitersUsecase') private _loadRecruiters: IAdminLoadRecruitersUsecase,
    @inject('IBlockRecruiterUsecase') private _blockRecruiter: IBlockRecruiterUsecase,
    @inject('IUnblockRecruiterUsecase') private _unblockRecruiter: IUnblockRecruiterUsecase,
    @inject('IDeleteRecruiterUsecase') private _deleteRecruiter: IDeleteRecruiterUsecase,
    @inject('IAdminAddSkillsUsecase') private _addSkills: IAdminAddSkillUsecase,
    @inject('IAdminUpdateSkillsUsecase') private _updateSkills: IAdminUpdateSkillUsecase,
    @inject('IAdminDeleteSkillsUsecase') private _deleteSkills: IAdminDeleteSkillUsecase,
    @inject('IAdminGetSkillsUsecase') private _getSkills: IAdminGetSkillsUsecase
  ) {}

  async adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = plainToInstance(AdminLoginRequestDTO, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._adminLoginUC.execute(dto);

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
  } //fixed

  async logoutAdmin(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax', //max age
      });

      console.log('succesfully cleared the cookie, sending response back to the user');
      res.status(StatusCodes.OK).json({ success: true, message: 'Admin logout successfull' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadUsers(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1; // Removed redundant optional chaining
    const limit = parseInt(req.query.limit as string) || 3; // Removed redundant optional chaining
    const sort = (req.query.sort as string) || ''; // Added default for sort
    const filter = JSON.parse(req.query?.filter as string) || {}; //: Record<string, unknown> = {}; // Explicitly type filter

    try {
      // const validatedQuery = loadUsersSchema.parse({
      //   search,
      //   page,
      //   limit,
      //   sort,
      //   filter,
      // });
      const dto = plainToInstance(LoadUsersQueryDTO, { search, page, limit, sort, filter });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

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
  } //fixed

  async loadUserDetails(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    //console.log('candidate id from the frontend', userId);
    //return
    try {
      const result = await this._loadUserDetails.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Users Details fetched successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadRecruiterApplications(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('--request params for testing--', req.query.profileStatus);
      const search = (req.query.search as string) || '';
      const profileStatus = (req.query.profileStatus as string) || 'All';

      const dto = plainToInstance(LoadRecruiterApplicationDTO, { search, profileStatus });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._getRecruiterApplications.execute(dto);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Recruiter applications fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async rejectRecruiterApplication(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { recruiterId } = req.params;
      const dto = plainToInstance(RejectRecruiterApplicationDTO, { id: recruiterId, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._rejectRecruiterApplication.execute(dto);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Recruiter application rejected successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async approveRecruiterApplication(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { recruiterId } = req.params;
      const result = await this._approveRecruiterApplication.execute(recruiterId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Recruiter application approved successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadCompanies(req: Auth, res: Response, next: NextFunction): Promise<void> {
    //company list
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sort = (req.query.sort as string) || 'joined-latest';
    const employerTypeFilter = (req.query.employerTypeFilter as string) || 'All';
    const employerStatusFilter = (req.query.employerStatusFilter as string) || 'All';
    try {
      const dto = plainToInstance(LoadRecruitersDTO, {
        search,
        page,
        limit,
        sort,
        employerTypeFilter,
        employerStatusFilter,
      });
      const errors = await validate(dto);
      console.log('--checking errors--', errors);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._loadRecruiters.execute(dto);

      res.status(201).json({
        success: true,
        message: 'Company list fetched successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async blockUser(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this._blockUser.execute(userId);

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
      const validateUserId = userIdSchema.parse({ id: userId });

      const result = await this._unblockUser.execute(validateUserId.id);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
        return;
      }
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Candidate unblocked successfully' });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteUser(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;

      await this._deleteUser.execute(userId);

      res.status(StatusCodes.OK).json({ success: true, message: 'User deleted successfully' });
    } catch (error: unknown) {
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

  async blockRecruiter(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { companyId } = req.params;

    try {
      const blockResult = await this._blockRecruiter.execute(companyId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Company blocked successfully', result: blockResult });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unblockRecruiter(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { companyId } = req.params;

    try {
      const unblockResult = await this._unblockRecruiter.execute(companyId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Company unblocked successfully', result: unblockResult });
    } catch (error: unknown) {
      next(error);
    }
  }

  async closeCompany(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { companyId } = req.params;
    console.log('Company id for closing the company', companyId, typeof companyId);

    try {
      const closeCompanyResult = await this._deleteRecruiter.execute(companyId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Company closed successfully',
        result: closeCompanyResult,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async addSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = plainToInstance(CreateSkillDTO, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._addSkills.execute(dto);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Skill added successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skillId } = req.params;
      const dto = plainToInstance(UpdateSkillsDTO, { _id: skillId, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._updateSkills.execute(dto);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Skill updated successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skillId } = req.params;
      const result = await this._deleteSkills.execute(skillId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Skill deleted successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || '';

    try {
      const dto = plainToInstance(GetSkillsDTO, { search, page, limit });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._getSkills.execute(dto);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Skills fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async loadJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortOption = (req.query.sort as string) || 'Newest';
    const filter = JSON.parse(req.query.filter as string) || {};

    try {
      const valdiateQueryData = recruiterJobsSchema.parse({
        search,
        page,
        limit,
        sortOption,
        filter,
      });
      //const dto = mapToLoadJobsQueryDTOFromRequest(valdiateQueryData);
      const dto = plainToInstance(LoadJobsAggregatedQueryDto, {
        search,
        page,
        limit,
        sortOption,
        filter,
      });
      const result = await this._loadJobs.execute(dto);

      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Something went wrong' });
        return;
      }

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs fetched successfully', result });
    } catch (error: unknown) {
      next(error);
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
