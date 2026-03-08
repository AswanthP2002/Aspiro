import { NextFunction, Request, Response } from 'express';
import url from 'url';

import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import IAddResumeUseCase from '../../application/interfaces/usecases/user/IAddResume.usecase.FIX';
import IVerifyUserUseCase from '../../application/interfaces/usecases/user/IVerifyUser.usecase.FIX';
import IEditProfileUseCase from '../../application/interfaces/usecases/user/IEditProfile.usecase.FIX';
import ICheckIsJobSavedUseCase from '../../application/interfaces/usecases/user/ICheckIsJobSaved.usecase.FIX';
import IUnsaveJobUseCase from '../../application/interfaces/usecases/user/IUnsaveJob.usecase.FIX';
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
import IAddUserExperienceUsecase from '../../application/interfaces/usecases/user/IAddUserExperience.usecase.FIX';
import IGetUserExperiencesUsecase from '../../application/interfaces/usecases/user/IGetUserExperiences.usecase.FIX';
import IAddUserEducationUsecase from '../../application/interfaces/usecases/user/IAddUserEducation.usecase.FIX';
import IGetUserEducationsUsecase from '../../application/interfaces/usecases/user/IGetUserEducations.usecase.FIX';
import IAddUsersSkillUsecase from '../../application/interfaces/usecases/user/IAddUsersSkill.usecase.FIX';
import IGetUserSkillsUsecase from '../../application/interfaces/usecases/user/IGetUserSkills.usecase.FIX';
import IEditUserEducationUsecase from '../../application/interfaces/usecases/user/IEditUserEducation.usecase.FIX';
import IEditUserExperienceUsecase from '../../application/interfaces/usecases/user/IEditUserExperience.usecase.FIX';
import IDeleteUserExperienceUsecase from '../../application/interfaces/usecases/user/IDeleteUserExperience.usecase.FIX';
import IDeleteUserEducationUsecase from '../../application/interfaces/usecases/user/IDeleteUserEducation.usecase.FIX';
import IDeleteUserSkillUsecase from '../../application/interfaces/usecases/user/IDeleteUserSkill.usecase.FIX';
import ILoadJobsAggregatedUsecase from '../../application/interfaces/usecases/user/IloadJobsAggregated.usecase.FIX';
import SendResetPassworLinkUsecase from '../../application/usecases/user/SendPasswordResetLink.usecase.FIX';
import ResetPasswordUsecase from '../../application/usecases/user/ResetPassword.usecase.FIX';
import ILoadUserAggregatedProfileUsecase from '../../application/interfaces/usecases/user/ILoadUserAggregatedProfile.usecase.FIX';
import ILoadUserMetaDataUsecase from '../../application/interfaces/usecases/user/ILoadUserMetaData.usecase.FIX';
import IGetJobDetailsUseCase from '../../application/usecases/interfaces/IGetJobDetails.usecase.FIX';
import ISaveJobUsecase from '../../application/interfaces/usecases/user/ISaveJob.usecase.FIX';
import IGetSavedJobsUsecase from '../../application/interfaces/usecases/user/IGetSavedJobs.usecase.FIX';
import IApplyJobUsecase from '../../application/interfaces/usecases/user/IApplyJob.usecase.FIX';
import IGetMyApplicationsUsecase from '../../application/interfaces/usecases/user/IGetMyApplications.usecase.FIX';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '../../domain/errors/AppError';
import { ResendOtpDto } from '../../application/DTOs/user/resendOtp.dto.FIX';
import ILoadResumeUseCase from '../../application/interfaces/usecases/user/ILoadResumes.usecase.FIX';
import IDeleteResumeUseCase from '../../application/usecases/candidate/interface/IDeleteResume.usecase.FIX';
import IAddCertificateUseCase from '../../application/interfaces/usecases/user/IAddCertificate.usecase.FIX';
import ILoadCertificateUseCase from '../../application/interfaces/usecases/user/IGetCeritificates.usecase.FIX';
import AddJobFavoriteDTO from '../../application/DTOs/user/addJobFavorite.dto.FIX';
import IDeleteCertificateUsecase from '../../application/interfaces/usecases/user/IDeleteCertificate.usecase';
import ISetResumePrimaryUsecase from '../../application/interfaces/usecases/user/ISetResumePrimary.usecase';
import IGetUsersForPublicUsecase from '../../application/interfaces/usecases/user/IGetUsersforPublic.usecase';
import ILoadMyProfileUsecase from '../../application/interfaces/usecases/user/ILoadMyProfile.usecase.FIX';
import IGetUserAlertsUsecase from '../../application/interfaces/usecases/user/IGetUserAlerts.usecase';
import ISendConnectionRequestUsecase from '../../application/interfaces/usecases/user/ISendConnectionRequest.usecase';
import IRejectConnectionRequestUsecase from '../../application/interfaces/usecases/user/IRejectConnectionRequest.usecase';
import ICancelConnectionRequestUsecase from '../../application/interfaces/usecases/user/ICancelConnectionRequest.usecase';
import IAcceptConnectionRequestUsecase from '../../application/interfaces/usecases/user/IAcceptConnectionRequest.usecase';
import { generateToken, verifyToken } from '../../services/jwt';
import ICheckIsJobApplied from '../../application/interfaces/usecases/user/ICheckJobApplied.usecase';
import ISendResetPassworLinkUsecase from '../../application/interfaces/usecases/user/ISendPasswordResetLink.usecase.FIX';
import IResetPasswordUsecase from '../../application/interfaces/usecases/user/IResetPassword.usecase.FIX';

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
    @inject('IAddUserExperienceUsecase') private _addUserExperience: IAddUserExperienceUsecase,
    @inject('IGetUserExperiencesUsecase') private _getUserExperiencesUC: IGetUserExperiencesUsecase,
    @inject('IAddUserEducationUsecase') private _addUserEducationUC: IAddUserEducationUsecase, // private _verifyUserUC: IVerifyUserUseCase, //usecase interface // private _registerCandidateUC: IRegisterCandidateUseCase, //usecase interface // private _loginCandidateUC: ILoginCandidateUseCase, //usecase interface // private _SaveBasicsCandidateUC: ISaveBasicsCandidateUseCase, //usecase interface // private _loadCandidatePersonalDataUC: ILoadCandidatePersonalDataUseCase, //usecase interface // private _addExperienceUC: IAddExperience, //usecase interface // private _getExperiencesUC: ILoadExperiencesUseCase, //usecase interface // private _deleteExperienceUC: IDeleteExperienceUseCase, //usecase interface // private _editExperienceUC: IEditExperienceUseCase, //usecase interface // private _loadJobsUC: ILoadJobCandidateSideUseCase, //usecase interface // private _loadJobDetailsUC: ILoadJobDetailsCandidateSideUseCase, //usecase interface // private _addSkillsUC: IAddSkillsUseCase, //usecase interface // private _getSkillsUC: ILoadSkillsUseCase, //usecase interface // private _deleteSkillUC: IDeleteSkillsUseCase, //usecase interface // private _addEducationUC: IAddEducationUseCase, //usecase interface // private _getEducationsUC: ILoadEducationsUseCase, //usecase interface // private _deleteEducationUC: IDeleteEducationUseCase, //usecase interface // private _editEducationUC: IEditEducationUseCase, //usecase interface // private _addResumeUC: IAddResumeUseCase, //usecase interface // private _loadResumeUC: ILoadResumeUseCase, //usecase interface // private _deleteResumeUC: IDeleteResumeUseCase, //usecase interface // private _addCertificate: IAddCertificateUseCase, //usecase interface // private _getCertificates: ILoadCertificateUseCase, //usecase interface // private _saveJobApplicationUC: ISaveJobApplicationUseCase, //usecase interface // private _searchJobFromHomeUC: ISearchJobsFromHomeUseCase, //usecase interface, // private _editCandidateProfileUC: IEditProfileUseCase, //usecase interface // private _getNotificationsUC: IGetNotificationsUseCase, // private _saveJobUC: ISaveFavoriteJobUseCase, // private _checkIsJobSavedUC: ICheckIsJobSavedUseCase, // private _getSavedJobsUC: IGetFavoriteJobUseCase, // private _unsaveJobUC: IUnsaveJobUseCase, // private _addSocialLinkUC: IAddSocialLinkUsecase, // private _deleteSocialLinkUC: IDeleteSocialLinkUseCase, // private _uploadProfilePictureUC: IUploadProfilePictureUseCase, // private _removeProfilePictureUC: IRemoveProfilePictureUseCase, // private _uploadCoverphotoUC: IUploadCoverPhotoUseCase, // private _removeCoverphotoUC: IRemoveCoverphotoUseCase, // private _getCandidatesUC: IGetCandidatesUseCase, // private _getCandidateDetailsUC: IGetCandidateDetailsUseCase, // private _getCandidateApplicationsUC: IGetCandidateApplicationsUseCase, // private _updateNotificationReadStatus: IUpdateNotificationReadStatus, // private _createUserUC: ICreateUserUseCase, // private _findCandidateByUserIdUC: IFindCandidateByUserIdUseCase
    @inject('IGetUserEducationsUsecase') private _getUserEducationsUC: IGetUserEducationsUsecase,
    @inject('IAddUsersSkillUsecase') private _addUserSkillUC: IAddUsersSkillUsecase,
    @inject('IGetUsersSkillsUsecase') private _getUserSkillsUC: IGetUserSkillsUsecase,
    @inject('IEditUserEducationUsecase') private _editUserEducationUC: IEditUserEducationUsecase,
    @inject('IEditUserExperienceUsecase') private _editUserExperienceUC: IEditUserExperienceUsecase,
    @inject('IDeleteUserExperienceUsecase')
    private _deleteUserExperienceUC: IDeleteUserExperienceUsecase,
    @inject('IDeleteUserEducationUsecase')
    private _deleteUserEducationUC: IDeleteUserEducationUsecase,
    @inject('IDeleteUserSkillUsecase') private _deleteUserSkillUC: IDeleteUserSkillUsecase,
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
    @inject('IAddResumeUsecase') private _addResume: IAddResumeUseCase,
    @inject('IGetMyApplicationsUsecase') private _getMyApplications: IGetMyApplicationsUsecase,
    @inject('ILoadResumeUsecase') private _loadResumes: ILoadResumeUseCase,
    @inject('IDeleteResumeUsecase') private _deleteResume: IDeleteResumeUseCase,
    @inject('IAddCertificate') private _addCertificate: IAddCertificateUseCase,
    @inject('ILoadCertificates') private _loadCertificates: ILoadCertificateUseCase,
    @inject('IDeleteCertificateUsecase') private _deleteCertificate: IDeleteCertificateUsecase,
    @inject('ISetResumePrimary') private _setResumePrimary: ISetResumePrimaryUsecase,
    @inject('IGetUsersForPublicUsecase') private _getUsersForPublic: IGetUsersForPublicUsecase,
    @inject('IGetUserAlertsUsecase') private _getUserAlerts: IGetUserAlertsUsecase,
    @inject('ISendConnectionRequestUsecase')
    private _sendConnectionRequest: ISendConnectionRequestUsecase,
    @inject('IRejectConnectionRequestUsecase')
    private _rejectConnectionRequest: IRejectConnectionRequestUsecase,
    @inject('ICancelConnectionRequestUsecase')
    private _cancelConnectionRequest: ICancelConnectionRequestUsecase,
    @inject('IAcceptConnectionRequestUsecase')
    private _acceptConnectionRequest: IAcceptConnectionRequestUsecase,
    @inject('ICheckIsJobAppliedUsecase') private _checkIsJobApplied: ICheckIsJobApplied
  ) {}

  async testInfinityScroll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = req.query.search || '';
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
        message: 'User created need to verify before continue',
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
        message: 'Email verified successfully, please login to continue',
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
        message: 'OTP sent successfully',
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
          message: 'User login successfull',
          result: { user: result.user, accessToken: result.accessToken, role: result.role },
        });
    } catch (error: unknown) {
      next(error);
    }
  }

  async reAuthenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        console.log('--Refreshtoken not provided--');
        res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .json({ success: false, message: 'No refresh token provided' });
        return;
      }
      const decoded = (await verifyToken(refreshToken)) as JWTTokenVerifyResult; //chance for error

      const result = await this._loadUserMetaData.execute(decoded.id);
      const accessToken = await generateToken({
        id: decoded?.id as string,
        email: decoded?.email as string,
        role: decoded?.role as string,
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Metadata fetched successfully',
        userData: result,
        accessToken,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Error occured while refreshing accessToken', error);
        switch (error.name) {
          case 'TokenExpiredError':
            res.status(StatusCodes.UNAUTHORIZED).json({
              success: false,
              message: 'Your session has expired, please login again',
              errors: {
                code: 'REFRESH_TOKEN_EXPIRED',
                message: 'Refresh token expired, please login again',
              },
            });
            break;

          case 'JsonWebTokenError':
            res.status(StatusCodes.UNAUTHORIZED).json({
              success: false,
              message: 'Invalid Token, please login again',
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
              message: 'Something went wrong, please try again after some time',
            });
        }
      }
    }
  } //fixed

  async saveUsersBasics(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id as string;

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
        message: 'Basic details saved, login to your profile to continue',
        updatedCandidate: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadUserProfile(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;
    console.log('-- Inspecting user id from the controller --', id);
    try {
      const userDetails = await this._loadMyProfile.execute(id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'User Profile data fetched successfully',
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

      res.status(StatusCodes.OK).json({ success: true, message: 'User logout successful' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addExperience(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    try {
      const result = await this._addUserExperience.execute({ userId, ...req.body });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Experience added successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteExperience(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { experienceId } = req.params;

    try {
      await this._deleteUserExperienceUC.execute(experienceId);

      res.status(StatusCodes.OK).json({ success: true, message: 'Experience deleted' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getExperiences(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.user?.id;
    try {
      const experience = await this._getUserExperiencesUC.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Experience details fetched successfully',
        experience,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async editExperience(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { experienceId } = req.params;
    try {
      const result = await this._editUserExperienceUC.execute({ experienceId, ...req.body });
      res.status(StatusCodes.OK).json({ success: true, message: 'Edited', result });
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

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadUsersPublicProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    try {
      const result = await this._loadUserPublicProfile.execute(userId);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Profile fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //FIXED

  async loadJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { jobId } = req.params;

    try {
      const jobDetails = await this._getJobDetails.execute(jobId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Job details fetched', jobDetails });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addSkill(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      const result = await this._addUserSkillUC.execute({ userId, ...req.body });
      res.status(StatusCodes.OK).json({ success: true, message: 'added', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      const skills = await this._getUserSkillsUC.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Skills fetched successfully',
        skills,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteSkill(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { skillId } = req.params;

    try {
      await this._deleteUserSkillUC.execute(skillId);

      res.status(StatusCodes.OK).json({ success: true, message: 'Skill removed' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addEducation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._addUserEducationUC.execute({ userId, ...req.body });

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Education added successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getEducations(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._getUserEducationsUC.execute(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Educations fetched successfully',
        educations: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteEducation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { educationId } = req.params;
    try {
      await this._deleteUserEducationUC.execute(educationId);

      res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async editEducation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { educationId } = req.params;

    try {
      const result = await this._editUserEducationUC.execute({ _id: educationId, ...req.body });

      res.status(StatusCodes.OK).json({ success: true, message: 'Education edited', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async sendResetPasswordLink(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    try {
      await this._sendResetPasswordLink.execute(email);

      res.status(StatusCodes.OK).json({ success: true, message: 'Email sent successfully' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async resetPassword(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      await this._resetPassword.execute(req.body);

      res.status(StatusCodes.OK).json({ success: true, message: 'Password reset successfully' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addResume(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      if (req.file) {
        const resume = req.file.buffer;

        const result = await this._addResume.execute({
          userId,
          file: resume,
          path: req.file.originalname,
          ...req.body,
        });

        if (!result) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ success: false, message: 'Failed to process resume' });
          return;
        }

        res.status(StatusCodes.OK).json({
          success: true,
          message: 'Resume added successfully',
          result,
        });
        return;
      }
      console.log('No file found in request for addResume');
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Can not add resume' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadResume(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const resumes = await this._loadResumes.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Resumes fetched successfully',
        resumes,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async setResumePrimary(req: Auth, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const resumeId = req.params.resumeId;

      const result = await this._setResumePrimary.execute({ resumeId, userId });

      res.status(StatusCodes.OK).json({ success: true, message: 'Resume set to primary', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteResume(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { resumeId } = req.params;
    const cloudinaryPublicId = req.query?.cloudinaryPublicId as string;

    try {
      await this._deleteResume.execute({ cloudinaryPublicId, resumeId });

      res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addCertificate(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      if (req.file) {
        const arrayBuffer = req.file.buffer;
        const filePathName = req.file.originalname.split('.')[0];

        const result = await this._addCertificate.execute({
          file: arrayBuffer,
          path: filePathName,
          userId,
          ...req.body,
        });

        res
          .status(StatusCodes.OK)
          .json({ success: true, message: 'Certificate added successfully', result });
        return;
      }
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getCertificates(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._loadCertificates.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Certificates fetched successfully',
        certificates: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteCertificate(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const cloudinaryPublicId = req.query.cloudinaryPublicId as string;
    const certificateId = req.params.certificateId;

    try {
      await this._deleteCertificate.execute({ certificateId, cloudinaryPublicId });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Certificate deleted successfully' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async applyJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    const { jobId } = req.params;
    const { coverLetterContent, resumeId } = req.body;
    try {
      const result = await this._applyJob.execute({
        candidateId,
        coverLetterContent,
        jobId,
        resumeId,
      });

      res.status(StatusCodes.OK).json({ success: true, message: 'success', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async editMyProfile(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;

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
        message: 'Profile details updated successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async saveJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    const { jobId } = req.params;
    try {
      const dto = plainToInstance(AddJobFavoriteDTO, { candidateId, jobId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._saveJob.execute({ candidateId, jobId });

      res.status(StatusCodes.CREATED).json({ success: true, message: 'Job saved' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async checkIsJobSaved(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    const jobId = req.params.jobId as string;
    try {
      const result = await this._checkIsJobSaved.execute(jobId, candidateId);

      res.status(StatusCodes.OK).json({ success: true, message: 'checked', isSaved: result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async checkIsJobApplied(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    const jobId = req.params.jobId;
    try {
      const result = await this._checkIsJobApplied.execute(jobId, candidateId);
      res.status(StatusCodes.OK).json({ success: true, message: 'result', result });
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
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
        message: 'Favorite jobs fetched sucessfully',
        result: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async unsaveJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const savedId = req.params.id;

    try {
      await this._unsaveJob.execute(savedId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Unsaved' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addSocialLink(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const urlObj = url.parse(req.body?.url);
    const domain = urlObj?.hostname as string;

    try {
      const result = await this._addSocialLink.execute({ userId, domain, ...req.body });

      res.status(StatusCodes.OK).json({ success: true, message: 'Social link added', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteSocialLink(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const domain = req.body?.domain as string;

    try {
      const result = await this._deleteSocialLink.execute({ userId, domain });

      res.status(StatusCodes.OK).json({ success: true, message: 'Removed', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async uploadProfilePicture(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const img = req.file?.buffer;
    const publicId = req.query?.publicId as string;

    try {
      const result = await this._uploadUserProfilePictureUC.execute({
        userId,
        imageFile: img,
        publicId,
      });

      res.status(StatusCodes.OK).json({ success: true, message: 'Profile photo updated', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async removeProfilePicture(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const cloudinaryPublicId = req.body.cloudinaryPublicId as string;

    try {
      const result = await this._removeUserProfPictureUC.execute({ cloudinaryPublicId, userId });

      res.status(StatusCodes.OK).json({ success: true, message: 'Photo removed', result });
      return;
    } catch (error: unknown) {
      next(error);
    }
  }

  async uploadCoverphoto(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const publicId = (req.query?.publicId as string) || '';
    const imgFile = req.file?.buffer;

    try {
      const result = await this._uploadUserCoverPhotoUC.execute({
        userId,
        publicId,
        imageFile: imgFile,
      });

      res.status(StatusCodes.OK).json({ success: true, message: 'Cover photo updated', result });
    } catch (error: unknown) {
      next(error);
    }
  } //rfixed

  async removeCoverphoto(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const cloudinaryPublicId = req.query?.publicId as string;

    try {
      const result = await this._removeUserCoverPhotoUC.execute({ cloudinaryPublicId, userId });

      res.status(StatusCodes.OK).json({ success: true, message: 'Cover photo removed', result });
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
        message: 'users list fetched successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async getMyAlerts(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      const result = await this._getUserAlerts.execute(userId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'User Alerts fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getCandidateApplications(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id;
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
        message: 'Applications fetched successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async sendConnectionRequest(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const sender = req.user.id;
    const receiver = req.params.receiverId;
    const { acted_by, acted_user_avatar } = req.body;

    try {
      const result = await this._sendConnectionRequest.execute({
        sender,
        receiver,
        acted_by,
        acted_user_avatar,
      });

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Connection Request send', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async cancelConnectionRequest(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const sender = req.user.id;
    const receiver = req.params.receiverId;
    try {
      const result = await this._cancelConnectionRequest.execute({ sender, receiver });
      res.status(StatusCodes.OK).json({ success: true, message: 'Canceled', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async rejectConnectionRequest(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const sender = req.body.sender;
    const receiver = req.user.id;

    try {
      const result = await this._rejectConnectionRequest.execute({ receiver, sender });
      res.status(StatusCodes.OK).json({ success: true, message: 'Request rejected' });
    } catch (error: unknown) {
      next(error);
    }
  }

  async acceptConnectionRequest(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const receiver = req.user.id;
    const { sender, acted_by, acted_user_avatar } = req.body;

    try {
      const result = await this._acceptConnectionRequest.execute({
        senderId: sender,
        myId: receiver,
        myName: acted_by,
        myAvatar: acted_user_avatar,
      });

      res.status(StatusCodes.OK).json({ success: true, message: 'Accepted', result });
    } catch (error) {
      next(error);
    }
  }
}
