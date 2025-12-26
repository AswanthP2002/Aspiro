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
import mapToVerifyUserDTO from '../mappers/user/mapToVerifyUserRequestDTO';
import MapToAddExperienceDTO from '../mappers/user/mapToCreateExperienceDto';
import mapToCreateSkillDTOFromRequest from '../mappers/candidate/mapToCreateSkillDTOFromRequest';
import mapToCreateEducationDTOFromRequest from '../mappers/candidate/mapToCreateEducationDTOFromRequest';
import mapToUpdateEducationDTOFromRequest from '../mappers/candidate/mapToUpdateEducationDTOFromRequest';
import mapToUploadProfilePictureDTOFromRequest from '../mappers/user/mapToUploadProfilePictureDTOFromRequest';
import mapToUploadCoverPhotoDTOFromRequest from '../mappers/user/mapToUploadcoverphotoDTOFromRequest';
import IRemoveCoverphotoUseCase from '../../application/interfaces/usecases/user/IRemoveUserCoverPhoto.usecase.FIX';
import mapToAddsocialLinkDTOFromRequest from '../mappers/user/mapToAddSocialLinkDTOFromRequest';
import mapToEditExperienceDTO from '../mappers/user/mapToEditExperienceDTO';
import mapEditProfileRequestToUpdateDTO from '../mappers/user/mapEditProfileRequestToUpdateDTO';
import ICreateUserUseCase from '../../application/interfaces/usecases/user/ICreateUser.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { verifyUserInputsSchema } from '../schemas/user/verifyUserInputs.schema';
import IResendOTPUseCase from '../../application/interfaces/usecases/user/IResendOTP.usecase.FIX';
import { resendOtpSchema } from '../schemas/user/resendOtp.schema';
import IUserLoginUseCase from '../../application/interfaces/usecases/user/IUserLogin.usecase.FIX';
import mapToUserLoginDTO from '../mappers/user/mapToUserLoginDTO';
import ILoadUserProfileUsecase from '../../application/interfaces/usecases/user/ILoadUserProfile.usecase.FIX';
import { userIdSchema } from '../schemas/user/userId.schema';
import ISaveUserBasicsUsecase from '../../application/interfaces/usecases/user/ISaveUsersBasics.usecase.FIX';
import { SaveUserBasicsSchema } from '../schemas/user/saveUserBasics.schema';
import mapToUpdateUserDTO from '../mappers/user/mapToUpdateUserDTO';
import IUploadUserCoverPhotoUsecase from '../../application/interfaces/usecases/user/IUploadUserCoverPhoto.usecase.FIX';
import IUploadUserProfilePictureUsecase from '../../application/interfaces/usecases/user/IUploadUserProfilePicture.usecase.FIX';
import IRemoveUserProfilePictureUsecase from '../../application/interfaces/usecases/user/IRemoveUserProfilePciture.usecase.FIX';
import IAddUserExperienceUsecase from '../../application/interfaces/usecases/user/IAddUserExperience.usecase.FIX';
import IGetUserExperiencesUsecase from '../../application/interfaces/usecases/user/IGetUserExperiences.usecase.FIX';
import IAddUserEducationUsecase from '../../application/interfaces/usecases/user/IAddUserEducation.usecase.FIX';
import IGetUserEducationsUsecase from '../../application/interfaces/usecases/user/IGetUserEducations.usecase.FIX';
import IAddUsersSkillUsecase from '../../application/interfaces/usecases/user/IAddUsersSkill.usecase.FIX';
import { createUserSkillSchema } from '../schemas/user/createUserSkill.schema';
import IGetUserSkillsUsecase from '../../application/interfaces/usecases/user/IGetUserSkills.usecase.FIX';
import IEditUserEducationUsecase from '../../application/interfaces/usecases/user/IEditUserEducation.usecase.FIX';
import IEditUserExperienceUsecase from '../../application/interfaces/usecases/user/IEditUserExperience.usecase.FIX';
import IDeleteUserExperienceUsecase from '../../application/interfaces/usecases/user/IDeleteUserExperience.usecase.FIX';
import IDeleteUserEducationUsecase from '../../application/interfaces/usecases/user/IDeleteUserEducation.usecase.FIX';
import IDeleteUserSkillUsecase from '../../application/interfaces/usecases/user/IDeleteUserSkill.usecase.FIX';
import { experienceIdSchema } from '../schemas/user/experienceId.schema';
import ILoadJobsAggregatedUsecase from '../../application/interfaces/usecases/user/IloadJobsAggregated.usecase.FIX';
import { recruiterJobsSchema } from '../schemas/shared/recruiterJobsQuery.schema';
import mapToLoadJobsQueryDTOFromRequest from '../mappers/user/mapLoadJobsQueryFromRequest.mapper';
import SendResetPassworLinkUsecase from '../../application/usecases/user/SendPasswordResetLink.usecase.FIX';
import ResetPasswordUsecase from '../../application/usecases/user/ResetPassword.usecase.FIX';
import mapResetPasswordDtoMapper from '../../application/mappers/user/mapResetPasswordDto.mapper';
import ILoadUserAggregatedProfileUsecase from '../../application/interfaces/usecases/user/ILoadUserAggregatedProfile.usecase.FIX';
import ILoadUserMetaDataUsecase from '../../application/interfaces/usecases/user/ILoadUserMetaData.usecase.FIX';
import IGetJobDetailsUseCase from '../../application/usecases/interfaces/IGetJobDetails.usecase.FIX';
import ISaveJobUsecase from '../../application/interfaces/usecases/user/ISaveJob.usecase.FIX';
import IGetSavedJobsUsecase from '../../application/interfaces/usecases/user/IGetSavedJobs.usecase.FIX';
import IApplyJobUsecase from '../../application/interfaces/usecases/user/IApplyJob.usecase.FIX';
import IGetMyApplicationsUsecase from '../../application/interfaces/usecases/user/IGetMyApplications.usecase.FIX';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../../application/DTOs/user/createUser.dto.FIX';
import { validate } from 'class-validator';
import { ValidationError } from '../../domain/errors/AppError';
import { VerifyUserDto } from '../../application/DTOs/user/verifyUser.dto.FIX';
import { ResendOtpDto } from '../../application/DTOs/user/resendOtp.dto.FIX';
import { UserLoginRequestDto } from '../../application/DTOs/user/userLogin.dto';
import UpdateUserDTO, { UpdataeUserDto } from '../../application/DTOs/user/updateUser.dto.FIX';
import {
  CreateExperienceDto,
  UpdateExperienceDto,
} from '../../application/DTOs/user/experience.dto.FIX';
import { LoadJobsAggregatedQueryDto } from '../../application/DTOs/job/loadJobsAggregatedQuery.dto.FIX';
import { CreateSkillDTO } from '../../application/DTOs/user/skill.dto.FIX';
import {
  CreateEducationDTO,
  UpdateEducationDTO,
} from '../../application/DTOs/user/education.dto.FIX';
import { ResetPasswordDto } from '../../application/DTOs/user/resetPassword.dto.FIX';
import {
  CreateResumeDTO,
  DeleteResumeDTO,
} from '../../application/DTOs/candidate -LEGACY/resume.dto';
import ILoadResumeUseCase from '../../application/interfaces/usecases/user/ILoadResumes.usecase.FIX';
import IDeleteResumeUseCase from '../../application/usecases/candidate/interface/IDeleteResume.usecase.FIX';
import { CreateCertificateDTO } from '../../application/DTOs/candidate -LEGACY/certificate.dto.FIX';
import IAddCertificateUseCase from '../../application/usecases/candidate/interface/IAddCertificate.usecase.FIX';
import ILoadCertificateUseCase from '../../application/usecases/candidate/interface/IGetCeritificates.usecase.FIX';
import CreateJobApplicationDTO from '../../application/DTOs/candidate -LEGACY/jobApplication.dto.FIX';
import AddJobFavoriteDTO from '../../application/DTOs/user/addJobFavorite.dto.FIX';
import AddSocialLinkDTO, {
  RemoveSocialLinkDTO,
} from '../../application/DTOs/user/socialLink.dto.FIX';
import { UploadProfilePictureDTO } from '../../application/DTOs/user/uploadProfilePicture.dto.FIX';
import RemoveProfilePhotoDTO, {
  RemoveCoverPhotoDTO,
} from '../../application/DTOs/candidate -LEGACY/removeProfilePhoto.dto.FIX';
import { UploadCoverPhotoDTO } from '../../application/DTOs/candidate -LEGACY/uploadCoverPhoto.dto.FIX';

@injectable()
export class UserController {
  constructor(
    @inject('ICreateUserUsecase') private _createUserUsecase: ICreateUserUseCase,
    @inject('IVerifyUserUsecase') private _verifyUserUC: IVerifyUserUseCase,
    @inject('IResendOTPUsecase') private _resendOTPUC: IResendOTPUseCase,
    @inject('IUserLoginUsecase') private _userLoginUC: IUserLoginUseCase,
    @inject('ILoadUserProfileUsecase') private _loadUserProfileUC: ILoadUserProfileUsecase,
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
    private _sendResetPasswordLink: SendResetPassworLinkUsecase,
    @inject('IResetPasswordUsecase') private _resetPassword: ResetPasswordUsecase,
    @inject('IAddSocialLinkUsecase') private _addSocialLink: IAddSocialLinkUsecase,
    @inject('IDeleteSocialLinkUsecase') private _deleteSocialLink: IDeleteSocialLinkUseCase,
    @inject('IEditProfileUsecase') private _editProfile: IEditProfileUseCase,
    @inject('ILoadUserAggregatedProfileUsecase')
    private _loadUserAggregatedProfile: ILoadUserAggregatedProfileUsecase,
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
    @inject('ILoadCertificates') private _loadCertificates: ILoadCertificateUseCase
  ) {}

  /**
   * 1. Controller gets validated data from the router
   * 2. map to dto
   * 3. call particular usecase
   */

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const validateInput = CreateUserSchema.parse(req.body);
      // const createUserDto = mapRequestToCreateUserDTO(validateInput);
      const dto = plainToInstance(CreateUserDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new ValidationError();
      }

      const createUser = await this._createUserUsecase.execute(dto);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Candidate created need to verify before continue',
        userId: createUser?._id,
        userEmail: createUser?.email,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const validatedInputs = verifyUserInputsSchema.parse(req.body);
      const dto = plainToInstance(VerifyUserDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new ValidationError();
      }

      const verifiedUser = await this._verifyUserUC.execute(dto);

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
    //candidate  login
    try {
      const dto = plainToInstance(UserLoginRequestDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._userLoginUC.execute(dto);
      const { refreshToken } = result;

      res
        .status(StatusCodes.OK)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: 'User login successfull',
          result: { user: result.user, accessToken: result.token, role: result.role },
        });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadUserMetaData(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const result = await this._loadUserMetaData.execute(userId);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Metadata fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async saveUsersBasics(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id as string;

    try {
      // const validatedId = userIdSchema.parse({ id });
      // const validatedData = SaveUserBasicsSchema.parse(req.body);
      //console.log('--data came from the body--', req.body);
      const adapterBody = {
        _id: id,
        headline: req.body.headline,
        summary: req.body.summary,
        location: {
          state: req.body.state,
          city: req.body.city,
          district: req.body.district,
          country: req.body.country,
          pincode: req.body.pincode,
        },
      };
      //console.log('--adapter body--', adapterBody);
      const dto = plainToInstance(UpdataeUserDto, adapterBody);
      //console.log('--data after transformed', dto);
      //console.log('--data expecting in this form--', UpdateUserDTO);

      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._saveUserBasicsUC.execute(dto);

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
    try {
      const userDetails = await this._loadUserProfileUC.execute(id);

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
      //const dto = MapToAddExperienceDTO({ userId: userId, ...req.body });
      const dto = plainToInstance(CreateExperienceDto, { userId, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._addUserExperience.execute(dto);

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
      const dto = plainToInstance(UpdateExperienceDto, { _id: experienceId, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._editUserExperienceUC.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Edited', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortOption = (req.query.sort as string) || 'Newest';
    const filter = JSON.parse(req.query.filter as string) || {};
    //location search is pending

    try {
      // const valdiateQueryData = recruiterJobsSchema.parse({
      //   search,
      //   page,
      //   limit,
      //   sortOption,
      //   filter,
      // });
      const dto = plainToInstance(LoadJobsAggregatedQueryDto, {
        search,
        page,
        limit,
        sortOption,
        filter,
      });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();
      const result = await this._loadJobs.execute(dto);

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Jobs fetched successfully', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async loadUserAggregatedProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;
    try {
      const result = await this._loadUserAggregatedProfile.execute(userId);

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
      //console.log('--checking job details from the backend--', jobDetails);
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
      // const validatedId = userIdSchema.parse({ id: userId });
      // const validateData = createUserSkillSchema.parse(req.body);
      const dto = plainToInstance(CreateSkillDTO, { userId, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._addUserSkillUC.execute(dto);
      res.status(StatusCodes.OK).json({ success: true, message: 'added', skill: result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getSkills(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      const validatedId = userIdSchema.parse({ id: userId });
      const skills = await this._getUserSkillsUC.execute(validatedId.id);

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
      console.log('--checking skill id', skillId);
      await this._deleteUserSkillUC.execute(skillId);

      res.status(StatusCodes.OK).json({ success: true, message: 'Skill removed' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addEducation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const dto = plainToInstance(CreateEducationDTO, { userId, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._addUserEducationUC.execute(dto);

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
      const validateId = userIdSchema.parse({ id: userId });
      const result = await this._getUserEducationsUC.execute(validateId.id);

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
      console.log('--data from the req body--', req.body);
      const dto = plainToInstance(UpdateEducationDTO, { _id: educationId, ...req.body });
      console.log('--data after transformation--', dto);
      const errors = await validate(dto);
      console.log('--checking errors--', errors);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._editUserEducationUC.execute(dto);

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
      const dto = plainToInstance(ResetPasswordDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._resetPassword.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Password reset successfully' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async addResume(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    //testing file
    //console.log('Request for uploading resume reached here, controller candididateController.ts');
    try {
      if (req.file) {
        const resume = req.file.buffer;
        const dto = plainToInstance(CreateResumeDTO, {
          file: resume,
          path: req.file.originalname,
          candidateId,
        });
        const errors = await validate(dto);
        if (errors.length > 0) throw new ValidationError();

        const result = await this._addResume.execute(dto);

        res.status(StatusCodes.OK).json({
          success: true,
          message: 'Resume added successfully',
          resumeId: result?._id,
        });
        return;
      }
      //console.log('A problem occured while saving resume candidateController.ts');
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

  async deleteResume(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { resumeId } = req.params;
    const cloudinaryPublicId = req.query?.cloudinaryPublicId as string;

    try {
      const dto = plainToInstance(DeleteResumeDTO, { resumeId, cloudinaryPublicId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._deleteResume.execute(dto);

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
        const dto = plainToInstance(CreateCertificateDTO, {
          candidateId: userId,
          file: arrayBuffer,
          path: filePathName,
        });
        const errors = await validate(dto);
        if (errors.length > 0) throw new ValidationError();

        const result = await this._addCertificate.execute(dto);

        res
          .status(StatusCodes.OK)
          .json({ success: true, message: 'Certificate added successfully' });
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

  async saveJobApplication(req: Auth, res: Response, next: NextFunction): Promise<void> {
    //coverLetterContent, savedResumeId
    const candidateId = req.user.id;
    const { jobId } = req.params;
    const { coverLetterContent, resumeId } = req.body;

    try {
      const dto = plainToInstance(CreateJobApplicationDTO, {
        candidateId,
        jobId,
        coverLetterContent,
        resumeId,
      });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._applyJob.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'success', result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  // // async searchJobFromHomePage(req: Request, res: Response): Promise<Response> {
  // //   const search = (req.query.search as string) || '';
  // //   //console.log('search query from the controller', search)

  // //   try {
  // //     const jobs = await this._searchJobFromHomeUC.execute(search);

  // //     return res
  // //       .status(StatusCodes.OK)
  // //       .json({ success: true, message: 'success', jobs });
  // //   } catch (error: unknown) {
  // //     console.log('Error occured while searching the jobs', error);
  // //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  // //       success: false,
  // //       message: 'Internal server error, please try again after some time',
  // //     });
  // //   }
  // // }

  async editUserProfile(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;
    try {
      const dto = plainToInstance(UpdateUserDTO, { _id: id, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._editProfile.execute(dto);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Profile details updated successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  // async getNotifications(req: Auth, res: Response): Promise<Response> {
  //   const userId = req.user.id;
  //   try {
  //     const notifications = await this._getNotificationsUC.execute(userId);
  //     return res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Notifications fetched successfully',
  //       notifications,
  //     });
  //   } catch (error: unknown) {
  //     console.log(
  //       'Error occured while fetching candidate notifications',
  //       error
  //     );
  //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       susccess: false,
  //       message: 'Internal server error, please try again after some time',
  //     });
  //   }
  // }

  // async updateNotificationReadStatus(
  //   req: Auth,
  //   res: Response
  // ): Promise<Response> {
  //   const { id } = req.params;
  //   try {
  //     const result = await this._updateNotificationReadStatus.execute(id);
  //     return res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'Status updated to read' });
  //   } catch (error: unknown) {
  //     console.log('Errro occured while updating notification status', error);
  //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'Internal seerver error, pleaes try again after som etime',
  //     });
  //   }
  // }

  async saveJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    const { jobId } = req.params;
    try {
      const dto = plainToInstance(AddJobFavoriteDTO, { candidateId, jobId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._saveJob.execute({ candidateId, jobId });

      //console.log('--job saved--');
      res.status(StatusCodes.CREATED).json({ success: true, message: 'Job saved' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async checkIsJobSaved(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    const jobId = req.query.jobId as string;
    try {
      const result = await this._checkIsJobSaved.execute(jobId, candidateId);

      res.status(StatusCodes.OK).json({ success: true, message: 'checked', isSaved: result });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async getFavoriteJobs(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    try {
      const result = await this._getSavedJobs.execute(candidateId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Favorite jobs fetched sucessfully',
        jobs: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async unsaveJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user.id;
    const { jobId } = req.params;

    try {
      await this._unsaveJob.execute(jobId, candidateId);
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
      const dto = plainToInstance(AddSocialLinkDTO, { userId, domain, ...req.body });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      const result = await this._addSocialLink.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Social link added' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async deleteSocialLink(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const domain = req.body?.domain as string;

    try {
      const dto = plainToInstance(RemoveSocialLinkDTO, { userId, domain });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._deleteSocialLink.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Removed' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async uploadProfilePicture(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const img = req.file?.buffer;
    const publicId = req.query?.publicId as string;

    try {
      const dto = plainToInstance(UploadProfilePictureDTO, { userId, imageFile: img, publicId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._uploadUserProfilePictureUC.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Profile photo updated' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  async removeProfilePicture(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const cloudinaryPublicId = req.body.cloudinaryPublicId as string;

    try {
      const dto = plainToInstance(RemoveProfilePhotoDTO, { userId, cloudinaryPublicId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._removeUserProfPictureUC.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Photo removed' });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //rfixed

  async uploadCoverphoto(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const publicId = (req.query?.publicId as string) || '';
    const imgFile = req.file?.buffer;

    try {
      const dto = plainToInstance(UploadCoverPhotoDTO, { userId, imageFile: imgFile, publicId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._uploadUserCoverPhotoUC.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Cover photo updated' });
    } catch (error: unknown) {
      next(error);
    }
  } //rfixed

  async removeCoverphoto(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const cloudinaryPublicId = req.query?.publicId as string;

    try {
      const dto = plainToInstance(RemoveCoverPhotoDTO, { userId, cloudinaryPublicId });
      const errors = await validate(dto);
      if (errors.length > 0) throw new ValidationError();

      await this._removeUserCoverPhotoUC.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Cover photo removed' });
    } catch (error: unknown) {
      next(error);
    }
  } //fixed

  // async getCandidates(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   console.log('Trying to inspect the request query params', req.query);
  //   const search = (req.query?.search as string) || '';
  //   const page = parseInt(req.query?.page as string) || 1;
  //   const limit = parseInt(req.query?.limit as string) || 4;
  //   const sort = (req.query?.sort as string) || '';
  //   const filter = JSON.parse(req.query?.filter as string) || {};

  //   try {
  //     const dto = mapToFindCandidatesDTOFromRequest({
  //       search,
  //       page,
  //       limit,
  //       sort,
  //       filter,
  //     });
  //     const result = await this._getCandidatesUC.execute(dto);
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Candidate list fetched successfully',
  //       result,
  //     });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async getCandidateDetails(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const candidateId = req.params?.candidateId as string;
  //   try {
  //     const result = await this._getCandidateDetailsUC.execute(candidateId);

  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Candidate details fetched successfully',
  //       candidateDetails: result,
  //     });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  async getCandidateApplications(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const candidateId = req.user?.id;
    try {
      const applications = await this._getMyApplications.execute(candidateId);
      //console.log('-------applications in the contorller', applications);
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Applications fetched successfully',
        applications,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  // }

  // export const getAuthUserData = async (req : Request, res : Response) : Promise<Response> => {
  //     try {
  //         const db = await connectDb()
  //         const {id} = req.params
  //         const cRepo = new CandidateRepository(db)
  //         const getAuthUseCase = new GetAuthUserUseCase(cRepo)
  //         const data = await getAuthUseCase.execute(id)
  //         return res.status(200).json({success:true, message:'user details fetched successfully', user:data})
  //     } catch (error) {
  //         console.log('error occured while geting google auth user data', error)
  //         return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
  //     }
}

// export const editCandidateProfile = async (req : Auth, res : Response) : Promise<Response> => {
//     console.log('Candidate edit request reached here', req.body)
//     try {
//         const db = await connectDb()
//         const id = req.user?.id
//         const {name, role, city, district, state, country} = req.body
//         const cRepo = new CandidateRepository(db)
//         const editProfileUseCase = new EditProfileUseCase(cRepo)
//         const result = await editProfileUseCase.execute(id, name, role, city, district, state, country)
//         return res.status(200).json({success:true, message:'Profile details updated successfully', data:result}) // ?? why data.result ???
//     } catch (error) {
//         console.log('Error occured while updating the candidate profile', error)
//         return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
//     }
// }

/**
 * Llama 3.1 8B
 * Llama 3.1 Chat
 * Llama 3.2 Chat
 * CodeLlama Instruct
 * Llama 3.1 Nemotron 70B
 * Llama3 Chat
 * Phind CodeLlama (34b)
 * Llama 4 Maverick Instruct
 * Llama 3.3 70B Instruct
 * Llama 3.3 Swallow 70B Instruct
 * Llama 3.1 8B
 */

/**
 * Qwen 2.5 coder 7b
 * Qwen 2.5 coder 32b
 * Qwen QwQ 32b Preview
 * Qwen 2.5 Coder 32b
 * Qwen 3 32B
 */

/**
 * Mistral Chat
 * Mistral
 * Codestral Mamba
 * Mistral Nemo
 */
