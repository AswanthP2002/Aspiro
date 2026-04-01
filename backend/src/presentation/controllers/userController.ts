import { NextFunction, Request, Response } from 'express';
import url from 'url';

// import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import IVerifyUserUseCase from '../../application/interfaces/usecases/user/IVerifyUser.usecase.FIX';
import IEditProfileUseCase from '../../application/interfaces/usecases/user/IEditProfile.usecase.FIX';
import ICheckIsJobSavedUseCase from '../../application/interfaces/usecases/savedJobs/ICheckIsJobSaved.usecase.FIX';
import IUnsaveJobUseCase from '../../application/interfaces/usecases/savedJobs/IUnsaveJob.usecase.FIX';
import IAddSocialLinkUsecase from '../../application/interfaces/usecases/user/IAddSocialLink.usecase.FIX';
import IDeleteSocialLinkUseCase from '../../application/interfaces/usecases/user/IDeleteSocialLink.usecase.FIX';
import IRemoveCoverphotoUseCase from '../../application/interfaces/usecases/user/IRemoveUserCoverPhoto.usecase.FIX';
import ICreateUserUseCase from '../../application/interfaces/usecases/user/ICreateUser.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import IResendOTPUseCase from '../../application/interfaces/usecases/user/IResendOTP.usecase.FIX';
import IUserLoginUseCase from '../../application/interfaces/usecases/user/IUserLogin.usecase.FIX';
import ISaveUserBasicsUsecase from '../../application/interfaces/usecases/user/ISaveUsersBasics.usecase.FIX';
import IUploadUserCoverPhotoUsecase from '../../application/interfaces/usecases/user/IUploadUserCoverPhoto.usecase.FIX';
import IUploadUserProfilePictureUsecase from '../../application/interfaces/usecases/user/IUploadUserProfilePicture.usecase.FIX';
import IRemoveUserProfilePictureUsecase from '../../application/interfaces/usecases/user/IRemoveUserProfilePciture.usecase.FIX';
import ILoadJobsAggregatedUsecase from '../../application/interfaces/usecases/job/IloadJobsAggregated.usecase.FIX';
import ILoadUserAggregatedProfileUsecase from '../../application/interfaces/usecases/user/ILoadUserAggregatedProfile.usecase.FIX';
import ILoadUserMetaDataUsecase from '../../application/interfaces/usecases/user/ILoadUserMetaData.usecase.FIX';
import IGetJobDetailsUseCase from '../../application/usecases/interfaces/IGetJobDetails.usecase.FIX';
import ISaveJobUsecase from '../../application/interfaces/usecases/savedJobs/ISaveJob.usecase.FIX';
import IGetSavedJobsUsecase from '../../application/interfaces/usecases/savedJobs/IGetSavedJobs.usecase.FIX';
import IApplyJobUsecase from '../../application/interfaces/usecases/jobApplication/IApplyJob.usecase.FIX';
import IGetMyApplicationsUsecase from '../../application/interfaces/usecases/jobApplication/IGetMyApplications.usecase.FIX';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '../../domain/errors/AppError';
import { ResendOtpDto } from '../../application/DTOs/user/resendOtp.dto.FIX';
import AddJobFavoriteDTO from '../../application/DTOs/user/addJobFavorite.dto.FIX';
import IGetUsersForPublicUsecase from '../../application/interfaces/usecases/user/IGetUsersforPublic.usecase';
import ILoadMyProfileUsecase from '../../application/interfaces/usecases/user/ILoadMyProfile.usecase.FIX';
import { generateToken, verifyToken } from '../../services/jwt';
import ICheckIsJobApplied from '../../application/interfaces/usecases/jobApplication/ICheckJobApplied.usecase';
import ISendResetPassworLinkUsecase from '../../application/interfaces/usecases/user/ISendPasswordResetLink.usecase.FIX';
import IResetPasswordUsecase from '../../application/interfaces/usecases/user/IResetPassword.usecase.FIX';
import { ITrackMyJobApplicationDetailsUsecase } from '../../application/interfaces/usecases/jobApplication/ITrackMyJobApplicationDetails.usecase';
import { IGetMyScheduledInterviewsUsecase } from '../../application/interfaces/usecases/interview/IGetMyScheduledInterviews.usecase';
import IWithdrawApplicationUsecase from '../../application/interfaces/usecases/jobApplication/IWithdrawApplication.usecase';
import ILoadUsersAdminUseCase from '../../application/interfaces/usecases/user/ILoadUsersAdmin.usecase.FIX';
import IAdminLoadUserDetailsUsecase from '../../application/interfaces/usecases/user/IAdminLoadUsersDetails.usecase';
import IAdminBlockUserUsecase from '../../application/interfaces/usecases/user/IAdminBlockUser.usecase.FIX';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IAdminUnblockUserUsecase from '../../application/interfaces/usecases/user/IAdminUnblockUser.usecase.FIX';
import IAdminDeleteUserUsecase from '../../application/interfaces/usecases/user/IAdminDeleteUser.usecase';
import IAdminPermanentBanUserUsecase from '../../application/interfaces/usecases/user/IAdminPermanentBanUser.usecase';
import { IGetSimilarUserUsecase } from '../../application/interfaces/usecases/user/IGetSimilarUsers.usecase';
import ILoadUserDetailsForResumeBuildingUsecase from '../../application/interfaces/usecases/user/ILoadUserDetailsForResumeBuidling.usecase';
import IAiInterviewUsecase from '../../application/interfaces/usecases/AI/IAiInterview.usecase';

const MockData = [
  { name: 'Alex Carter', headline: 'Building meaningful digital experiences' },
  { name: 'Priya Sharma', headline: 'Turning ideas into scalable products' },
  { name: 'Daniel Lee', headline: 'Passionate about clean code and design' },
  { name: 'Maria Gomez', headline: 'Crafting user-first interfaces' },
  { name: 'Rohit Verma', headline: 'Solving real-world problems with tech' },
  { name: 'Emily Watson', headline: 'Creating impact through creativity' },
  { name: 'Kunal Mehta', headline: 'Driven by curiosity and innovation' },
  { name: 'Sarah Johnson', headline: 'Designing with purpose and empathy' },
  { name: 'Arjun Patel', headline: 'Building reliable and scalable systems' },
  { name: 'Liam Brown', headline: 'Focused on performance and simplicity' },

  { name: 'Neha Kapoor', headline: 'Blending aesthetics with usability' },
  { name: 'Michael Chen', headline: 'Engineering thoughtful solutions' },
  { name: 'Aisha Khan', headline: 'Turning complex ideas into clarity' },
  { name: 'Tom Williams', headline: 'Obsessed with product quality' },
  { name: 'Sneha Iyer', headline: 'Design-led problem solver' },
  { name: 'Chris Miller', headline: 'Making technology more human' },
  { name: 'Vikram Singh', headline: 'Building future-ready applications' },
  { name: 'Olivia Martinez', headline: 'Creating delightful user journeys' },
  { name: 'Aditya Rao', headline: 'Focused on growth and learning' },
  { name: 'Emma Davis', headline: 'Transforming concepts into reality' },

  { name: 'Nikhil Joshi', headline: 'Always learning, always building' },
  { name: 'Sophia Taylor', headline: 'Designing products people love' },
  { name: 'Rahul Malhotra', headline: 'Problem solver with a product mindset' },
  { name: 'James Anderson', headline: 'Turning challenges into opportunities' },
  { name: 'Pooja Desai', headline: 'Creating simple solutions for complex needs' },
];

const fetchData = (page: number, limit: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      resolve(MockData.slice(start, end));
    }, 1000);
  });
};

type JWTTokenVerifyResult = {
  id: string;
  name: string;
  role: string;
  email: string;
};

@injectable()
export class UserController {
  constructor(
    @inject('ICreateUserUsecase') private _createUserUsecase: ICreateUserUseCase,
    @inject('IVerifyUserUsecase') private _verifyUserUC: IVerifyUserUseCase,
    @inject('IResendOTPUsecase') private _resendOTPUC: IResendOTPUseCase,
    @inject('IUserLoginUsecase') private _userLoginUC: IUserLoginUseCase,
    @inject('ILoadMyProfileUsecase') private _loadMyProfile: ILoadMyProfileUsecase,
    @inject('ISaveUserBasicsUsecase') private _saveUserBasicsUC: ISaveUserBasicsUsecase,
    @inject('IUploadUserCoverPhotoUsecase')
    private _uploadUserCoverPhotoUC: IUploadUserCoverPhotoUsecase,
    @inject('IUploadUserProfilePictureUsecase')
    private _uploadUserProfilePictureUC: IUploadUserProfilePictureUsecase,
    @inject('IRemoveUserCoverPhotoUsecase')
    private _removeUserCoverPhotoUC: IRemoveCoverphotoUseCase,
    @inject('IRemoveUserProfilePictureUsecase')
    private _removeUserProfPictureUC: IRemoveUserProfilePictureUsecase,
    @inject('ILoadJobsAggregatedUsecase') private _loadJobs: ILoadJobsAggregatedUsecase,
    @inject('ISendResetPasswordLinkUsecase')
    private _sendResetPasswordLink: ISendResetPassworLinkUsecase,
    @inject('IResetPasswordUsecase') private _resetPassword: IResetPasswordUsecase,
    @inject('IAddSocialLinkUsecase') private _addSocialLink: IAddSocialLinkUsecase,
    @inject('IDeleteSocialLinkUsecase') private _deleteSocialLink: IDeleteSocialLinkUseCase,
    @inject('IEditProfileUsecase') private _editProfile: IEditProfileUseCase,
    @inject('ILoadUserPublicProfileUsecase')
    private _loadUserPublicProfile: ILoadUserAggregatedProfileUsecase,
    @inject('ILoadUserMetaDataUsecase') private _loadUserMetaData: ILoadUserMetaDataUsecase,
    @inject('IGetJobDetailsUsecase') private _getJobDetails: IGetJobDetailsUseCase,
    @inject('ISaveJobUsecase') private _saveJob: ISaveJobUsecase,
    @inject('ICheckIsJobSavedUsecase') private _checkIsJobSaved: ICheckIsJobSavedUseCase,
    @inject('IUnsaveJobUsecase') private _unsaveJob: IUnsaveJobUseCase,
    @inject('IGetSavedJobsUsecase') private _getSavedJobs: IGetSavedJobsUsecase,
    @inject('IApplyJobUsecase') private _applyJob: IApplyJobUsecase,
    @inject('IGetMyApplicationsUsecase') private _getMyApplications: IGetMyApplicationsUsecase,
    @inject('IGetUsersForPublicUsecase') private _getUsersForPublic: IGetUsersForPublicUsecase,
    @inject('ICheckIsJobAppliedUsecase') private _checkIsJobApplied: ICheckIsJobApplied,
    @inject('ITrackMyJobApplicationDetailsUsecase')
    private _trackMyApplication: ITrackMyJobApplicationDetailsUsecase,
    @inject('IGetMyInterviews')
    private _getSchedueldInterviews: IGetMyScheduledInterviewsUsecase,
    @inject('IWithdrawApplicationUsecase')
    private _withdrawApplication: IWithdrawApplicationUsecase,
    @inject('ILoadUsersAdminUsecase') private _loadUsersAdminUC: ILoadUsersAdminUseCase,
    @inject('IAdminLoadUserDetailsUsecase') private _loadUserDetails: IAdminLoadUserDetailsUsecase,
    @inject('IAdminBlockUserUsecase') private _blockUser: IAdminBlockUserUsecase,
    @inject('IAdminUnblockUserUsecase') private _unblockUser: IAdminUnblockUserUsecase,
    @inject('IAdminDeleteUserUsecase') private _deleteUser: IAdminDeleteUserUsecase,
    @inject('IAdminPermanentBanUserUsecase') private _banUser: IAdminPermanentBanUserUsecase,
    @inject('IGetSimilarUser') private _similarUsers: IGetSimilarUserUsecase,
    @inject('ILoadusersFullDetailsForResumeBuilding')
    private _getUserFullProfileForResumeBuiding: ILoadUserDetailsForResumeBuildingUsecase,
    @inject('IAiInterviewUsecase') private _aiInterview: IAiInterviewUsecase
  ) {}

  async testInfinityScroll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;
    try {
      const result = await fetchData(page, limit);
      res.status(StatusCodes.OK).json({ success: true, message: 'fetched', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUser = await this._createUserUsecase.execute(req.body);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('User'),
        userId: createUser?._id,
        userEmail: createUser?.email,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const verifiedUser = await this._verifyUserUC.execute(req.body);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Email Verification status'),
        verifiedUser,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async resendOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = plainToInstance(ResendOtpDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._resendOTPUC.execute(dto);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('OTP'),
        result: { id: result?._id, email: result?.email },
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._userLoginUC.execute(req.body);
      const { refreshToken } = result;

      res
        .status(StatusCodes.OK)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: parseInt(process.env.COOKIE_MAX_AGE as string),
        })
        .json({
          success: true,
          message: StatusMessage.AUTH_MESSAGE.LOGIN('User'),
          result: { user: result.user, accessToken: result.accessToken, role: result.role },
        });
    } catch (error: unknown) {
      next(error);
    }
  }

  async reAuthenticate(req: Request, res: Response): Promise<void> {
    console.log('request reached under the reauthenticate controller');
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log('refresh token - ', refreshToken);
      if (!refreshToken) {
        console.log('--Refreshtoken not provided--');
        res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .json({ success: false, message: StatusMessage.AUTH_MESSAGE.NO_REFRESH_TOKEN });
        return;
      }

      console.log('refresh token exist so going to decode');
      const decoded = (await verifyToken(refreshToken)) as JWTTokenVerifyResult; //chance for error
      console.log('decoded without problem', decoded);
      const result = await this._loadUserMetaData.execute(decoded.id);
      console.log('-- received user meta data after reauthentiction--', result);
      const accessToken = await generateToken({
        id: decoded?.id as string,
        email: decoded?.email as string,
        role: decoded?.role as string,
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('New Accestoken'),
        userData: result,
        accessToken,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Error occured while refreshing accessToken', error);
        switch (error.name) {
          case 'TokenExpiredError':
            console.log('inside the reauthenticate controller token expired');
            res.status(StatusCodes.UNAUTHORIZED).json({
              success: false,
              message: StatusMessage.COMMON_MESSAGE.SESSION_EXPIRED,
              errors: {
                code: 'REFRESH_TOKEN_EXPIRED',
                message: 'Refresh token expired, please login again',
              },
            });
            break;

          case 'JsonWebTokenError':
            console.log('inside the reauthenticate controller toke error');
            res.status(StatusCodes.UNAUTHORIZED).json({
              success: false,
              message: StatusMessage.AUTH_MESSAGE.INVALID_TOKEN,
              errors: {
                code: 'INVALID_TOKEN',
                message: 'Invalid token, please login again',
              },
            });
            break;

          default:
            console.log('Refresh token verification failed');
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              success: false,
              message: StatusMessage.COMMON_MESSAGE.SOMETHING_WENT_WRONG,
            });
        }
      }
    }
  } //fixed

  async saveUsersBasics(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.user?.id as string;

    try {
      const result = await this._saveUserBasicsUC.execute({
        _id: id,
        headline: req.body.headline,
        summary: req.body.summary,
        location: {
          city: req.body.city,
          district: req.body.district,
          state: req.body.state,
          pincode: req.body.pincode,
          country: req.body.country,
          coords: {
            type: 'Point',
            coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)],
          },
        },
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Basic Details updated'),
        updatedCandidate: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.user?.id as string;
    try {
      const userDetails = await this._loadMyProfile.execute(id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('User Profile'),
        userDetails,
      });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async userLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, //will change to true when it ready for production
        sameSite: 'lax',
      });

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.AUTH_MESSAGE.LOGOUT });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async withdrawApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    const applicationId = req.params.applicationId;

    try {
      await this._withdrawApplication.execute(applicationId);

      res.status(StatusCodes.OK).json({ success: true, message: 'application deleted' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getScheduledInterviews(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.user?.id as string;
    try {
      const result = await this._getSchedueldInterviews.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Scheduled interviews'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const locationSearch = (req.query.locationSearch as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const workModeFilter = (req.query.workMode as string) || 'All';
    const jobTypeFilter = (req.query.jobType as string) || 'All';
    const jobLevelFilter = (req.query.jobLevel as string) || 'All';
    try {
      const result = await this._loadJobs.execute({
        search,
        limit,
        page,
        jobLevelFilter,
        workModeFilter,
        jobTypeFilter,
        locationSearch,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Jobs'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadUsersPublicProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    try {
      const result = await this._loadUserPublicProfile.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('User public profile'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //FIXED

  async loadJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { jobId } = req.params;

    try {
      const jobDetails = await this._getJobDetails.execute(jobId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job Details'),
        jobDetails,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async sendResetPasswordLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    try {
      await this._sendResetPasswordLink.execute(email);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.AUTH_MESSAGE.PASSWORD_RESET_LINK_SEND });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this._resetPassword.execute(req.body);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.AUTH_MESSAGE.PASSWORD_RESET_SUCCESS });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async applyJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id as string;
    const { jobId } = req.params;
    const { coverLetterContent, resumeId } = req.body;
    try {
      const result = await this._applyJob.execute({
        candidateId,
        coverLetterContent,
        jobId,
        resumeId,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Job application'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async editMyProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.user?.id as string;

    const data = {
      name: req.body.name,
      headline: req.body.headline,
      summary: req.body.summary,
      phone: req.body.phone,
      location: {
        city: req.body.city,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
      },
    };
    try {
      console.log('--edit profile details in controller--', req.body);
      const result = await this._editProfile.execute({ _id: id, ...data });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Profile details'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async saveJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id as string;
    const { jobId } = req.params;
    try {
      const dto = plainToInstance(AddJobFavoriteDTO, { candidateId, jobId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._saveJob.execute({ candidateId, jobId });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Job Saved'),
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async checkIsJobSaved(req: Request, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id as string;
    const jobId = req.params.jobId as string;
    try {
      const result = await this._checkIsJobSaved.execute(jobId, candidateId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job saved status'),
        isSaved: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async checkIsJobApplied(req: Request, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id as string;
    const jobId = req.params.jobId;
    try {
      const result = await this._checkIsJobApplied.execute(jobId, candidateId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job applied status'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id as string;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const sort = (req.query.sort as string) || 'recently-saved';
    try {
      const result = await this._getSavedJobs.execute({
        candidateId,
        search,
        page,
        limit,
        sort,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Favorite jobs'),
        result: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unsaveJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    const savedId = req.params.id;

    try {
      await this._unsaveJob.execute(savedId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Job unsave status'),
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addSocialLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const urlObj = url.parse(req.body?.url);
    const domain = urlObj?.hostname as string;

    try {
      const result = await this._addSocialLink.execute({ userId, domain, ...req.body });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Social media'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteSocialLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const domain = req.body?.domain as string;

    try {
      const result = await this._deleteSocialLink.execute({ userId, domain });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Social media link'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async uploadProfilePicture(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const img = req.file?.buffer as Buffer<ArrayBufferLike>;
    const publicId = req.query?.publicId as string;

    try {
      const result = await this._uploadUserProfilePictureUC.execute({
        userId,
        imageFile: img,
        publicId,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Profile photo'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async removeProfilePicture(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const cloudinaryPublicId = req.body.cloudinaryPublicId as string;

    try {
      const result = await this._removeUserProfPictureUC.execute({ cloudinaryPublicId, userId });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Profile photo'),
        result,
      });
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async uploadCoverphoto(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const publicId = (req.query?.publicId as string) || '';
    const imgFile = req.file?.buffer as Buffer<ArrayBufferLike>;

    try {
      const result = await this._uploadUserCoverPhotoUC.execute({
        userId,
        publicId,
        imageFile: imgFile,
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Cover photo'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //rfixed

  async removeCoverphoto(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;
    const cloudinaryPublicId = req.query?.publicId as string;

    try {
      const result = await this._removeUserCoverPhotoUC.execute({ cloudinaryPublicId, userId });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Cover photo'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query?.search as string) || '';
    const page = parseInt(req.query?.page as string) || 1;
    const limit = parseInt(req.query?.limit as string) || 4;
    const roleTypeFilter = (req.query.roleTypeFilter as string) || 'All';
    const experienceFilter = (req.query.experienceFilter as string) || 'All';
    const location = (req.query.location as string) || '';
    // const sort = (req.query?.sort as string) || '';
    // const filter = JSON.parse(req.query?.filter as string) || {};

    try {
      const result = await this._getUsersForPublic.execute({
        search,
        page,
        limit,
        roleTypeFilter,
        experienceFilter,
        location,
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Users'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async getCandidateApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id as string;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const sort = (req.query.sort as string) || 'recently-applied';
    const status = (req.query.status as string) || 'all';
    try {
      const result = await this._getMyApplications.execute({
        candidateId,
        search,
        page,
        limit,
        sort,
        status,
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Candidate applications'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async trackMyApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    const applicationId = req.params.applicationId;
    try {
      const result = await this._trackMyApplication.execute(applicationId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Job application details'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loadUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const sort = (req.query.sort as string) || '';
    const filter = JSON.parse(req.query?.filter as string) || {};

    try {
      const result = await this._loadUsersAdminUC.execute({ search, page, limit, sort, filter });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Users'),
        result,
        pagination: { page, limit },
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async loadUserDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;

    try {
      const result = await this._loadUserDetails.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('User details'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async blockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this._blockUser.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('User block status'),
        result,
      });
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async unBlockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this._unblockUser.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('User unblock status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;

      await this._deleteUser.execute(userId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('User') });
    } catch (error: unknown) {
      next(error);
    }
  }

  async userBan(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorizedAdminId = req.user?.id as string;
    const userId = req.params.userId;
    try {
      if (authorizedAdminId !== userId) {
        const result = await this._banUser.execute(userId);
        res.status(StatusCodes.OK).json({
          success: true,
          message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('User ban status'),
          result,
        });
      }
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async getSimilarUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logedUser = req.user.id;
    console.log('-- requrest for similar user fetching --');
    try {
      const result = await this._similarUsers.execute({ logedUserId: logedUser });
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Similar Users'),
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loadUserFullProfileForResumeBuidling(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.id;
    try {
      const result = await this._getUserFullProfileForResumeBuiding.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('User full profile'),
        result,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async aiInterview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._aiInterview.execute(req.body);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('AI Interview repsponse'),
        result
      });

    } catch (error) {
      next(error)
    }
  }
}
