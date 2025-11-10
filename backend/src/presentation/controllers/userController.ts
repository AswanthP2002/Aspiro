import { NextFunction, Request, Response } from 'express';
import url from 'url';

import { Auth } from '../../middlewares/auth';
import { StatusCodes } from '../statusCodes';
import IRegisterCandidateUseCase from '../../application/usecases/candidate/interface/IRegisterCandidate.usecase';
import IAddCertificateUseCase from '../../application/usecases/candidate/interface/IAddCertificate.usecase';
import IAddEducationUseCase from '../../application/interfaces/usecases/user/IAddUserEducation.usecase';
import IAddExperience from '../../application/interfaces/usecases/user/IAddUserExperience.usecase';
import IAddResumeUseCase from '../../application/usecases/candidate/interface/IAddResume.usecase';
import IAddSkillsUseCase from '../../application/interfaces/usecases/user/IAddUsersSkill.usecase';
import ISaveJobApplicationUseCase from '../../application/usecases/candidate/interface/IApplyJob.usecase';
import ILoadCertificateUseCase from '../../application/usecases/candidate/interface/IGetCeritificates.usecase';
import IDeleteExperienceUseCase from '../../application/interfaces/usecases/user/IDeleteUserExperience.usecase';
import IDeleteSkillsUseCase from '../../application/interfaces/usecases/user/IDeleteUserSkill.usecase';
import IDeleteEducationUseCase from '../../application/interfaces/usecases/user/IDeleteUserEducation.usecase';
import IDeleteResumeUseCase from '../../application/usecases/candidate/interface/IDeleteResume.usecase';
import ILoadResumeUseCase from '../../application/usecases/candidate/interface/ILoadResumes.usecase';
import ILoadExperiencesUseCase from '../../application/interfaces/usecases/user/IGetUserExperiences.usecase';
import ILoadSkillsUseCase from '../../application/interfaces/usecases/user/IGetUserSkills.usecase';
import ILoadEducationsUseCase from '../../application/interfaces/usecases/user/IGetUserEducations.usecase';
import IVerifyUserUseCase from '../../application/interfaces/usecases/user/IVerifyUser.usecase';
import ILoginCandidateUseCase from '../../application/interfaces/usecases/user/IUserLogin.usecase';
import ILoadCandidatePersonalDataUseCase from '../../application/interfaces/usecases/user/ILoadUserProfile.usecase';
import ILoadJobCandidateSideUseCase from '../../application/interfaces/usecases/user/IloadJobsAggregated.usecase';
import ILoadJobDetailsCandidateSideUseCase from '../../application/usecases/candidate/interface/ILoadJobDetailsCandidateSide.usecase';
import IEditExperienceUseCase from '../../application/interfaces/usecases/user/IEditUserExperience.usecase';
import IEditEducationUseCase from '../../application/interfaces/usecases/user/IEditUserEducation.usecase';
import ISearchJobsFromHomeUseCase from '../../application/usecases/interfaces/ISearchJobsFromHome.usecase';
import IEditProfileUseCase from '../../application/usecases/candidate/interface/IEditProfile.usecase';
import IGetNotificationsUseCase from '../../application/usecases/candidate/interface/IGetNotifications.usecase';
import ISaveFavoriteJobUseCase from '../../application/usecases/candidate/interface/ISaveFavoriteJobs.usecase';
import ICheckIsJobSavedUseCase from '../../application/usecases/candidate/interface/ICheckIsJobSaved.usecase';
import IGetFavoriteJobUseCase from '../../application/interfaces/usecases/user/IGetFavoriteJobs.usecase';
import IUnsaveJobUseCase from '../../application/usecases/candidate/interface/IUnsaveJob.usecase';
import IAddSocialLinkUsecase from '../../application/usecases/candidate/interface/IAddSocialLink.usecase';
import IDeleteSocialLinkUseCase from '../../application/usecases/candidate/interface/IDeleteSocialLink.usecase';
import IRemoveProfilePictureUseCase from '../../application/interfaces/usecases/user/IRemoveUserProfilePciture.usecase';
import IUploadCoverPhotoUseCase from '../../application/interfaces/usecases/user/IUploadUserCoverPhoto.usecase';
import IGetCandidatesUseCase from '../../application/usecases/interfaces/IGetCandidates.usecase';
import IGetCandidateDetailsUseCase from '../../application/usecases/interfaces/IGetCandiateDetails.usecase';
import IGetCandidateApplicationsUseCase from '../../application/usecases/candidate/interface/IGetCandidateApplications.usecase';
import mapToCreateCandidateDTO from '../mappers/candidate/mapToCreateCandidateDTO';
import mapToVerifyUserDTO from '../mappers/user/mapToVerifyUserRequestDTO';
import mapToLoginCandidateInpDTO from '../mappers/user/mapToUserLoginDTO';
import MapToAddExperienceDTO from '../mappers/user/mapToCreateExperienceDto';
import mapToCreateSkillDTOFromRequest from '../mappers/candidate/mapToCreateSkillDTOFromRequest';
import mapToCreateEducationDTOFromRequest from '../mappers/candidate/mapToCreateEducationDTOFromRequest';
import mapToUpdateEducationDTOFromRequest from '../mappers/candidate/mapToUpdateEducationDTOFromRequest';
import mapToCreateCertificateDTOFromRequest from '../mappers/candidate/mapToCreateCertificateDTOFromRequest';
import mapToUploadProfilePictureDTOFromRequest from '../mappers/user/mapToUploadProfilePictureDTOFromRequest';
import mapToUploadCoverPhotoDTOFromRequest from '../mappers/user/mapToUploadcoverphotoDTOFromRequest';
import IRemoveCoverphotoUseCase from '../../application/interfaces/usecases/user/IRemoveUserCoverPhoto.usecase';
import mapToFindCandidatesDTOFromRequest from '../mappers/candidate/mapToFindCandidatesDTOFromRequest';
import mapToAddsocialLinkDTOFromRequest from '../mappers/candidate/mapToAddSocialLinkDTOFromRequest';
import IUpdateNotificationReadStatus from '../../application/usecases/candidate/interface/IUpdateNotificationReadStatus.usecase';
import mapToEditExperienceDTO from '../mappers/user/mapToEditExperienceDTO';
import ISaveBasicsCandidateUseCase from '../../application/interfaces/usecases/user/ISaveUsersBasics.usecase';
import mapRequestDtoToUpdateCandidateDTO from '../mappers/candidate/mapRequestDtoToUpdateCandidateDTO';
import mapEditProfileRequestToUpdateDTO from '../mappers/candidate/mapEditProfileRequestToUpdateDTO';
import ICreateUserUseCase from '../../application/interfaces/usecases/user/ICreateUser.usecase';
import mapToCandidateDTO from '../../application/mappers/user/mapToCandidateDTO.mapper';
import IFindCandidateByUserIdUseCase from '../../application/usecases/candidate/interface/IFindCandidateByUserId.usecase';
import { inject, injectable } from 'tsyringe';
import { CreateUserSchema } from '../schemas/user/createUser.schema';
import mapRequestToCreateUserDTO from '../mappers/user/mapCreateUserRequestToDTO.refactored';
import { verifyUserInputsSchema } from '../schemas/user/verifyUserInputs.schema';
import IResendOTPUseCase from '../../application/interfaces/usecases/user/IResendOTP.usecase';
import { resendOtpSchema } from '../schemas/user/resendOtp.schema';
import IUserLoginUseCase from '../../application/interfaces/usecases/user/IUserLogin.usecase';
import { userLoginSchema } from '../schemas/user/userLogin.schema';
import mapToUserLoginDTO from '../mappers/user/mapToUserLoginDTO';
import ILoadUserProfileUsecase from '../../application/interfaces/usecases/user/ILoadUserProfile.usecase';
import { userIdSchema } from '../schemas/user/userId.schema';
import ISaveUserBasicsUsecase from '../../application/interfaces/usecases/user/ISaveUsersBasics.usecase';
import { SaveUserBasicsSchema } from '../schemas/user/saveUserBasics.schema';
import mapToUpdateUserDTO from '../mappers/user/mapToUpdateUserDTO';
import IUploadUserCoverPhotoUsecase from '../../application/interfaces/usecases/user/IUploadUserCoverPhoto.usecase';
import IUploadUserProfilePictureUsecase from '../../application/interfaces/usecases/user/IUploadUserProfilePicture.usecase';
import IRemoveUserProfilePictureUsecase from '../../application/interfaces/usecases/user/IRemoveUserProfilePciture.usecase';
import IAddUserExperienceUsecase from '../../application/interfaces/usecases/user/IAddUserExperience.usecase';
import { userExperienceSchema } from '../schemas/user/userExperience.schema';
import IGetUserExperiencesUsecase from '../../application/interfaces/usecases/user/IGetUserExperiences.usecase';
import IAddUserEducationUsecase from '../../application/interfaces/usecases/user/IAddUserEducation.usecase';
import { addUserEducationSchema } from '../schemas/user/createUserEducation.schema';
import IGetUserEducationsUsecase from '../../application/interfaces/usecases/user/IGetUserEducations.usecase';
import IAddUsersSkillUsecase from '../../application/interfaces/usecases/user/IAddUsersSkill.usecase';
import { createUserSkillSchema } from '../schemas/user/createUserSkill.schema';
import IGetUserSkillsUsecase from '../../application/interfaces/usecases/user/IGetUserSkills.usecase';
import IEditUserEducationUsecase from '../../application/interfaces/usecases/user/IEditUserEducation.usecase';
import IEditUserExperienceUsecase from '../../application/interfaces/usecases/user/IEditUserExperience.usecase';
import IDeleteUserExperienceUsecase from '../../application/interfaces/usecases/user/IDeleteUserExperience.usecase';
import IDeleteUserEducationUsecase from '../../application/interfaces/usecases/user/IDeleteUserEducation.usecase';
import IDeleteUserSkillUsecase from '../../application/interfaces/usecases/user/IDeleteUserSkill.usecase';
import { experienceIdSchema } from '../schemas/user/experienceId.schema';
import { educationIdSchema } from '../schemas/user/educationId.schema';
import ILoadJobsAggregatedUsecase from '../../application/interfaces/usecases/user/IloadJobsAggregated.usecase';
import { recruiterJobsSchema } from '../schemas/shared/recruiterJobsQuery.schema';
import mapToLoadJobsQueryDTOFromRequest from '../mappers/user/mapLoadJobsQueryFromRequest.mapper';


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
    @inject('ILoadJobsAggregatedUsecase') private _loadJobs: ILoadJobsAggregatedUsecase
  ) {}


  /**
   * written controller flow
   * 1. recieving request
   * 2. validate data
   * 3. dto mapping
   * 4. executing
   * 5. sending response
   */

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validateInput = CreateUserSchema.parse(req.body);
      const createUserDto = mapRequestToCreateUserDTO(validateInput);
      const createUser = await this._createUserUsecase.execute(createUserDto);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Candidate created need to verify before continue',
        userId: createUser?._id,
        userEmail: createUser?.email,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInputs = verifyUserInputsSchema.parse(req.body);
      const dto = mapToVerifyUserDTO(validatedInputs);
      const verifiedUser = await this._verifyUserUC.execute(dto);

      if (!verifiedUser) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'User verification failed. Please try again.',
        });
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Email verified successfully, please login to continue',
        verifiedUser,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async resendOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validateInputs = resendOtpSchema.parse(req.body);
      const result = await this._resendOTPUC.execute({ ...validateInputs });

      if (!result) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Something went wrong',
        });
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'OTP sent successfully',
        result: { id: result?._id, email: result?.email },
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  //backend ok frontend implementation is left

  async userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    //candidate  login
    try {
      const validateInput = userLoginSchema.parse(req.body);
      const dto = mapToUserLoginDTO({ ...validateInput });
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
  } //reworked : void

  async saveUsersBasics(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id as string;

    try {
      const validatedId = userIdSchema.parse({ id }); 
      const validatedData = SaveUserBasicsSchema.parse(req.body);
      const dto = mapToUpdateUserDTO({ id: validatedId.id, ...validatedData });

      const result = await this._saveUserBasicsUC.execute(dto);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Basic details saved, login to your profile to continue',
        updatedCandidate: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async loadUserProfile(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const id = req.user.id;
    try {
      const validateId = userIdSchema.parse({ id });
      const userDetails = await this._loadUserProfileUC.execute(validateId.id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'User Profile data fetched successfully',
        userDetails,
      });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

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
  } //reworked : void

  async addExperience(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    try {
      const validateUserId = userIdSchema.parse({ id: userId });
      const validateData = userExperienceSchema.parse(req.body);
      const dto = MapToAddExperienceDTO({ userId: validateUserId.id, ...validateData });

      const result = await this._addUserExperience.execute(dto);

      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
      }

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Experience added successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async deleteExperience(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { experienceId } = req.params;

    try {
      const validatedId = experienceIdSchema.parse({id:experienceId})
      await this._deleteUserExperienceUC.execute(experienceId);
      
      res.status(StatusCodes.OK).json({ success: true, message: 'Experience deleted' });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async getExperiences(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.user?.id;
    try {
      const validatedUserId = userIdSchema.parse({ id: userId });
      const experience = await this._getUserExperiencesUC.execute(validatedUserId.id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Experience details fetched successfully',
        experience,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async editExperience(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { experienceId } = req.params;

    try {
      const validatedExperienceId = experienceIdSchema.parse({id:experienceId})
      const validateData = userExperienceSchema.parse(req.body);
      const dto = mapToEditExperienceDTO({ experienceId: validatedExperienceId.id, ...validateData });
      
      const result = await this._editUserExperienceUC.execute(dto)

      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({
          success:false, message:'Something went wrong'
        })
      }
      res.status(StatusCodes.OK).json({ success: true, message: 'Edited', result });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async loadJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
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
  } //reworked

  // // async loadJobDetails(
  // //   req: Request,
  // //   res: Response,
  // //   next: NextFunction
  // // ): Promise<void> {
  // //   const { jobId } = req.params;

  // //   try {
  // //     const jobDetails = await this._loadJobDetailsUC.execute(jobId);
  // //     res
  // //       .status(StatusCodes.OK)
  // //       .json({ success: true, message: 'Job details fetched', jobDetails });
  // //     return;
  // //   } catch (error: unknown) {
  // //     next(error);
  // //   }
  // // } //reworked : void

  async addSkill(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;
    try {
      const validatedId = userIdSchema.parse({ id: userId });
      const validateData = createUserSkillSchema.parse(req.body);
      const dto = mapToCreateSkillDTOFromRequest({
        userId: validatedId.id,
        ...validateData,
      });

      const result = await this._addUserSkillUC.execute(dto);
      res.status(StatusCodes.OK).json({ success: true, message: 'added', skill: result });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

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
  } //reworked : void

  async deleteSkill(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { skillId } = req.params;

    try {
      await this._deleteUserSkillUC.execute(skillId);
      res.status(StatusCodes.OK).json({ success: true, message: 'Skill removed' });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async addEducation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.id;

    try {
      const validateId = userIdSchema.parse({ id: userId });
      const validateData = addUserEducationSchema.parse(req.body);
      
      const dto = mapToCreateEducationDTOFromRequest({
        userId:validateId.id,
        ...validateData
      })

      const result = await this._addUserEducationUC.execute(dto);
      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({
          success:false, message:'Something went wrong'
        })
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Education added successfully',
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

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
  } //reworked : void

  async deleteEducation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { educationId } = req.params;
    try {
      await this._deleteUserEducationUC.execute(educationId);

      res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async editEducation(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const { educationId } = req.params;

    try {
      const validateId = educationIdSchema.parse({id:educationId})
      const validateData = addUserEducationSchema.parse(req.body);
      const dto = mapToUpdateEducationDTOFromRequest({
        id: validateId.id,
        ...validateData,
      });

      const result = await this._editUserEducationUC.execute(dto);

      if(!result){
        res.status(StatusCodes.BAD_REQUEST).json({
          success:false, message:'Something went wrong'
        })
      }
      res.status(StatusCodes.OK).json({ success: true, message: 'Education edited', result });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  // async addResume(req: Auth, res: Response, next: NextFunction): Promise<void> {
  //   const candidateId = req.user.id;
  //   //testing file
  //   console.log(
  //     'Request for uploading resume reached here, controller candididateController.ts'
  //   );
  //   try {
  //     if (req.file) {
  //       const resume = req.file.buffer;
  //       const result = await this._addResumeUC.execute({
  //         file: resume,
  //         path: req.file?.originalname,
  //         candidateId: candidateId,
  //       });
  //       res.status(StatusCodes.OK).json({
  //         success: true,
  //         message: 'Resume added successfully',
  //         resumeId: result?._id,
  //       });
  //       return;
  //     }
  //     console.log(
  //       'A problem occured while saving resume candidateController.ts'
  //     );
  //     res
  //       .status(StatusCodes.BAD_REQUEST)
  //       .json({ success: false, message: 'Can not add resume' });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async loadResume(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const userId = req.user.id;

  //   try {
  //     const candidate = await this._findCandidateByUserIdUC.execute(userId);
  //     const resumes = await this._loadResumeUC.execute(candidate?._id);
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Resumes fetched successfully',
  //       resumes,
  //     });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async deleteResume(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const { resumeId } = req.params;
  //   const cloudinaryPublicId = req.query?.cloudinaryPublicId as string;

  //   try {
  //     await this._deleteResumeUC.execute({ cloudinaryPublicId, resumeId });
  //     res.status(StatusCodes.OK).json({ success: true, message: 'Deleted' });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async addCertificate(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const userId = req.user.id;

  //   try {
  //     if (req.file) {
  //       const arrayBuffer = req.file.buffer;
  //       const filePathName = req.file.originalname.split('.')[0];
  //       const candidate = await this._findCandidateByUserIdUC.execute(userId);
  //       const dto = mapToCreateCertificateDTOFromRequest({
  //         candidateId: candidate?._id,
  //         file: arrayBuffer,
  //         path: filePathName,
  //         ...req.body,
  //       });
  //       const result = await this._addCertificate.execute(dto);
  //       res
  //         .status(StatusCodes.OK)
  //         .json({ success: true, message: 'Certificate added successfully' });
  //       return;
  //     }

  //     res
  //       .status(StatusCodes.BAD_REQUEST)
  //       .json({ success: false, message: 'Something went wrong' });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async getCertificates(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const userId = req.user.id;

  //   try {
  //     const candidate = await this._findCandidateByUserIdUC.execute(userId);
  //     const result = await this._getCertificates.execute(candidate?._id);
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Certificates fetched successfully',
  //       certificates: result,
  //     });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async saveJobApplication(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   //coverLetterContent, savedResumeId
  //   const candidateId = req.user.id;
  //   const { jobId } = req.params;
  //   const { coverLetterContent, resumeId } = req.body;

  //   try {
  //     const result = await this._saveJobApplicationUC.execute({
  //       candidateId,
  //       jobId,
  //       coverLetterContent,
  //       resumeId,
  //     });
  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'success', result });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

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

  // async editCandidateProfile(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const id = req.user.id;
  //   try {
  //     const candidate = await this._findCandidateByUserIdUC.execute(id);
  //     const dto = mapEditProfileRequestToUpdateDTO({
  //       id: candidate?._id,
  //       ...req.body,
  //     });
  //     const result = await this._editCandidateProfileUC.execute(dto);
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Profile details updated successfully',
  //       result,
  //     });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked void

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

  // async saveJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
  //   const candidateId = req.user.id;
  //   const { jobId } = req.params;
  //   try {
  //     const result = await this._saveJobUC.execute({ candidateId, jobId });
  //     res.status(StatusCodes.OK).json({ success: true, message: 'Job saved' });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async checkIsJobSaved(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const candidateId = req.user.id;
  //   const jobId = req.query.jobId as string;
  //   try {
  //     const result = await this._checkIsJobSavedUC.execute(jobId, candidateId);

  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'checked', isSaved: result });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async getFavoriteJobs(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const candidateId = req.user.id;
  //   try {
  //     const result = await this._getSavedJobsUC.execute(candidateId);
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Favorite jobs fetched sucessfully',
  //       jobs: result,
  //     });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async unsaveJob(req: Auth, res: Response, next: NextFunction): Promise<void> {
  //   const candidateId = req.user.id;
  //   const { jobId } = req.params;

  //   try {
  //     await this._unsaveJobUC.execute(jobId, candidateId);
  //     //  return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not unsave'})
  //     res.status(StatusCodes.OK).json({ success: true, message: 'Unsaved' });

  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // }

  // async addSocialLink(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const userId = req.user?.id;
  //   const urlObj = url.parse(req.body?.url);
  //   const domain = urlObj?.hostname as string;

  //   try {
  //     const candidate = await this._findCandidateByUserIdUC.execute(userId);
  //     const dto = mapToAddsocialLinkDTOFromRequest({
  //       candidateId: candidate?._id,
  //       domain,
  //       url: req.body?.url,
  //     });
  //     const result = await this._addSocialLinkUC.execute(dto);

  //     res
  //       .status(StatusCodes.OK)
  //       .json({ success: true, message: 'Social link added' });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  // async deleteSocialLink(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const userid = req.user?.id;
  //   const domain = req.body?.domain as string;

  //   try {
  //     const candidate = await this._findCandidateByUserIdUC.execute(userid);
  //     const result = await this._deleteSocialLinkUC.execute({
  //       candidateId: candidate?._id,
  //       domain,
  //     });
  //     res.status(StatusCodes.OK).json({ success: true, message: 'Removed' });
  //     return;
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

  async uploadProfilePicture(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const img = req.file?.buffer;
    const publicId = req.query?.publicId as string;

    try {
      const dto = mapToUploadProfilePictureDTOFromRequest({
        userId,
        imageFile: img,
        publicId,
      });
      const result = await this._uploadUserProfilePictureUC.execute(dto);

      res.status(StatusCodes.OK).json({ success: true, message: 'Profile photo updated' });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked :void

  async removeProfilePicture(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const cloudinaryPublicId = req.body.cloudinaryPublicId as string;

    try {
      await this._removeUserProfPictureUC.execute({
        userId,
        cloudinaryPublicId,
      });

      res.status(StatusCodes.OK).json({ success: true, message: 'Photo removed' });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async uploadCoverphoto(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const publicId = (req.query?.publicId as string) || '';
    const imgFile = req.file?.buffer;

    try {
      const dto = mapToUploadCoverPhotoDTOFromRequest({
        userId,
        publicId,
        imageFile: imgFile,
      });
      const result = await this._uploadUserCoverPhotoUC.execute(dto);
      res.status(StatusCodes.OK).json({ success: true, message: 'Cover photo updated' });
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

  async removeCoverphoto(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;
    const cloudinaryPublicId = req.query?.publicId as string;

    try {
      await this._removeUserCoverPhotoUC.execute({
        userId,
        cloudinaryPublicId,
      });
      res.status(StatusCodes.OK).json({ success: true, message: 'Cover photo removed' });
      return;
    } catch (error: unknown) {
      next(error);
    }
  } //reworked : void

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

  // async getCandidateApplications(
  //   req: Auth,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const candidateId = req.user?.id;
  //   try {
  //     const applications = await this._getCandidateApplicationsUC.execute(
  //       candidateId
  //     );
  //     //console.log('-------applications in the contorller', applications);
  //     res.status(StatusCodes.OK).json({
  //       success: true,
  //       message: 'Applications fetched successfully',
  //       applications,
  //     });
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // } //reworked : void

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
