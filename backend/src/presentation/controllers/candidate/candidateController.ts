import { Request, Response } from "express"
import url from 'url'

import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import { Auth } from "../../../middlewares/auth"
import GetAuthUserUseCase from "../../../application/usecases/getPasspoartUser"
import { StatusCodes } from "../../statusCodes"
import IRegisterCandidateUseCase from "../../../application/usecases/candidate/interface/IRegisterCandidateUseCase"
import IAddCertificateUseCase from "../../../application/usecases/candidate/interface/IAddCertificateUseCase"
import IAddEducationUseCase from "../../../application/usecases/candidate/interface/IAddEducationUseCase"
import IAddExperience from "../../../application/usecases/candidate/interface/IAddExperienceUseCase"
import IAddResumeUseCase from "../../../application/usecases/candidate/interface/IAddResumeUseCase"
import IAddSkillsUseCase from "../../../application/usecases/candidate/interface/IAddSkillUseCase"
import ISaveJobApplicationUseCase from "../../../application/usecases/candidate/interface/ISaveJobApplicationUseCase"
import ILoadCertificateUseCase from "../../../application/usecases/candidate/interface/ILoadCertificatesUseCase"
import IDeleteExperienceUseCase from "../../../application/usecases/candidate/interface/IDeleteExperienceUseCase"
import IDeleteSkillsUseCase from "../../../application/usecases/candidate/interface/IDeleteSkillsUseCase"
import IDeleteEducationUseCase from "../../../application/usecases/candidate/interface/IDeleteEducationUseCase"
import IDeleteResumeUseCase from "../../../application/usecases/candidate/interface/IDeleteResumeUseCase"
import ILoadResumeUseCase from "../../../application/usecases/candidate/interface/ILoadResumesUseCase"
import ILoadExperiencesUseCase from "../../../application/usecases/candidate/interface/ILoadExperiencesUseCase"
import ILoadSkillsUseCase from "../../../application/usecases/candidate/interface/ILoadSkillsUseCase"
import ILoadEducationsUseCase from "../../../application/usecases/candidate/interface/ILoadEducationsUseCase"
import IVerifyUserUseCase from "../../../application/usecases/candidate/interface/IVerifyUserUseCase"
import ISaveIntroDetailsUseCase from "../../../application/usecases/candidate/interface/ISaveIntroDetailsUseCase"
import ILoginCandidateUseCase from "../../../application/usecases/candidate/interface/ILoginCandidateUseCase"
import ILoadCandidatePersonalDataUseCase from "../../../application/usecases/candidate/interface/ILoadCandidatePersonalDataUseCase"
import ILoadJobCandidateSideUseCase from "../../../application/usecases/candidate/interface/ILoadJobCandidateSideUseCase"
import ILoadJobDetailsCandidateSideUseCase from "../../../application/usecases/candidate/interface/ILoadJobDetailsCandidateSideUseCase"
import IEditExperienceUseCase from "../../../application/usecases/candidate/interface/IEditExperienceUseCase"
import IEditEducationUseCase from "../../../application/usecases/candidate/interface/IEditEducationUseCase"
import ISearchJobsFromHomeUseCase from "../../../application/usecases/candidate/interface/ISearchJobsFromHomeUseCase"
import IEditProfileUseCase from "../../../application/usecases/candidate/interface/IEditProfileUseCase"
import IGetNotificationsUseCase from "../../../application/usecases/candidate/interface/IGetNotificationsUseCase"
import ISaveFavoriteJobUseCase from "../../../application/usecases/candidate/interface/ISaveFavoriteJobsUseCase"
import ICheckIsJobSavedUseCase from "../../../application/usecases/candidate/interface/ICheckIsJobSavedUseCase"
import IGetFavoriteJobUseCase from "../../../application/usecases/candidate/interface/IGetFavoriteJobDetailsUseCase"
import IUnsaveJobUseCase from "../../../application/usecases/candidate/interface/IUnsaveJobUseCase"
import IAddSocialLinkUsecase from "../../../application/usecases/candidate/interface/IAddSocialLinkUseCase"
import IDeleteSocialLinkUseCase from "../../../application/usecases/candidate/interface/IDeleteSocialLink"
import IUploadProfilePictureUseCase from "../../../application/usecases/candidate/interface/IUploadProfilePictureUseCase"
import imgUploadToCloudinary from "../../../services/uploadToCloudinary"
import IRemoveProfilePictureUseCase from "../../../application/usecases/candidate/interface/IRemoveProfilePictureUseCase"
import IUploadCoverPhotoUseCase from "../../../application/usecases/candidate/interface/IUploadCoverPhotoUseCase"
import IGetCandidatesUseCase from "../../../application/usecases/interfaces/IGetCandidatesUseCase"
import IGetCandidateDetailsUseCase from "../../../application/usecases/interfaces/IGetCandiateDetailsUseCase"
import IGetCandidateApplicationsUseCase from "../../../application/usecases/candidate/interface/IGetCandidateApplicationsUseCase"
import mapToCreateCandidateDTO from "../../mappers/candidate/mapToCreateCandidateDTO"
import mapToVerifyUserDTO from "../../mappers/candidate/mapToVerifyUserRequestDTO"
import mapToLoginCandidateInpDTO from "../../mappers/candidate/mapToLoginCandidateInpDTO"
import mapToSaveIntroInpDTO from "../../mappers/candidate/mapToSaveIntroInpDto"
import MapToAddExperienceDTO from "../../mappers/candidate/mapToCreateExperienceDto"
import mapToCreateSkillDTOFromRequest from "../../mappers/candidate/mapToCreateSkillDTOFromRequest"
import mapToCreateEducationDTOFromRequest from "../../mappers/candidate/mapToCreateEducationDTOFromRequest"
import mapToUpdateEducationDTOFromRequest from "../../mappers/candidate/mapToUpdateEducationDTOFromRequest"
import mapToCreateCertificateDTOFromRequest from "../../mappers/candidate/mapToCreateCertificateDTOFromRequest"
import mapToEditCandidateDTOFromRequest from "../../mappers/candidate/mapToEditCandidateRequestDTOFromRequest"
import mapToUploadProfilePictureDTOFromRequest from "../../mappers/candidate/mapToUploadProfilePictureDTOFromRequest"
import mapToUploadCoverPhotoDTOFromRequest from "../../mappers/candidate/mapToUploadcoverphotoDTOFromRequest"
import IRemoveCoverphotoUseCase from "../../../application/usecases/candidate/interface/IRemoveCoverphotoUseCase"
import mapToFindCandidatesDTOFromRequest from "../../mappers/candidate/mapToFindCandidatesDTOFromRequest"
import mapToAddsocialLinkDTOFromRequest from "../../mappers/candidate/mapToAddSocialLinkDTOFromRequest"
import IUpdateNotificationReadStatus from "../../../application/usecases/candidate/interface/IUpdateNotificationReadStatus"

export class CandidateController {
    constructor(
        private _registerCandidateUC : IRegisterCandidateUseCase, //usecase interface
        private _verifyUserUC : IVerifyUserUseCase, //usecase interface
        private _loginCandidateUC : ILoginCandidateUseCase, //usecase interface
        private _saveDetailsUC : ISaveIntroDetailsUseCase, //usecase interface
        private _loadCandidatePersonalDataUC : ILoadCandidatePersonalDataUseCase, //usecase interface
        private _addExperienceUC : IAddExperience, //usecase interface
        private _getExperiencesUC : ILoadExperiencesUseCase, //usecase interface
        private _deleteExperienceUC : IDeleteExperienceUseCase, //usecase interface
        private _editExperienceUC : IEditExperienceUseCase, //usecase interface
        private _loadJobsUC : ILoadJobCandidateSideUseCase, //usecase interface
        private _loadJobDetailsUC : ILoadJobDetailsCandidateSideUseCase, //usecase interface
        private _addSkillsUC : IAddSkillsUseCase, //usecase interface
        private _getSkillsUC : ILoadSkillsUseCase, //usecase interface
        private _deleteSkillUC : IDeleteSkillsUseCase, //usecase interface
        private _addEducationUC : IAddEducationUseCase, //usecase interface
        private _getEducationsUC : ILoadEducationsUseCase, //usecase interface
        private _deleteEducationUC : IDeleteEducationUseCase, //usecase interface
        private _editEducationUC : IEditEducationUseCase, //usecase interface
        private _addResumeUC : IAddResumeUseCase, //usecase interface
        private _loadResumeUC : ILoadResumeUseCase, //usecase interface
        private _deleteResumeUC : IDeleteResumeUseCase, //usecase interface
        private _addCertificate : IAddCertificateUseCase, //usecase interface
        private _getCertificates : ILoadCertificateUseCase, //usecase interface
        private _saveJobApplicationUC : ISaveJobApplicationUseCase, //usecase interface
        private _searchJobFromHomeUC : ISearchJobsFromHomeUseCase, //usecase interface,
        private _editCandidateProfileUC : IEditProfileUseCase, //usecase interface
        private _getNotificationsUC : IGetNotificationsUseCase,
        private _saveJobUC : ISaveFavoriteJobUseCase,
        private _checkIsJobSavedUC : ICheckIsJobSavedUseCase,
        private _getSavedJobsUC : IGetFavoriteJobUseCase,
        private _unsaveJobUC : IUnsaveJobUseCase,
        private _addSocialLinkUC : IAddSocialLinkUsecase,
        private _deleteSocialLinkUC : IDeleteSocialLinkUseCase,
        private _uploadProfilePictureUC : IUploadProfilePictureUseCase,
        private _removeProfilePictureUC : IRemoveProfilePictureUseCase,
        private _uploadCoverphotoUC : IUploadCoverPhotoUseCase,
        private _removeCoverphotoUC : IRemoveCoverphotoUseCase,
        private _getCandidatesUC : IGetCandidatesUseCase,
        private _getCandidateDetailsUC : IGetCandidateDetailsUseCase,
        private _getCandidateApplicationsUC : IGetCandidateApplicationsUseCase,
        private _updateNotificationReadStatus : IUpdateNotificationReadStatus 
    ){}

    //register candidate
    async registerCandidate(req : Request, res : Response) : Promise<Response> {
        const {name, email, phone, password, username} = req.body
        try {
            //convert into dto
            const dto = mapToCreateCandidateDTO({name, email, phone, password})
            //pass dto to the useCase
            const createUser = await this._registerCandidateUC.execute(dto)
            return res.status(StatusCodes.OK)
                      .json({success:true, message:'Candidate created need to verify before continue', candidate:email})
        
        } catch (error : unknown) {
            console.log(`Error occured while registering the user ::candidateController.ts ${error}`)
            if(error instanceof Error){
                switch (error.message) {
                    case 'DuplicateEmail':
                        return res.status(StatusCodes.CONFLICT).json({
                            success:false, 
                            message:"This email id already registered with another user, please choose another one"
                        })
                    case 'DuplicateMobileNumber':
                        return res.status(StatusCodes.CONFLICT).json({
                            success:false, 
                            message:"Mobile number already taken, use another one"
                        })
                    default:
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            success:false, 
                            message:"Internal server error, please try again after some time"
                        })
                }
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'An unknown error occured, please try again'
            })
        
        }
    }//reworked

    async verifyUser(req : Request, res : Response) : Promise<Response> { //email verification for candidate
        try {
            const dto = mapToVerifyUserDTO(req.body)
            await this._verifyUserUC.execute(dto)
            return res.status(StatusCodes.OK).json({
                success:true, 
                message:"Email verifed successfully, please login to continue"
            })
        } catch (error : unknown) {
            console.log(`Error occured while verifying the user ${error}`)
            if(error instanceof Error){
                switch (error.message){
                    case 'Wrong' :
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            success:false, 
                            message:"Incorrect otp, please enter the correct otp"
                        })
                    case 'Expired' :
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            success:false, 
                            message:"OTP has been expired, please resend otp or try again after some time"
                        })
                    default :
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            success:false, 
                            message:"Internal server error, please try again after some time"
                        })
                }
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'An unknown error occured'
            })
        }
    }//reworked

    async loginCandidate(req : Request, res : Response) : Promise<Response> { //candidate  login
        try {
            const dto = mapToLoginCandidateInpDTO(req.body)
            const result = await this._loginCandidateUC.execute(dto)
            const {refreshToken} = result

            return res.status(StatusCodes.OK)
            .cookie('refreshToken', refreshToken, {httpOnly:true, secure:false, sameSite:'lax', maxAge:24 * 60 * 60 * 1000})
            .json({
                success:true,
                message:'Candidate login successfull',
                result
            })
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while user login', error.message)
                switch(error.message){
                    case 'Not Found' :
                        return res.status(StatusCodes.NOT_FOUND).json({
                            success:false, 
                            message:"User not found"
                        })
                    case 'Wrong Password' :
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            success:false, 
                            message:"Invalid password, please enter correct password"
                        })
                    case 'Blocked' :
                        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
                            success:false,
                            message:'Your account has been blocked by the admin'
                        })
                    default :
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            success:false, 
                            message:"Internal server error, please try again after some time"
                        })       
                }
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'An unknown error occured'
            })
        }
    }//reworked

    async saveIntroDetailsCandidate(req : Auth, res : Response) : Promise<Response> { //save 
        const id = req?.user?.id
        console.log(req.body)
        try {
            const dto = mapToSaveIntroInpDTO(id, req.body)
            const updatedCandidate = await this._saveDetailsUC.execute(dto)
            return res.status(StatusCodes.OK).json({
                success:true, 
                message:'Basic details saved, login to your profile to continue',
                updatedCandidate
            })
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while updating the user', error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success:false, 
                    message:'Intenal server error, please try again after some time'
                })
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'An unknown error occured'
            })
            
        }
    }//reworked

    async loadCandidatePersonalData(req : Auth, res : Response) : Promise<Response> {
        const id = req.user.id
        try {
            const userDetails = await this._loadCandidatePersonalDataUC.execute(id)

            return userDetails
                ? res.status(StatusCodes.OK).json({success:true, message:'User details fetched successfully', userDetails})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Details not found'})
        } catch (error : unknown) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'Internal server error, please re try again after some time'
            })
        }

    } //reworked

    async candidateLogout(req : Request, res : Response) : Promise<Response> {
        try {
            res.clearCookie('refreshToken', {
                httpOnly:true,
                secure:false,
                sameSite:'lax'
            })

            return res.status(StatusCodes.OK).json({success:true, message:'User logout successfull'})
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while logout', error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    } //reworked

    async addExperience(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        try {
            const dto = MapToAddExperienceDTO({candidateId, ...req.body})
            const addExperienceResult = await this._addExperienceUC.execute(dto)
            if(!addExperienceResult) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add experience'})
            
            return res.status(StatusCodes.OK).json({success:true, message:'Experience added successfully'})
        } catch (error : unknown) {
            console.log('Error occured while adding candidate experience', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }//reworked

    async deleteExperience(req : Auth, res : Response) : Promise<Response> {
        const {experienceId} = req.params

        try {
            await this._deleteExperienceUC.execute(experienceId)
            // if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not delete experience'})
            return res.status(StatusCodes.OK).json({success:true, message:'Experience deleted'})
        } catch (error : unknown) {
            console.log('Error occured while deleting experience', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }//reworked

    async getExperiences(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req?.user?.id
        try {
            const experience = await this._getExperiencesUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Experience details fetched successfully', experience})
        } catch (error : unknown) {
            console.log('Error occured while geting the candidate experience', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    } //reworked

    async editExperience(req : Auth, res : Response) : Promise<Response> {
        const {experienceId} = req.params

        try {
            const result = await this._editExperienceUC.execute(experienceId, req.body)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:"Can not edit experience"})

            return res.status(StatusCodes.OK).json({success:true, message:'Edited', result})
        } catch (error : unknown) {
            console.log('Error occured while editing the experience')
            
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async loadJobs(req : Request, res : Response) : Promise<Response> {
        const search = req.query.search as string || ""
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 3
        const sortvalue = req.query.sort as string || 'job-latest'
        const minSalary = req.query?.minSalary as string
        const maxSalary = req.query?.maxSalary as string
        //console.log('filter before parsing', req.query.filter)
        const filters = JSON.parse(req.query.filter as string) || {}
        //console.log('filter after parsing', filters)

        try {
            const result = await this._loadJobsUC.execute({search, page, limit, sort:sortvalue, minSalary, maxSalary, filters})
            return res.status(StatusCodes.OK).json({success:true, message:'Jobs fetched successfully', result})
        } catch (error : unknown) {
            console.log('Error occured while fetching the job details', error)
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Intenal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    } //reworked

    async loadJobDetails(req : Request, res : Response) : Promise<Response> {
        const {jobId} = req.params

        try {
            const jobDetails = await this._loadJobDetailsUC.execute(jobId)
            return res.status(StatusCodes.OK).json({success:true, message:'Job details fetched', jobDetails})
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while fetching the job details', error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    }

    async addSkill(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        try {
            const dto = mapToCreateSkillDTOFromRequest({candidateId, ...req.body})
            const result = await this._addSkillsUC.execute(dto)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add skill'})
            
            return res.status(StatusCodes.OK).json({success:true, message:'added'})
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('error occured while adding the experience', error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server erorr, please try again after some time'})
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, mesage:'An unknown error occured'})
        }
    } //reworked

    async getSkills(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        try {
            const skills = await this._getSkillsUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Skills fetched successfully', skills})
        } catch (error : unknown) {
            console.log('Error occured while geting the skills')
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error occured, please try again after some time'})
        }
    }//reworked

    async deleteSkill(req : Auth, res : Response) : Promise<Response> {
        const {skillId} = req.params

        try {
            await this._deleteSkillUC.execute(skillId)
            return res.status(StatusCodes.OK).json({success:true, message:'Skill removed'})
        } catch (error : unknown) {
            console.log('Error occured while deleting the skill', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }//reworked

    async addEducation(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const dto = mapToCreateEducationDTOFromRequest({candidateId, ...req.body})
            const saveEducationResult = await this._addEducationUC.execute(dto)
            return saveEducationResult
                ? res.status(StatusCodes.OK).json({success:saveEducationResult, message:'Education added successfully', saveEducationResult})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add education right now'})
        } catch (error : unknown) {
            console.log('Error occured while adding education', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    } //reworked

    async getEducations(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const result = await this._getEducationsUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Educations fetched successfully', educations:result})
        } catch (error : unknown) {
            console.log('Error occured while geting the educations', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async deleteEducation(req : Auth, res : Response) : Promise<Response> {
        const {educationId} = req.params
        try {
            await this._deleteEducationUC.execute(educationId)
            
            return res.status(StatusCodes.OK).json({success:true, message:'Deleted'})
        } catch (error : unknown) {
            console.log('Error occured while deleting the education', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async editEducation(req : Auth, res : Response) : Promise<Response> {
        const {educationId} = req.params
        console.log('educ id', educationId)
        try {
            const dto = mapToUpdateEducationDTOFromRequest({id:educationId, ...req.body})
            console.log('dto before sendign', dto)
            const result = await this._editEducationUC.execute(dto)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not edit education'})
            return res.status(StatusCodes.OK).json({success:true, message:'Education edited', result})
        } catch (error : unknown) {
            console.log('Error occured while editing the education details', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async addResume( req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        //testing file
        console.log('Request for uploading resume reached here, controller candididateController.ts')
        try {
            if(req.file){
                const resume = req.file.buffer
                const result = await this._addResumeUC.execute({file:resume, path:req.file?.originalname, candidateId:candidateId})
                if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add resume'})
                return res.status(StatusCodes.OK).json({success:true, message:'Resume added successfully', resumeId:result._id})
            }
            console.log('A problem occured while saving resume candidateController.ts')
            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add resume'})
        } catch (error : unknown) {
            console.log('Errro occured while adding the resume', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async loadResume(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const resumes = await this._loadResumeUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Resumes fetched successfully', resumes})
        } catch (error : unknown) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async deleteResume(req : Auth, res : Response) : Promise<Response> {
        const {resumeId} = req.params
        const cloudinaryPublicId = req.query?.cloudinaryPublicId as string

        try {
            await this._deleteResumeUC.execute(resumeId, cloudinaryPublicId)
            return res.status(StatusCodes.OK).json({success:true, message:'Deleted'})
        } catch (error : unknown) {
            console.log('Error occured while deleting the resume', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server'})
        }
    } //reworked

    async addCertificate(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            if(req.file){
                const arrayBuffer = req.file.buffer
                const filePathName = req.file.originalname.split('.')[0]
                const dto = mapToCreateCertificateDTOFromRequest({candidateId:candidateId, file:arrayBuffer, path:filePathName, ...req.body})
                const result = await this._addCertificate.execute(dto)
                return res.status(StatusCodes.OK).json({success:true, message:'Certificate added successfully'})
            }

            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
        } catch (error : unknown) {
            console.log('Error occured while adding the certificate', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async getCertificates(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const result = await this._getCertificates.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Certificates fetched successfully', certificates:result})
        } catch (error : unknown) {
            console.log('Error occured while geting certificates', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async saveJobApplication(req : Auth, res : Response) : Promise<Response> {
        //coverLetterContent, savedResumeId
        const candidateId = req.user.id
        const {jobId} = req.params
        const {coverLetterContent, resumeId} = req.body

        try {
            const result = await this._saveJobApplicationUC.execute({candidateId, jobId, coverLetterContent, resumeId})
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong, can not apply job right now'})
            
            return res.status(StatusCodes.OK).json({success:true, message:'success', result})
        } catch (error : unknown) {
            console.log('Error occured while applying the job', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async searchJobFromHomePage(req : Request, res : Response) : Promise<Response> {
        const search = req.query.search as string || ''
        //console.log('search query from the controller', search)

        try {
            const jobs = await this._searchJobFromHomeUC.execute(search)

            return res.status(StatusCodes.OK).json({success:true, message:'success', jobs})
        } catch (error : unknown) {
            console.log('Error occured while searching the jobs', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async editCandidateProfile(req : Auth, res : Response) : Promise<Response> {
        const id = req.user.id        
        try {
            const dto = mapToEditCandidateDTOFromRequest({id, ...req.body})
            const result = await this._editCandidateProfileUC.execute(dto)
            return result
                ? res.status(StatusCodes.OK).json({success:true, message:'Profile details updated successfully', result})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not edit profile now'})
        } catch (error : unknown) {
            console.log('Erro occured while editing candidate profile', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    }

    async getNotifications(req : Auth, res : Response) : Promise<Response> {
        const userId = req.user.id
        try {
            const notifications = await this._getNotificationsUC.execute(userId)
            return res.status(StatusCodes.OK).json({success:true, message:'Notifications fetched successfully', notifications})
        } catch (error : unknown) {
            console.log('Error occured while fetching candidate notifications', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({susccess:false, message:'Internal server error, please try again after some time'})
        }
    }

    async updateNotificationReadStatus(req : Auth, res : Response) : Promise<Response> {
        const {id} = req.params
        try {
            const result = await this._updateNotificationReadStatus.execute(id)
            return res.status(StatusCodes.OK).json({success:true, message:'Status updated to read'})
        } catch (error : unknown) {
            console.log('Errro occured while updating notification status', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal seerver error, pleaes try again after som etime'})
        }
    }

    async saveJob(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        const {jobId} = req.params
        try {
            const result = await this._saveJobUC.execute({candidateId, jobId})
            if(!result){
                console.log('result is empty')
                return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not save job right now, please try again after some time'})
            }
            return res.status(StatusCodes.OK).json({success:true, message:'Job saved'})

        } catch (error : unknown) {
            console.log('Error occured while saving the job', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async checkIsJobSaved(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        const jobId = req.query.jobId as string
        try {
            const result = await this._checkIsJobSavedUC.execute(jobId, candidateId)
            console.log(result)
            return res.status(StatusCodes.OK).json({success:true, message:'checked', isSaved:result})
        } catch (error : unknown) {
            console.log('Error occured while saving ', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async getFavoriteJobs(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        try {
            const result = await this._getSavedJobsUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Favorite jobs fetched sucessfully', jobs:result})
        } catch (error : unknown) {
            console.log('Error occured while geting favorite jobs', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async unsaveJob(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        const {jobId} = req.params
    
        try {
            await this._unsaveJobUC.execute(jobId, candidateId)
            //  return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not unsave'})
            return res.status(StatusCodes.OK).json({success:true, message:'Unsaved'})
        } catch (error : unknown) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, messgae:'Internal server error, please try again after some time'})
        }
    }

    async addSocialLink(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        const urlObj = url.parse(req.body?.url)
        const domain = urlObj?.hostname as string

        try {
            const dto = mapToAddsocialLinkDTOFromRequest({candidateId, domain, url:req.body?.url})
            const result = await this._addSocialLinkUC.execute(dto)

            return result
                ? res.status(StatusCodes.OK).json({success:true, message:'Social link added'})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add social link now, please try after some time'})
        
        } catch (error : unknown) {
            console.log('Error occured while adding social media link', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async deleteSocialLink(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        const domain = req.body?.domain as string

        try {
            const result = await this._deleteSocialLinkUC.execute({candidateId, domain})
            return res.status(StatusCodes.OK).json({success:true, message:'Removed'})
        } catch (error : unknown) {
            console.log('Error occured while removing social media link', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async uploadProfilePicture(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        const img = req.file?.buffer
        const publicId = req.query?.publicId as string
        try {
            const dto = mapToUploadProfilePictureDTOFromRequest({candidateId, imageFile:img, publicId})
            const result = await this._uploadProfilePictureUC.execute(dto)

            return result
                ? res.status(StatusCodes.OK).json({success:true, message:'Profile photo updated'})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not update profile picture now'})
        } catch (error : unknown) {
            console.log('Error occured while saving profile picture', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async removeProfilePicture(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        const cloudinaryPublicId = req.body.cloudinaryPublicId as string

        try {
            await this._removeProfilePictureUC.execute(candidateId, cloudinaryPublicId)

            return res.status(StatusCodes.OK).json({success:true, message:'Photo removed'})
        } catch (error : unknown) {
            console.log('Error occured while removing profile photo', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async uploadCoverphoto(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        const publicId = req.query?.publicId as string || ""
        const imgFile = req.file?.buffer

        try {
            const dto = mapToUploadCoverPhotoDTOFromRequest({candidateId, publicId, imageFile:imgFile})
            const result = await this._uploadCoverphotoUC.execute(dto)
            return result
                ? res.status(StatusCodes.OK).json({success:true, message:'Cover photo updated'})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not update cover photo'})
        } catch (error : unknown) {
            console.log('Error occured while updating cover photo', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async removeCoverphoto(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        const cloudinaryPublicId = req.query?.publicId as string

        try {
            await this._removeCoverphotoUC.execute(candidateId, cloudinaryPublicId)
            return res.status(StatusCodes.OK).json({success:true, message:'Cover photo removed'})
        } catch (error : unknown) {
            console.log('Error occured while removing cover photo', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    } //reworked

    async getCandidates(req : Request, res : Response) : Promise<Response> {
        console.log('Trying to inspect the request query params', req.query)
        const search = req.query?.search as string || ""
        const page = parseInt(req.query?.page as string) || 1
        const limit = parseInt(req.query?.limit as string) || 4
        const sort = req.query?.sort as string || ""
        const filter = JSON.parse(req.query?.filter as string) || {}

        try {
            const dto = mapToFindCandidatesDTOFromRequest({search, page, limit, sort, filter})
            const result = await this._getCandidatesUC.execute(dto)
            return result
                ? res.status(StatusCodes.OK).json({success:true, message:'Candidate list fetched successfully', result})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
        } catch (error : unknown) {
            console.log('Error occured while geting candidate list', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked
    
    async getCandidateDetails(req : Request, res : Response) : Promise<Response> {
        const candidateId = req.params?.candidateId as string
        try {
            const result = await this._getCandidateDetailsUC.execute(candidateId)

            return result
                ? res.status(StatusCodes.OK).json({success:true, message:'Candidate details fetched successfully', candidateDetails:result})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong can not fetch details'})
        } catch (error : unknown) {
            console.log('Error occured while geting candidate details', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworkedjobsaved

    async getCandidateApplications(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        try {
            const applications = await this._getCandidateApplicationsUC.execute(candidateId)
            console.log('-------applications in the contorller', applications)
            return res.status(StatusCodes.OK).json({success:true, message:'Applications fetched successfully', applications})
        } catch (error : unknown) {
            console.log('Error occured while geting candidate applications', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    
    

    
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


