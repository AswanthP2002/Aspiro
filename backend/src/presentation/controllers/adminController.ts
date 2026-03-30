import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
// import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import IAdminLoginUseCase from '../../application/interfaces/usecases/admin/IAdminLogin.usecase..FIX';
import IBlockRecruiterUsecase from '../../application/interfaces/usecases/recruiter/IBlockRecruiter.usecase';
import IUnblockRecruiterUsecase from '../../application/usecases/admin/interfaces/IUnblockCompany.usecase.FIX';
import IDeleteRecruiterUsecase from '../../application/usecases/admin/interfaces/ICloseCompany.usecase';
import IBulckApproveRecruiterApplicationUsecase from '../../application/interfaces/usecases/recruiter/IBulckApproveRecruiterApplication.usecase';
import IAdminResetUserPasswordUsecase from '../../application/interfaces/usecases/user/IAdminResetUserPassword.usecase';
import IAdminRequestResetUserPasswordUsecase from '../../application/interfaces/usecases/admin/IAdminRequestRestPassword.usecase';
import ILoadJobsUseCase from '../../application/interfaces/usecases/job/IAdminLoadJobs.usecase';
import IAdminLoadJobDetailsUseCase from '../../application/usecases/admin/interfaces/ILoadJobDetails.usecase';
import IAdminDeleteJobUsecase from '../../application/interfaces/usecases/job/IAdminDeleteJob.usecase';
import IGetIndividualRecruiterApplicationDetailsUsecase from '../../application/interfaces/usecases/recruiter/IGetIndividualRecruiterApplicationDetails.usecase';
import { IAdminDeleteRecruiterDataUsecase } from '../../application/interfaces/usecases/recruiter/IAdminDeleteRecruiterData.usecase';
import IAdminToggleFlagJobUsecase from '../../application/interfaces/usecases/job/IAdminToggleFlagJob.usecase';
import { BlockJobUseCase } from '../../application/usecases/job/BlockJob.usecase';
import { UnblockJobUseCase } from '../../application/usecases/job/UnblockJob.usecase';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IBlockJobUseCase from '../../application/interfaces/usecases/job/IBlockJob.usecase';
import IUnblockJobUseCase from '../../application/interfaces/usecases/job/IUnblockJob.usecase';

@injectable()
export class AdminController {
  constructor(
    @inject('IAdminLoginUseCase') private _adminLoginUC: IAdminLoginUseCase,
    @inject('IBlockRecruiterUsecase') private _blockRecruiter: IBlockRecruiterUsecase,
    @inject('IUnblockRecruiterUsecase') private _unblockRecruiter: IUnblockRecruiterUsecase,
    @inject('IDeleteRecruiterUsecase') private _deleteRecruiter: IDeleteRecruiterUsecase,
    @inject('IBulckApproveRecruiterApplicationsUsecase')
    private _bulckApproveRecruiterApplication: IBulckApproveRecruiterApplicationUsecase,
    @inject('IAdminResetUserPasswordUsecase')
    private _resetUserPassword: IAdminResetUserPasswordUsecase,
    @inject('IAdminRequestUserPasswordResetUsecase')
    private _requestReset: IAdminRequestResetUserPasswordUsecase,
    @inject('IAdminLoadJobsUsecase') private _loadJobs: ILoadJobsUseCase,
    @inject('IAdminLoadJobDetailsUsecase') private _loadJobDetails: IAdminLoadJobDetailsUseCase,
    @inject('IAdminDeleteJobUsecase') private _deleteJob: IAdminDeleteJobUsecase,
    @inject('IGetIndividualRecruiterApplicationDetailsUsecase')
    private _getRecruiterApplicationDetails: IGetIndividualRecruiterApplicationDetailsUsecase,
    @inject('IAdminDeleteRecruiterDataUsecase')
    private _deleteRecruiterData: IAdminDeleteRecruiterDataUsecase,
    @inject('IAdminToggleFlagJobUsecase') private _flagJob: IAdminToggleFlagJobUsecase,
    @inject('IBlockJobUsecase') private _blockJob: IBlockJobUseCase,
    @inject('IUnblockJobUsecase') private _unblockJob: IUnblockJobUseCase
  ) {}

  async adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._adminLoginUC.execute(req.body);

      const { refreshToken } = result;

      res
        .status(StatusCodes.OK)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false, //will change to true when it ready for production
          sameSite: 'lax',
          maxAge: parseInt(process.env.COOKIE_MAX_AGE as string),
        })
        .json({
          success: true,
          message: StatusMessage.AUTH_MESSAGE.LOGIN('Admin'),
          result: { user: result?.user, role: result?.role, accessToken: result?.token },
        });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async logoutAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax', //max age
      });

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.AUTH_MESSAGE.LOGOUT });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getRecruiterApplicationDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const recruiterApplId = req.params.id;
      const result = await this._getRecruiterApplicationDetails.execute(recruiterApplId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Recruiter application details'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async bulckApproveRecruiterApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this._bulckApproveRecruiterApplication.execute();

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Recruiter application bulck'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { jobId } = req.params;
      await this._deleteJob.execute(jobId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Job') });
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async flagJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;
    try {
      const result = await this._flagJob.execute(jobId, req.body.action);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Job flag status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async blockJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;
    try {
      const result = await this._blockJob.execute(jobId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Job block status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async unblockJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;
    try {
      const result = await this._unblockJob.execute(jobId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Job unblock status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async blockRecruiter(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { companyId } = req.params;

    try {
      const blockResult = await this._blockRecruiter.execute(companyId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Recruiter block status'),
        result: blockResult,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async unblockRecruiter(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { companyId } = req.params;

    try {
      const unblockResult = await this._unblockRecruiter.execute(companyId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Recruiter'),
        result: unblockResult,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async closeCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { companyId } = req.params;

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
  } //fixed

  async deleteRecruiterData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const recruiterId = req.params.recruiterId;

    try {
      await this._deleteRecruiterData.execute(recruiterId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Recruiter'),
      });
    } catch (error) {
      next(error);
    }
  }

  async loadJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    // const sortOption = (req.query.sort as string) || 'Newest';
    const statusFilter = (req.query.statusFilter as string) || 'all';
    const jobTypeFilter = (req.query.jobTypeFilter as string) || 'all';
    const reportsCount = parseInt(req.query.reportsCount as string) || 0;

    try {
      const result = await this._loadJobs.execute({
        search,
        page,
        limit,
        reportsCount,
        jobTypeFilter,
        statusFilter,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Jobs'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async loadJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;

    try {
      const result = await this._loadJobDetails.execute(jobId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job details'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async requestReset(req: Request, res: Response, next: NextFunction): Promise<void> {
    const adminId = req?.user?.id as string;
    try {
      const result = await this._requestReset.execute(adminId, req.body.email);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.AUTH_MESSAGE.PASSWORD_RESET_REQUEST,
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async resetUserPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const adminId = req?.user?.id as string;
    const { token, userId, userEmail, code } = req.body;
    try {
      const result = await this._resetUserPassword.execute({
        adminId,
        userEmail,
        userId,
        code,
        token,
      });
      if (!result) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: StatusMessage.AUTH_MESSAGE.CODE_VERIFICATION_FAILED });

        return;
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.AUTH_MESSAGE.PASSWORD_RESET_LINK_SEND,
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
