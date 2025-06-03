import { Request, Response } from "express"
import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import RegisterCandidateUseCase from "../../../application/usecases/candidate/registerCandidate"
import { RegisterCandidateSchema } from "../dtos/candidate/registerCandidateDTOs"
import { createCandidatefromDTO } from "../../../domain/mappers/candidate/candidateMapper"
import VerifyUser from "../../../application/usecases/candidate/verifyUser"
import { LoginCandidateUseCase } from "../../../application/usecases/candidate/loginCandidate"
import SaveBasics from "../../../application/usecases/candidate/saveBasiscs"
import { Auth } from "../../../middlewares/auth"
import { LoadCandidatePersonalDataUC} from "../../../application/usecases/candidate/loadPersonalDatas"
import GetAuthUserUseCase from "../../../application/usecases/getPasspoartUser"
import EditProfileUseCase from "../../../application/usecases/candidate/editProfile"
import { StatusCodes } from "../../statusCodes"
import VerifyUserUseCase from "../../../application/usecases/candidate/verifyUser"
import SaveIntroDetailsUseCase from "../../../application/usecases/candidate/saveBasiscs"
import CandidateLoginResult from "../dtos/candidate/loginResultDTO"
import AddExperienceUseCase from "../../../application/usecases/candidate/addExperience"
import getExperienceUseCase from "../../../application/usecases/candidate/getExperienceUseCase"
import deleteExperience from "../../../application/usecases/candidate/deleteExperienceUseCase"
import DeleteExperienceUseCase from "../../../application/usecases/candidate/deleteExperienceUseCase"
import EditExperienceUseCase from "../../../application/usecases/candidate/editExperienceUseCase"

export class CandidateController {
    constructor(
        private _registerCandidateUC : RegisterCandidateUseCase,
        private _verifyUserUC : VerifyUserUseCase,
        private _loginCandidateUC : LoginCandidateUseCase,
        private _saveDetailsUC : SaveIntroDetailsUseCase,
        private _loadCandidatePersonalDataUC : LoadCandidatePersonalDataUC,
        private _addExperienceUC : AddExperienceUseCase,
        private _getExperiencesUC : getExperienceUseCase,
        private _deleteExperienceUC : DeleteExperienceUseCase,
        private _editExperienceUC : EditExperienceUseCase
    ){}

    //register candidate
    async registerCandidate(req : Request, res : Response) : Promise<Response> { //create account
        console.log('Account registering request reached here', req.body)
        const {name, email, phone, password, username} = req.body
        try {
            console.log('testing regCandidate usecase ', this._registerCandidateUC)
            const createUser = await this._registerCandidateUC.execute({name, email, phone, password, username})
            console.log(`Registered Candidate is here ${createUser}`)
            return res.status(StatusCodes.OK).json({success:true, message:'Candidate created need to verify before continue', candidate:email})
        
        } catch (error : unknown) {
            console.log(`Error occured while registering the user ::candidateController.ts ${error}`)
            if(error instanceof Error){
                switch (error.message) {
                    case 'duplicate email':
                        return res.status(StatusCodes.CONFLICT).json({
                            success:false, 
                            message:"This email id already registered with another user, please choose another one"
                        })
                    case 'duplicate username':
                        return res.status(StatusCodes.CONFLICT).json({
                            success:false, 
                            message:"Username already taken, choose new one"
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
    }

    async verifyUser(req : Request, res : Response) : Promise<Response> { //email verification for candidate
        const {otp, email} = req.body
        try {
            const isVerified = await this._verifyUserUC.execute(email, otp)

            return res.status(StatusCodes.OK).json({
                success:isVerified, 
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
    }

    async loginCandidate(req : Request, res : Response) : Promise<Response> { //candidate  login
        const {email, password} = req.body
        try {
            const result : any = await this._loginCandidateUC.execute(email, password)
            const {refreshToken} = result

            console.log('Refresh token before sending to the frontend :: candidateController.ts', refreshToken)

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
    }

    async saveIntroDetailsCandidate(req : Auth, res : Response) : Promise<Response> { //save 
        const id = req?.user?.id
        const {city, jobRole, summary, district, country, state, pincode} = req.body
        try {
            const isSaved = await this._saveDetailsUC.execute({id, city, role:jobRole, summary, district, country, state, pincode})

            return res.status(StatusCodes.OK).json({
                success:true, 
                message:'Basic details saved, login to your profile to continue'
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
    }

    async loadCandidatePersonalData(req : Auth, res : Response) : Promise<Response> {
        const id = req.user.id
        try {
            const userDetails = await this._loadCandidatePersonalDataUC.execute(id)

            return res.status(StatusCodes.OK).json({
                success:true, 
                message:'User details fetched successfully',
                userDetails
            })
        } catch (error : unknown) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'Internal server error, please re try again after some time'
            })
        }

    }

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
    }

    async addExperience(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user?.id
        try {
            const addExperienceResult = await this._addExperienceUC.execute(req.body, candidateId)
            if(!addExperienceResult) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add experience'})
            
            return res.status(StatusCodes.OK).json({success:true, message:'Experience added successfully'})
        } catch (error : unknown) {
            console.log('Error occured while adding candidate experience', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async deleteExperience(req : Auth, res : Response) : Promise<Response> {
        const {experienceId} = req.params

        try {
            const result = await this._deleteExperienceUC.execute(experienceId)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not delete experience'})

            return res.status(StatusCodes.OK).json({success:true, message:'Experience deleted'})
        } catch (error : unknown) {
            console.log('Error occured while deleting experience', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async getExperiences(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req?.user?.id
        try {
            const experience = await this._getExperiencesUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Experience details fetched successfully', experience})
        } catch (error : unknown) {
            console.log('Error occured while geting the candidate experience', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    }

    async editExperience(req : Auth, res : Response) : Promise<Response> {
        const {experienceId} = req.params

        try {
            const result = await this._editExperienceUC.execute(experienceId, req.body)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:"Can not edit experience"})

            return res.status(StatusCodes.OK).json({success:true})
        } catch (error : unknown) {
            console.log('Error occured while editing the experience')
            
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }
}


export const getAuthUserData = async (req : Request, res : Response) : Promise<Response> => {
    try {
        const {id} = req.params
        const cRepo = new CandidateRepository()
        const getAuthUseCase = new GetAuthUserUseCase(cRepo)
        const data = await getAuthUseCase.execute(id)
        return res.status(200).json({success:true, message:'user details fetched successfully', user:data})
    } catch (error) {
        console.log('error occured while geting google auth user data', error)
        return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
    }
}


export const editCandidateProfile = async (req : Auth, res : Response) : Promise<Response> => {
    console.log('Candidate edit request reached here', req.body)
    try {
        const id = req.user?.id
        const {name, role, city, district, state, country} = req.body
        const cRepo = new CandidateRepository()
        const editProfileUseCase = new EditProfileUseCase(cRepo)
        const result = await editProfileUseCase.execute(id, name, role, city, district, state, country)
        return res.status(200).json({success:true, message:'Profile details updated successfully', data:result})
    } catch (error) {
        console.log('Error occured while updating the candidate profile', error)
        return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
    }
}


