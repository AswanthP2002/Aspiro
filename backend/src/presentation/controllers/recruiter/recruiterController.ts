import { Request, Response } from 'express'
import { Auth } from '../../../middlewares/auth'
import RegisterRecruiterUseCase from '../../../application/usecases/recruiter/registerRecruiter'
import { StatusCodes } from '../../statusCodes'
import VerifyRecruiterUseCase from '../../../application/usecases/recruiter/verifyRecruiter'
import { LoginRecruiterUseCase } from '../../../application/usecases/recruiter/loginRecruiter'
import SaveBasicsUseCase from '../../../application/usecases/recruiter/saveBasics'
import { LoadRecruiterProfileDataUseCase } from '../../../application/usecases/recruiter/loadProfile'
import CreateJobUseCase from '../../../application/usecases/createJob'
import IRegisterRecruiterUseCase from '../../../application/usecases/recruiter/interface/IRegisterRecruiterUseCase'
import ICreateJobUseCase from '../../../application/usecases/recruiter/interface/ICreateJobUseCase'
import IVerifyRecruiterUseCase from '../../../application/usecases/recruiter/interface/IVerifyRecruiterUseCase'
import ILoginRecruiterrUseCase from '../../../application/usecases/recruiter/interface/ILoginRecruiterUseCase'
import ISaveBasicsUseCase from '../../../application/usecases/recruiter/interface/ISaveBasicsUseCase'
import ILoadRecruiterProfileUseCase from '../../../application/usecases/recruiter/interface/ILoadRecruiterProfileUseCase'
import IRejectCandidate from '../../../application/usecases/recruiter/interface/IRejectCandidateUseCase'
import IRejectCandidateUseCase from '../../../application/usecases/recruiter/interface/IRejectCandidateUseCase'
import ICreateNotification from '../../../application/usecases/common/interface/ICreateNotificationUseCase'
import IFinalizeShortlist from '../../../application/usecases/recruiter/interface/IFinalizeShortlist'
import IGetFinalizedShortlistData from '../../../application/usecases/recruiter/interface/IGetFinalizedDataUseCase'
import IGetJobApplicationsUseCase from '../../../application/usecases/recruiter/interface/IGetJobApplicationsUseCase.ts'
import IGetJobApplicationDetailsUseCase from '../../../application/usecases/recruiter/interface/IGetJobApplicationDetailsUseCase'
import mapToCreateRecruiterDTOFromRequest from '../../mappers/recruiter/mapToCreateRecruiterDTOFromRequest'
import mapToVerifyRecruiterDTOFromRequest from '../../mappers/recruiter/mapToVerifyRecruiterDTOFromRequest'
import mapToLoginRecruiterDTOFromRequest from '../../mappers/recruiter/mapToLoginRecruiterDTOFromRequest'
import mapToSaveIntroDetailsDTOFromRequest from '../../mappers/recruiter/mapToSaveIntroDetailsDTOFromRequest'
import mapToCreateJobDTOFromRequest from '../../mappers/recruiter/mapToCreateJobDTOFromRequest'
import mapToCreateNotificationFromRejectRequest from '../../mappers/recruiter/mapToCreateNotificationFromRejectRequest'


export default class RecruiterController {
    constructor(
        private _registerRecruiterUC : IRegisterRecruiterUseCase, //usecase interface
        private _verifyRecruiterUC : IVerifyRecruiterUseCase, //usecase interface
        private _loginRecruiterUC : ILoginRecruiterrUseCase, //usecase interface
        private _saveBasicsUC : ISaveBasicsUseCase, //usecase interface
        private _loadCompanyProfileUseCase : ILoadRecruiterProfileUseCase, //usecase interface
        private _createJobUseCase : ICreateJobUseCase, //usecase interface
        private _getJobApplications : IGetJobApplicationsUseCase, //usecase interface
        private _rejectCandidateJobApplicationUseCase : IRejectCandidateUseCase,
        private _createNotificationUseCase : ICreateNotification,
        // private _saveShortlistUseCase : IFinalizeShortlist,
       // private _getFinalizedShortlistDataUC : IGetFinalizedShortlistData,
        private _getJobApplicationDetailsUC : IGetJobApplicationDetailsUseCase
    ){}

    async registerRecruiter(req : Request, res : Response) : Promise<Response> {
        try {
            const dto = mapToCreateRecruiterDTOFromRequest(req.body)
            const createRecruiter = await this._registerRecruiterUC.execute(dto)
            return res.status(StatusCodes.OK).json({success:true, message:'Recruiter created', recruiter:req.body.email})
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while registering recruiter', error)
                switch(error.message){
                    case 'DuplicateEmail' :
                        return res.status(StatusCodes.CONFLICT).json({success:false, message:'This email is already reigstered with another user please try new one'})
                    case 'DuplicateUserName' : 
                        return res.status(StatusCodes.CONFLICT).json({success:false, message:'Username already taken please choose new one'})
                    default :
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})   
                }
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    } //reworked

    async verifyRecruiter(req : Request, res : Response) : Promise<Response> {
        try {
            const dto = mapToVerifyRecruiterDTOFromRequest({...req.body})
            const isRecruiterVerified = await this._verifyRecruiterUC.execute(dto)
            return res.status(StatusCodes.OK).json({success:isRecruiterVerified, message:'Email verified successfully, please login to continue'})
        } catch (error : unknown) {
            console.log('Erro occured while verifying the recruiter', error)
            if(error instanceof Error){
                switch(error.message){
                    case 'Expired' :
                        return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:"OTP has been expired, please resend otp or try again after some time"})
                    case 'Wrong' :
                        return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:"Incorrect otp, please enter the correct otp"})
                    default :
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"Internal server error, please try again after some time"})
                }
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error'})
        }
    } //reworked

    async loginRecruiter(req : Request, res : Response) : Promise<Response> {
       try {
            const dto = mapToLoginRecruiterDTOFromRequest(req.body)
            const result : any = await this._loginRecruiterUC.execute(dto)
            const {refreshToken} = result
            return res.status(StatusCodes.OK)
                      .cookie('recruiterRefreshToken', refreshToken,{httpOnly:true, secure:false, sameSite:'lax', maxAge:24 * 60 * 60 * 1000})
                      .json({success:true, message:'Recruiter loged in successfully', result})
        } catch (error : unknown) {
            console.log('Error occured while recruiter login', error)
            if(error instanceof Error){
                switch(error.message){
                    case 'Not Found' :
                        return res.status(StatusCodes.NOT_FOUND).json({success:false, message:"User not found"})
                    case 'Wrong Password' :
                        return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:"Invalid password, please enter correct password"})
                    default :
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"Internal server error, please try again after some time"})
                }
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    } //reworked

    async recruiterLogout(req : Auth, res : Response) : Promise<Response> {
        try {
            res.clearCookie('recruiterRefreshToken', {
                httpOnly:true,
                secure:false,
                sameSite:'lax'
            })

            return res.status(StatusCodes.OK).json({success:true, message:'Logouted successfully'})
        } catch (error : unknown) {
            console.log('Error occured while recruiter logout', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong, please try again after some time'})
        }
    } //reworked

    async saveIntroDetailsRecruiter(req : Auth, res : Response) : Promise<Response> {
        const id = req.user?.id
        try {
            const dto = mapToSaveIntroDetailsDTOFromRequest({id, ...req.body?.details})
            const isSaved = await this._saveBasicsUC.execute(dto)
            return isSaved
                ? res.status(StatusCodes.OK).json({success:true, message:'Basic details saved'})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, messsage:'Something went wrong'})
        } catch (error : unknown) {
            console.log('Error occured while saving basics details', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error please try again after some time'})
        }
    } //reworked

    async loadRecruiterProfileData (req : Auth, res : Response) : Promise<Response> {
        const id = req.user.id
        try {
            const recruiterDetails = await this._loadCompanyProfileUseCase.execute(id)
            return res.status(StatusCodes.OK).json({success:true, message:'Recruiter details fetched successfully', recruiterDetails})
        } catch (error : unknown) {
            console.log('Error occured while geting recruiter profile data', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    } //reworked

    async createJob (req : Auth, res : Response) : Promise<Response> {
        const id = req.user.id
        try {
            const dto = mapToCreateJobDTOFromRequest({companyId:id, ...req.body})
            const createdJob = await this._createJobUseCase.execute(dto)
            return res.status(StatusCodes.OK).json({success:true, message:'job created', job:createdJob})
        } catch (error : unknown) {
            console.log('Error occured while creating the job', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    } //reworked

    async getJobApplications(req : Request, res : Response) : Promise<Response> {
        const jobId = req.params.jobId

        try {
            const result = await this._getJobApplications.execute(jobId)
            return res.status(StatusCodes.OK).json({success:true, message:'success', result})
        } catch (error : unknown) {
            console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'internal server error'})
        }
    }

    async rejectCandidateJobApplication(req : Auth, res : Response) : Promise<Response> {
        const {applicationId} = req.params
        const message = req.body.message as string
        const reason = req.body.reason as string
        const id = req.user.id
        //title : string, description : string, type, relatedid

        try {
            const rejectResult = await this._rejectCandidateJobApplicationUseCase.execute(applicationId)
            
            if(!rejectResult) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not reject request right now, please try again after some time'})
            const dto = mapToCreateNotificationFromRejectRequest({rejector:id, rejectee:req.body.candidateId, message:req.body.description, ...req.body})
            
            const createNotificationResult = await this._createNotificationUseCase.execute(dto)

            if(createNotificationResult){
                return res.status(StatusCodes.OK).json({success:true, message:'Application rejected successfully'})
            }
            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
            
        } catch (error : unknown) {
            console.log('error occured while rejecting the candidate application', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    // async finalizeShortlist(req : Auth, res : Response) : Promise<Response> {
    //     const {jobId} = req.params
    //     const applications = req.body.applications
    //     const recruiterId = req.user?.id

    //     try {
    //         const result = await this._saveShortlistUseCase.execute(jobId, recruiterId, applications)
    //         return res.status(StatusCodes.OK).json({success:true, message:'Shortlist finalized'})
    //     } catch (error : unknown) {
    //         console.log('Error occured while saving shortlist', error)
    //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
    //     }
    // }

    // async getFinalizedShortlistData(req : Auth, res : Response) : Promise<Response> {
    //     const {jobId} = req.params
    //     console.log('jobid before fetching', jobId)
    //     try {
    //         const result = await this._getFinalizedShortlistDataUC.execute(jobId)
    //         return res.status(StatusCodes.OK).json({success:true, message:'Data fetched successfully', result})
    //     } catch (error : unknown) {
    //         console.log('error occured while fetching finalized list', error)
    //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
    //     }
    // }

    async getJobApplicationDetails(req : Auth, res : Response) : Promise<Response> {
        const applicationId = req.params?.applicationId as string
        try {
        const result = await this._getJobApplicationDetailsUC.execute(applicationId)
            return result
                ? res.status(StatusCodes.OK).json({success:true, message:'Application details fetched successfully', result})
                : res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not fetch application details right now'})
        } catch (error : unknown) {
            console.log('Error occured while fetching application details', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }
    
}
