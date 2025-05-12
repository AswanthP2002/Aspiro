import { Request, Response } from "express"
import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import RegisterCandidate from "../../../application/usecases/candidate/registerCandidate"
import { RegisterCandidateSchema } from "../dtos/candidate/registerCandidateDTOs"
import { createCandidatefromDTO } from "../../../domain/mappers/candidate/candidateMapper"
import VerifyUser from "../../../application/usecases/candidate/verifyUser"
import { LoginCandidate } from "../../../application/usecases/candidate/loginCandidate"
import SaveBasics from "../../../application/usecases/candidate/saveBasiscs"
import { Auth } from "../../../middlewares/auth"
import { LoadPersonalData } from "../../../application/usecases/candidate/loadPersonalDatas"
import GetAuthUserUseCase from "../../../application/usecases/getPasspoartUser"
import EditProfileUseCase from "../../../application/usecases/candidate/editProfile"


export const registerCandidate = async (req : Request , res : Response) : Promise<Response> => {
    try {
        console.log('Incoming user data', req.body)
        const validateCandidate = RegisterCandidateSchema.parse(req.body)
        const candidateModel = createCandidatefromDTO(validateCandidate)
        const cRepo = new CandidateRepository()
        const cRegUsecase = new RegisterCandidate(cRepo)
        const createUser = await cRegUsecase.execute(candidateModel)

        console.log('registered candidate is here!', createUser)

        return res.status(201).json({success:true, message:"Candidate created - need to verify before continue", candidate:req.body.email})
    } catch (error : any) {
        console.log('Error occured while registering the user', error)
        if(error.message === "duplicate email"){
            return res.status(409).json({success:false, message:"This email id already registered with another user, please choose another one"})
        }else if(error.message === "duplicate username"){
            return res.status(409).json({success:false, message:"Username already taken, choose new one"})
        }

        return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
        
    }
}

export const verifyUser = async (req : Request, res : Response) : Promise<Response> =>{
    try {
        console.log('Incoming request from the user', req.body)
        const {otp, email} = req.body
        
        const cRepo = new CandidateRepository()
        const cVerifyUseCase = new VerifyUser(cRepo)
        const isUserVerified = await cVerifyUseCase.execute(email, otp)

        return res.status(201).json({success:isUserVerified, message:"Email verifed successfully, please login to continue"})
    } catch (error : any) {
        console.log("Error occured while verfiying the user email", error)
        if(error.message === "Expired"){
            return res.status(400).json({success:false, message:"OTP has been expired, please resend otp or try again after some time"})
        }else if(error.message === "Wrong") {
            return res.status(400).json({success:false, message:"Incorrect otp, please enter the correct otp"})
        }else {
            return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
        }
    }
}

export const loginUser = async (req : Request, res : Response) : Promise<Response> => {
    try {
        console.log('Incoming request', req.body)
        const {email, password} = req.body

        const cRepo = new CandidateRepository()
        const cLoginUsecase = new LoginCandidate(cRepo)
        const result = await cLoginUsecase.execute(email, password)
        console.log('candidate controller.ts ::: token before sending', result)
        return res.status(201).json({success:true, message:"User logined successfully", result})
    } catch (error : any) {
        console.log('Error occured while user login', error.message)
        if(error.message === "Not Found"){
            return res.status(404).json({success:false, message:"User not found"})
        }else if(error.message === "Wrong Password"){
            return res.status(400).json({success:false, message:"Invalid password, please enter correct password"})
        }else{
            return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
        }
    }
}

export const saveIntroDetailsUser = async (req : Auth, res : Response) : Promise<Response> => {
    try {
        console.log('Incoming request', req.body)
        const id = req?.user?.id
        const {city, jobRole, summary, district, country, state, pincode} = req.body
        const cRepo = new CandidateRepository()
        const SaveBasicuseCase = new SaveBasics(cRepo)
        const isSaved = await SaveBasicuseCase.execute(id, jobRole, city, district, state, country, pincode, summary)
        return res.status(201).json({success:true, message:'Basic details saved, login to your profile to continue'})
    } catch (error) {
        console.log('Error occured while updating the user', error)
        return res.status(500).json({success:false, message:'Intenal server error, please try again after some time'})
    }
}

export const loadCandidatePersonalData = async (req : Auth, res : Response) : Promise<Response> => {
    try {
        const id = req.user.id
        console.log('incoming req from auth ', req.user)
        console.log('incoming id from auth', id)
        const cRepo = new CandidateRepository()
        const loadDetailsUsecase = new LoadPersonalData(cRepo)
        const userDetails = await loadDetailsUsecase.execute(id)
        console.log('fetched user deails ', userDetails)
        return res.status(201).json({success:true, message:"User details fetched successfully", userDetails})
    } catch (error) {
        console.log('Error occured while fetching the user details', error)
        return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
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
