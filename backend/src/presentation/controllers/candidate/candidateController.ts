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
import LoadJobsCandidateSideUseCase from "../../../application/usecases/candidate/loadJobLists"
import LoadJobDetailsCandidateSide from "../../../application/usecases/candidate/loadJobDetails"
import AddSkill from "../../../application/usecases/candidate/addSkill"
import GetSkillsUseCase from "../../../application/usecases/candidate/getSkills"
import DeleteSkillUseCase from "../../../application/usecases/candidate/deleteSkill"
import AddEducationUseCase from "../../../application/usecases/candidate/addEducation"
import GetEducationsUseCase from "../../../application/usecases/candidate/getEducationsUseCase"
import DeleteEducationUseCase from "../../../application/usecases/candidate/deleteEducationUseCase"
import EditEducationUseCase from "../../../application/usecases/candidate/editEducationUseCase"
import AddResumeUseCase from "../../../application/usecases/candidate/addResumeUseCase"
import LoadResumesUseCase from "../../../application/usecases/candidate/loadResumesUseCase"
import DeleteResumeUseCase from "../../../application/usecases/candidate/deleteResumeUseCase"
import AddCertificateUseCase from "../../../application/usecases/candidate/addCertificateUseCase"
import GetCertificatesUseCase from "../../../application/usecases/candidate/getCertificatesUseCase"
import SaveJobApplicationUseCase from "../../../application/usecases/saveJobApplicationUseCase"
import SearchJobsFromHomeUseCase from "../../../application/usecases/searchJobsFromHomeUseCase"

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
        private _editExperienceUC : EditExperienceUseCase,
        private _loadJobsUC : LoadJobsCandidateSideUseCase,
        private _loadJobDetailsUC : LoadJobDetailsCandidateSide,
        private _addSkillsUC : AddSkill,
        private _getSkillsUC : GetSkillsUseCase,
        private _deleteSkillUC : DeleteSkillUseCase,
        private _addEducationUC : AddEducationUseCase,
        private _getEducationsUC : GetEducationsUseCase,
        private _deleteEducationUC : DeleteEducationUseCase,
        private _editEducationUC : EditEducationUseCase,
        private _addResumeUC : AddResumeUseCase,
        private _loadResumeUC : LoadResumesUseCase,
        private _deleteResumeUC : DeleteResumeUseCase,
        private _addCertificate : AddCertificateUseCase,
        private _getCertificates : GetCertificatesUseCase,
        private _saveJobApplicationUC : SaveJobApplicationUseCase,
        private _searchJobFromHomeUC : SearchJobsFromHomeUseCase
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

    async loadJobs(req : Request, res : Response) : Promise<Response> {
        const search = req.query.search as string || ""
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 3
        const sortvalue = req.query.sort as string || 'job-latest'
        console.log('filter before parsing', req.query.filter)
        const filters = JSON.parse(req.query.filter as string) || {}
        console.log('filter after parsing', filters)

        try {
            const result = await this._loadJobsUC.execute(search, page, limit, sortvalue, filters)
            return res.status(StatusCodes.OK).json({success:true, message:'Jobs fetched successfully', result})
        } catch (error : unknown) {
            console.log('Error occured while fetching the job details', error)
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Intenal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    }

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
            const result = await this._addSkillsUC.execute(candidateId, req.body)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add skill'})
            
            return res.status(StatusCodes.OK).json({success:true, message:'added'})
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('error occured while adding the experience', error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server erorr, please try again after some time'})
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, mesage:'An unknown error occured'})
        }
    }

    async getSkills(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        console.log('Candidate id for geting skills', candidateId)
        try {
            const skills = await this._getSkillsUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Skills fetched successfully', skills})
        } catch (error : unknown) {
            console.log('Error occured while geting the skills')
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error occured, please try again after some time'})
        }
    }

    async deleteSkill(req : Auth, res : Response) : Promise<Response> {
        const {skillId} = req.params

        try {
            const deleteResult = await this._deleteSkillUC.execute(skillId)
            if(!deleteResult) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not delete skill'})
            return res.status(StatusCodes.OK).json({success:true, message:'Skill removed'})
        } catch (error : unknown) {
            console.log('Error occured while deleting the skill', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async addEducation(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const saveEducationResult = await this._addEducationUC.execute(req.body, candidateId)
            return res.status(StatusCodes.OK).json({success:saveEducationResult, message:'Education added successfully'})
        } catch (error : unknown) {
            console.log('Error occured while adding education', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }

    }

    async getEducations(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const result = await this._getEducationsUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Educations fetched successfully', educations:result})
        } catch (error : unknown) {
            console.log('Error occured while geting the educations', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async deleteEducation(req : Auth, res : Response) : Promise<Response> {
        const {educationId} = req.params
        try {
            const deleteResult = await this._deleteEducationUC.execute(educationId)
            if(!deleteResult) return res.status(StatusCodes.BAD_REQUEST).json({success:deleteResult, message:'Can not delete education'})
            
            return res.status(StatusCodes.OK).json({success:deleteResult, message:'Deleted'})
        } catch (error : unknown) {
            console.log('Error occured while deleting the education', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async editEducation(req : Auth, res : Response) : Promise<Response> {
        const {educationId} = req.params

        try {
            const result = await this._editEducationUC.execute(educationId, req.body)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not edit education'})
            return res.status(StatusCodes.OK).json({success:true, message:'Education edited'})
        } catch (error : unknown) {
            console.log('Error occured while editing the education details', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async addResume( req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        //testing file
        try {
            if(req.file){
                const resume = req.file.buffer
                const result = await this._addResumeUC.execute(resume, req.file.originalname, candidateId)
                if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add resume'})
                return res.status(StatusCodes.OK).json({success:true, message:'Resume added successfully'})
            }
            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Can not add resume'})
        } catch (error : unknown) {
            console.log('Errro occured while adding the resume', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async loadResume(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const resumes = await this._loadResumeUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Resumes fetched successfully', resumes})
        } catch (error : unknown) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async deleteResume(req : Auth, res : Response) : Promise<Response> {
        const {resumeId} = req.params
        const {cloudinaryPublicId} = req.body

        try {
            const deleteResult = await this._deleteResumeUC.execute(resumeId, cloudinaryPublicId)
            return res.status(StatusCodes.OK).json({success:true, message:'Deleted'})
        } catch (error : unknown) {
            console.log('Error occured while deleting the resume', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server'})
        }
    }

    async addCertificate(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            if(req.file){
                const arrayBuffer = req.file.buffer
                const filePathName = req.file.originalname.split('.')[0]
                const {issuedOrganization, issuedDate, id} = req.body

                const result = await this._addCertificate.execute(
                    {issuedOrganization:issuedOrganization, issuedDate:new Date(issuedDate), certificateId:id}, 
                    arrayBuffer, 
                    filePathName, 
                    candidateId
                )
                return res.status(StatusCodes.OK).json({success:true, message:'Certificate added successfully'})
            }

            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
        } catch (error : unknown) {
            console.log('Error occured while adding the certificate', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async getCertificates(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id

        try {
            const result = await this._getCertificates.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Certificates fetched successfully', certificates:result})
        } catch (error : unknown) {
            console.log('Error occured while geting certificates', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async saveJobApplication(req : Auth, res : Response) : Promise<Response> {
        const candidateId = req.user.id
        const {jobId} = req.params

        try {
            const result = await this._saveJobApplicationUC.execute({coverLetterContent:req.body.coverLetterContent}, jobId, candidateId)
            if(!result) return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong, can not apply job right now'})
            
            return res.status(StatusCodes.OK).json({success:true, message:'success'})
        } catch (error : unknown) {
            console.log('Error occured while applying the job', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
        }
    }

    async searchJobFromHomePage(req : Request, res : Response) : Promise<Response> {
        const search = req.query.search as string || ''
        console.log('search query from the controller', search)

        try {
            const jobs = await this._searchJobFromHomeUC.execute(search)

            return res.status(StatusCodes.OK).json({success:true, message:'success', jobs})
        } catch (error : unknown) {
            console.log('Error occured while searching the jobs', error)
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


