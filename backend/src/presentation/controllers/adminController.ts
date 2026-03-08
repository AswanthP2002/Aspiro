import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import IAdminLoginUseCase from '../../application/interfaces/usecases/admin/IAdminLogin.usecase..FIX';
import ILoadUsersAdminUseCase from '../../application/interfaces/usecases/admin/ILoadUsersAdmin.usecase.FIX';
import IAdminLoadUserDetailsUsecase from '../../application/interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import { userIdSchema } from '../schemas/user/userId.schema';
import IAdminBlockUserUsecase from '../../application/interfaces/usecases/admin/IAdminBlockUser.usecase.FIX';
import IAdminUnblockUserUsecase from '../../application/interfaces/usecases/admin/IAdminUnblockUser.usecase.FIX';
import IAdminDeleteUserUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteUser.usecase';
import IGetRecruiterApplicationsUsecase from '../../application/interfaces/usecases/admin/IGetRecruiterApplications.usecase';
import IRejectRecruiterApplication from '../../application/interfaces/usecases/admin/IRejectRecruiterApplication.usecase.FIX';
import IApproveRecruiterApplicationUsecase from '../../application/interfaces/usecases/admin/IApproveRecruiterApplication.usecase.FIXED';
import IAdminLoadRecruitersUsecase from '../../application/interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import IBlockRecruiterUsecase from '../../application/usecases/admin/interfaces/IBlockCompany.usecase.FIX';
import IUnblockRecruiterUsecase from '../../application/usecases/admin/interfaces/IUnblockCompany.usecase.FIX';
import IDeleteRecruiterUsecase from '../../application/usecases/admin/interfaces/ICloseCompany.usecase';
import IAdminAddSkillUsecase from '../../application/interfaces/usecases/admin/IAdminAddSkill.usecase';
import IAdminUpdateSkillUsecase from '../../application/interfaces/usecases/admin/IAdminUpdateSkill.usecase';
import IAdminDeleteSkillUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteSkill.usecase';
import IAdminGetSkillsUsecase from '../../application/interfaces/usecases/admin/IAdminGetSkills.usecase';
import IBulckApproveRecruiterApplicationUsecase from '../../application/interfaces/usecases/admin/IBulckApproveRecruiterApplication.usecase';
import IAdminPermanentBanUserUsecase from '../../application/interfaces/usecases/admin/IAdminPermanentBanUser.usecase';
import IAdminResetUserPasswordUsecase from '../../application/interfaces/usecases/admin/IAdminResetUserPassword.usecase';
import IAdminRequestResetUserPasswordUsecase from '../../application/interfaces/usecases/admin/IAdminRequestRestPassword.usecase';
import IAdminLoadRecruiterDetailsUsecase from '../../application/interfaces/usecases/admin/IAdminLoadRecruiterDetails.usecase';
import IAdminRevokeRecruiterVerification from '../../application/interfaces/usecases/admin/IAdminRevokeRecruiterVerification.usecase';
import IAdminHandlePermissionRevokingUsecase from '../../application/interfaces/usecases/admin/IAdminHandlePermissionRevoking.usecase';
import IAdminAddWorkModeUsecase from '../../application/interfaces/usecases/admin/IAdminAddWorkMode.usecase';
import { IAdminGetWorkModesUsecase } from '../../application/interfaces/usecases/admin/IAdminGetWorkModes.usecase';
import { IAdminChangeWorkModeStatusUsecase } from '../../application/interfaces/usecases/admin/IAdminChangeWorkmodeStatus.usecase';
import IAdminDeleteWorkModeUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteWorkMode.usecase';
import IAdminEditWorkModeUsecase from '../../application/interfaces/usecases/admin/IAdminEditWorkMode.usecase';
import IAdminAddJobLevelUsecase from '../../application/interfaces/usecases/admin/IAdminAddJobLevel.usecase';
import IAdminGetJobLevelsUsecase from '../../application/interfaces/usecases/admin/IAdminGetJobLevel.usecase';
import IAdminEditJobLevelUsecase from '../../application/interfaces/usecases/admin/IAdminEditJobLevel.usecase';
import IAdminChangeJobLevelStatusUsecase from '../../application/interfaces/usecases/admin/IAdminChangeJobLevelStatus.usecase';
import IAdminDeleteJobLevelUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteJobLevel.usecase';
import IAdminAddJobTypeUsecase from '../../application/interfaces/usecases/admin/IAdminAddJobType.usecase';
import IAdminChangeJobTypeStatusUsecase from '../../application/interfaces/usecases/admin/IAdminChangeJobTypeStatus.usecase';
import IAdminGetJobTypesUsecase from '../../application/interfaces/usecases/admin/IAdminGetJobType.usecase';
import IAdminDeleteJobTypeUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteJobType.usecase';
import IAdminUpdateJobTypeUse from '../../application/interfaces/usecases/admin/IAdminUpdateJobType.usecase';
import IAdminChangeRecruiterApplicationStatusToUnderReview from '../../application/interfaces/usecases/admin/IAdminChangeRecruiterApplicationStatusToUnderReview.usecase';
import ILoadJobsUseCase from '../../application/interfaces/usecases/admin/IAdminLoadJobs.usecase';
import IAdminLoadJobDetailsUseCase from '../../application/usecases/admin/interfaces/ILoadJobDetails.usecase';
import IAdminDeleteJobUsecase from '../../application/interfaces/usecases/admin/IAdminDeleteJob.usecase';

@injectable()
export class AdminController {
  constructor(
    @inject('IAdminLoginUseCase') private _adminLoginUC: IAdminLoginUseCase,
    @inject('ILoadUsersAdminUsecase') private _loadUsersAdminUC: ILoadUsersAdminUseCase,
    @inject('IAdminLoadUserDetailsUsecase') private _loadUserDetails: IAdminLoadUserDetailsUsecase,
    @inject('IAdminBlockUserUsecase') private _blockUser: IAdminBlockUserUsecase,
    @inject('IAdminUnblockUserUsecase') private _unblockUser: IAdminUnblockUserUsecase,
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
    @inject('IAdminGetSkillsUsecase') private _getSkills: IAdminGetSkillsUsecase,
    @inject('IBulckApproveRecruiterApplicationsUsecase')
    private _bulckApproveRecruiterApplication: IBulckApproveRecruiterApplicationUsecase,
    @inject('IAdminPermanentBanUserUsecase') private _banUser: IAdminPermanentBanUserUsecase,
    @inject('IAdminResetUserPasswordUsecase')
    private _resetUserPassword: IAdminResetUserPasswordUsecase,
    @inject('IAdminRequestUserPasswordResetUsecase')
    private _requestReset: IAdminRequestResetUserPasswordUsecase,
    @inject('IAdminLoadRecruiterDetailsUsecase')
    private _loadRecruiterDetails: IAdminLoadRecruiterDetailsUsecase,
    @inject('IAdminRevokeRecruiterVerificationUsecase')
    private _handleVerificationUpdate: IAdminRevokeRecruiterVerification,
    @inject('IAdminHandlePermissionRevokingUsecase')
    private _handlePermissionRevoking: IAdminHandlePermissionRevokingUsecase,
    @inject('IAdminAddWorkModeUsecase') private _addWorkMode: IAdminAddWorkModeUsecase,
    @inject('IAdminGetWorkModeUsecase') private _getWorkMods: IAdminGetWorkModesUsecase,
    @inject('IAdminChangeWorkModeStatusUsecase')
    private _changeWorkmodeStatus: IAdminChangeWorkModeStatusUsecase,
    @inject('IAdminDeleteWorkModeUsecase') private _deleteWorkMode: IAdminDeleteWorkModeUsecase,
    @inject('IAdminEditWorkModeUsecase') private _editWorkMode: IAdminEditWorkModeUsecase,
    @inject('IAdminAddJobLevelUsecase') private _addJobLevel: IAdminAddJobLevelUsecase,
    @inject('IAdminGetJobLevelUsecase') private _getJobLevels: IAdminGetJobLevelsUsecase,
    @inject('IAdminEditJobLevelUsecase') private _editJobLevel: IAdminEditJobLevelUsecase,
    @inject('IAdminChangeJobLevelStatusUsecase')
    private _changeJobLevelStatus: IAdminChangeJobLevelStatusUsecase,
    @inject('IAdminDeleteJobLevelUsecase') private _deleteJobLeve: IAdminDeleteJobLevelUsecase,
    @inject('IAdminAddJobTypeUsecase') private _addJobType: IAdminAddJobTypeUsecase,
    @inject('IAdminUpdateJobTypeUsecase') private _updateJobType: IAdminUpdateJobTypeUse,
    @inject('IAdminChangeJobTypeStatusUsecase')
    private _changeJobTypeStatus: IAdminChangeJobTypeStatusUsecase,
    @inject('IAdminGetJobTypesUsecase') private _getJobTypes: IAdminGetJobTypesUsecase,
    @inject('IAdminDeleteJobTypeUsecase') private _deleteJobType: IAdminDeleteJobTypeUsecase,
    @inject('IAdminChangeRecruiterApplicationStatusToUnderReview')
    private _statusChangeToUnderReview: IAdminChangeRecruiterApplicationStatusToUnderReview,
    @inject('IAdminLoadJobsUsecase') private _loadJobs: ILoadJobsUseCase,
    @inject('IAdminLoadJobDetailsUsecase') private _loadJobDetails: IAdminLoadJobDetailsUseCase,
    @inject('IAdminDeleteJobUsecase') private _deleteJob: IAdminDeleteJobUsecase
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
      const result = await this._loadUsersAdminUC.execute({ search, page, limit, sort, filter });

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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const result = await this._getRecruiterApplications.execute({ page, limit });

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

      const result = await this._rejectRecruiterApplication.execute({
        applicationId: recruiterId,
        ...req.body,
      });

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

  async changeStatusToUnderReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const applicationId = req.params.id;

      const result = await this._statusChangeToUnderReview.execute(applicationId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Status changed to under review', result });
    } catch (error) {
      next(error);
    }
  }

  async bulckApproveRecruiterApplications(
    req: Auth,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this._bulckApproveRecruiterApplication.execute();

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Multiple application approved', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadRecruiters(req: Auth, res: Response, next: NextFunction): Promise<void> {
    //company list
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

      res.status(201).json({
        success: true,
        message: 'Company list fetched successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async blockUser(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this._blockUser.execute(userId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'User blocked successfully', result });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { jobId } = req.params;
      const result = await this._deleteJob.execute(jobId);

      res.status(StatusCodes.OK).json({ success: true, message: 'job deleted' });
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

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Candidate unblocked successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteUser(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;

      await this._deleteUser.execute(userId);

      res.status(StatusCodes.OK).json({ success: true, message: 'User deleted successfully' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

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
  } //fixed

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
  } //fixed

  async closeCompany(req: Auth, res: Response, next: NextFunction): Promise<void> {
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

  async addSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addSkills.execute(req.body);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Skill added successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async updateSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skillId } = req.params;

      const result = await this._updateSkills.execute({ _id: skillId, ...req.body });

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Skill updated successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

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
  } //fixed

  async getSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || '';

    try {
      const result = await this._getSkills.execute({ search, page, limit });

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Skills fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const sortOption = (req.query.sort as string) || 'Newest';
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

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async loadJobDetails(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const jobId = req.params.jobId;

    try {
      const result = await this._loadJobDetails.execute(jobId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs details fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async userBan(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const authorizedAdminId = req.user.id;
    const userId = req.params.userId;
    try {
      if (authorizedAdminId !== userId) {
        const result = await this._banUser.execute(userId);
        res
          .status(StatusCodes.OK)
          .json({ success: true, message: 'User banned permanently', result });
      }
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async requestReset(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const adminId = req.user.id;
    try {
      const result = await this._requestReset.execute(adminId, req.body.email);
      res.status(StatusCodes.OK).json({ success: true, message: 'Code send to email', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async resetUserPassword(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const adminId = req.user.id;
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
          .json({ success: false, message: 'Code verification failed' });

        return;
      }
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Password reset succesfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async recruiterDetails(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const recruiterId = req.params.recruiterId as string;

    try {
      const result = await this._loadRecruiterDetails.execute(recruiterId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Recruiter details fetched succesfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async handleRecruiterVerification(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const recruiterId = req.params.recruiterId;
    const action = req.query.action as 'Verified' | 'Revoked';

    try {
      const result = await this._handleVerificationUpdate.execute(recruiterId, action);
      res.status(StatusCodes.OK).json({ success: true, message: 'Updated', result });
    } catch (error) {
      next(error);
    }
  }

  async handleRecruiterPermission(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const recruiterId = req.params.recruiterId;
    const action = req.query.action as 'Revoke' | 'Un-Revoke';

    try {
      const result = await this._handlePermissionRevoking.execute(recruiterId, action);
      res.status(StatusCodes.OK).json({ success: true, message: 'Updated', result });
    } catch (error) {
      next(error);
    }
  }

  async addWorkMode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addWorkMode.execute(req.body);
      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Work mode created ', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getWorkModes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const limit = parseInt(req.query.limit as string) || 7;
    const page = parseInt(req.query.page as string) || 1;
    try {
      const result = await this._getWorkMods.execute({ search, page, limit });
      res.status(StatusCodes.OK).json({ success: true, message: 'Fetched', result });
    } catch (error) {
      next(error);
    }
  }

  async changeWorkModeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const workModeId = req.params.id;

    try {
      const result = await this._changeWorkmodeStatus.execute({ id: workModeId, ...req.body });
      res.status(StatusCodes.OK).json({ success: true, message: 'Updated', result });
    } catch (error) {
      next(error);
    }
  }

  async deleteWorkMode(req: Request, res: Response, next: NextFunction): Promise<void> {
    const workModeId = req.params.id;
    try {
      await this._deleteWorkMode.execute(workModeId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Work mode deleted' });
    } catch (error) {
      next(error);
    }
  }

  async editWorkMode(req: Request, res: Response, next: NextFunction): Promise<void> {
    const workModeId = req.params.id;
    try {
      const result = await this._editWorkMode.execute({ id: workModeId, ...req.body });
      res.status(StatusCodes.OK).json({ success: true, message: 'Work Mode updated', result });
    } catch (error) {
      next(error);
    }
  }

  async addJobLevel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addJobLevel.execute(req.body);
      res.status(StatusCodes.OK).json({ success: true, message: 'Job level created', result });
    } catch (error) {
      next(error);
    }
  }

  async getJobLevels(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const limit = parseInt(req.query.limit as string) || 7;
    const page = parseInt(req.query.page as string) || 1;

    try {
      const result = await this._getJobLevels.execute({ search, limit, page });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Job Levels fetched succesfully', result });
    } catch (error) {
      next(error);
    }
  }

  async editJobLevel(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobLevelId = req.params.id;
    try {
      const result = await this._editJobLevel.execute({ id: jobLevelId, ...req.body });
      res.status(StatusCodes.OK).json({ success: true, message: 'Job Level updated', result });
    } catch (error) {
      next(error);
    }
  }

  async changeJobLevelStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobLevelId = req.params.id;
    try {
      const result = await this._changeJobLevelStatus.execute(jobLevelId, req.body.isActive);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Job Level Status changed', result });
    } catch (error) {
      next(error);
    }
  }

  async deleteJobLevel(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jobLevelId = req.params.id;

    try {
      await this._deleteJobLeve.execute(jobLevelId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });
    } catch (error) {
      next(error);
    }
  }

  async addJobType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addJobType.execute(req.body);
      res.status(StatusCodes.CREATED).json({ success: true, message: 'Job type created', result });
    } catch (error) {
      next(error);
    }
  }

  async updateJobType(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this._updateJobType.execute({ id, ...req.body });
      res.status(StatusCodes.OK).json({ success: true, message: 'Job type updated', result });
    } catch (error) {
      next(error);
    }
  }

  async changeJobTypeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this._changeJobTypeStatus.execute({ id, ...req.body });
      res.status(StatusCodes.OK).json({ success: true, message: 'Status updated', result });
    } catch (error) {
      next(error);
    }
  }

  async getJobTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const limit = parseInt(req.query.limit as string) || 7;
    const page = parseInt(req.query.page as string) || 1;

    try {
      const result = await this._getJobTypes.execute({ search, page, limit });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Job Types fetched succesfully', result });
    } catch (error) {
      next(error);
    }
  }

  async deleteJobTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this._deleteJobType.execute(id);
      res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });
    } catch (error) {
      next(error);
    }
  }
}
