import { Request, Response } from 'express'
import { Auth } from '../../../middlewares/auth'
import RegisterRecruiterUseCase from '../../../application/usecases/recruiter/registerRecruiter'
import { StatusCodes } from '../../statusCodes'
import VerifyRecruiterUseCase from '../../../application/usecases/recruiter/verifyRecruiter'
import { LoginRecruiterUseCase } from '../../../application/usecases/recruiter/loginRecruiter'
import SaveBasicsUseCase from '../../../application/usecases/recruiter/saveBasics'
import { LoadRecruiterProfileDataUseCase } from '../../../application/usecases/recruiter/loadProfile'
import CreateJobUseCase from '../../../application/usecases/createJob'
import GetJobApplicationDetailsUseCase from '../../../application/usecases/recruiter/getApplicationDetailsUseCase'


export default class RecruiterController {
    constructor(
        private _registerRecruiterUC : RegisterRecruiterUseCase,
        private _verifyRecruiterUC : VerifyRecruiterUseCase,
        private _loginRecruiterUC : LoginRecruiterUseCase,
        private _saveBasicsUC : SaveBasicsUseCase,
        private _loadCompanyProfileUseCase : LoadRecruiterProfileDataUseCase,
        private _createJobUseCase : CreateJobUseCase,
        private _getJobApplicationDetails : GetJobApplicationDetailsUseCase
    ){}

    async registerRecruiter(req : Request, res : Response) : Promise<Response> {
        try {
            const createRecruiter = await this._registerRecruiterUC.execute(req.body)
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
    }

    async verifyRecruiter(req : Request, res : Response) : Promise<Response> {
        const {otp, email} = req.body

        try {
            const isRecruiterVerified = await this._verifyRecruiterUC.execute(email, otp)
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
    }

    async loginRecruiter(req : Request, res : Response) : Promise<Response> {
        const {email, password} = req.body

        try {
            const result : any = await this._loginRecruiterUC.execute(email, password)
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
    }

    async saveIntroDetailsRecruiter(req : Auth, res : Response) : Promise<Response> {
        const id = req.user?.id
        const {companyName, about, benefits, companyType, industryType, teamStrength, 
            yearOfEstablishment, website, vision, country, state, city, mobile} = req?.body?.details
        
        const {logourl, coverphotourl} = req.body

        try {
            const isSaved = await this._saveBasicsUC.execute(id, companyName, about, benefits, companyType, industryType, teamStrength, yearOfEstablishment, website, vision, country, state, city, mobile, logourl, coverphotourl)
            return res.status(StatusCodes.OK).json({success:true, message:'Basic details saved'})
        } catch (error : unknown) {
            console.log('Error occured while saving basics details', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error please try again after some time'})
        }
    }

    async loadRecruiterProfileData (req : Auth, res : Response) : Promise<Response> {
        const id = req.user.id
        try {
            const recruiterDetails = await this._loadCompanyProfileUseCase.execute(id)
            return res.status(StatusCodes.OK).json({success:true, message:'Recruiter details fetched successfully', recruiterDetails})
        } catch (error : unknown) {
            console.log('Error occured while geting recruiter profile data', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async createJob (req : Auth, res : Response) : Promise<Response> {
        const id = req.user.id
        try {
            const createdJob = await this._createJobUseCase.execute(id, req.body)

            return res.status(StatusCodes.OK).json({success:true, message:'job created', job:createdJob})
        } catch (error : unknown) {
            console.log('Error occured while creating the job', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    }

    async getJobApplicationDetails(req : Request, res : Response) : Promise<Response> {
        const jobId = req.params.jobId

        try {
            const result = await this._getJobApplicationDetails.execute(jobId)
            return res.status(StatusCodes.OK).json({success:true, message:'success', result})

        } catch (error : unknown) {
            console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'internal server error'})
        }
    }
}
