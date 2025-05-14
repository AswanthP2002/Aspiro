import express from 'express'
import { Request, Response } from 'express'
import RegisterRecruiter from '../../../application/usecases/recruiter/registerRecruiter'
import { RegisterRecruiterSchema } from '../dtos/recruiter/registerRecruiterDTO'
import { createRecruiterFromDTO } from '../../../domain/mappers/recruiter/recruiterMapper'
import RecruiterRespository from '../../../infrastructure/repositories/recruiter/recruiterRepository'
import VerifyRecruiter from '../../../application/usecases/recruiter/verifyRecruiter'
import CandidateRepository from '../../../infrastructure/repositories/candidate/candidateRepository'
import { LoginRecruiter } from '../../../application/usecases/recruiter/loginRecruiter'
import { Auth } from '../../../middlewares/auth'
import SaveBasics from '../../../application/usecases/recruiter/saveBasics'
import { LoadProfileData } from '../../../application/usecases/recruiter/loadProfile'
import JobRepository from '../../../infrastructure/repositories/jobRepository'
import { CreateJobSchema } from '../dtos/jobDTO'
import { createJobFromDTO } from '../../../domain/mappers/jobMapper'
import CreateJob from '../../../application/usecases/createJob'
import { LoadCompanyPostedJobs } from '../../../application/usecases/recruiter/loadJobs'

export const registerRecruiter = async (req : Request, res : Response) : Promise<Response> => {
    try {
        const validateRecruiter = RegisterRecruiterSchema.parse(req.body)
        const recruiterModel = createRecruiterFromDTO(validateRecruiter)
        const rRepo = new RecruiterRespository()
        const cRepo = new CandidateRepository()
        const rRegUsecase = new RegisterRecruiter(rRepo, cRepo)
        const createREcruiter = await rRegUsecase.execute(recruiterModel)

        console.log('Registered recruiter is here', createREcruiter)
        return res.status(201).json({success:true, message:'recruiter created - proceed to email verification', recruiter:req.body.email})
    } catch (error : any) {
        console.log('error occured while registering the recruiter', error)
        if(error.message === 'duplicate email'){
            return res.status(409).json({success:false, message:'This email is already reigstered with another user please try new one'})
        }else if(error.message === 'duplicate username'){
            return res.status(409).json({success:false, message:'Username already taken please choose new one'})
        }
        return res.status(500).json({success:false, message:'Internal server error, please try again after some time'})
    }

}

export const verifyRecruiter = async (req : Request, res : Response) : Promise<Response> => {
    try {
        console.log('recruiter verification request reached :: recruitercontroller.ts')
        const {otp, email} = req.body

        const rRepo = new RecruiterRespository()
        const cVerifyRecruiterUC = new VerifyRecruiter(rRepo)
        const isRecruiterVerified = await cVerifyRecruiterUC.execute(email, otp)

        return res.status(201).json({success:isRecruiterVerified, message:'Email verified successfully, please login to continue'})

    } catch (error : any) {
        console.log('Error occured while verifying the user email', error)
        if(error.message === "Expired"){
            return res.status(400).json({success:false, message:"OTP has been expired, please resend otp or try again after some time"})
        }else if(error.message === "Wrong") {
            return res.status(400).json({success:false, message:"Incorrect otp, please enter the correct otp"})
        }else {
            return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
        }
    }
}

export const loginRecruiter = async (req : Request, res : Response) : Promise<Response> => {
    try {
        const {email, password} = req.body

        const rRepo = new RecruiterRespository()
        const rLoginUC = new LoginRecruiter(rRepo)
        const result = await rLoginUC.execute(email, password)
        return res.status(201).json({success:true, message:'Recruiter loged in successfully', result})
    } catch (error : any) {
        console.log('Error occured while recruiter login', error.message)
        if(error.message === "Not Found"){
            return res.status(404).json({success:false, message:"User not found"})
        }else if(error.message === "Wrong Password"){
            return res.status(400).json({success:false, message:"Invalid password, please enter correct password"})
        }else{
            return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
        }
    }

}

export const saveIntroDetailsRecruiter = async (req : Auth, res : Response) : Promise<Response> => {
    try {
        const id = req.user?.id
        const {companyName, about, benefits, companyType, industryType, teamStrength, yearOfEstablishment, website, vision, country, state, city, mobile} = req?.body?.details
        const {logourl, coverphotourl} = req.body
        const rRepo = new RecruiterRespository()
        const saveBasicsUseCase = new SaveBasics(rRepo)
        const isSaved = await saveBasicsUseCase.execute(id, companyName, about, benefits, companyType, industryType, teamStrength, yearOfEstablishment, website, vision, country, state, city, mobile, logourl, coverphotourl)
        return res.status(201).json({success:true, message:'Basic details saved'})
    } catch (error) {
        console.log('Error occured while updating the basic details of the recruiter', error)
        return res.status(500).json({success:false, message:'Internal server error please try again after some time'})
    }
}

export const loadRecruiterData = async (req : Auth, res : Response) : Promise<Response> => {
    try {
        const id = req.user.id
        const rRepo = new RecruiterRespository()
        const jRepo = new JobRepository()

        const loadRecruiterPrfileUC = new LoadProfileData(rRepo)
        const loadCompanyJobsUC = new LoadCompanyPostedJobs(jRepo)

        const recruiterDetails = await loadRecruiterPrfileUC.execute(id)
        const jobs = await loadCompanyJobsUC.execute(id)
        return res.status(201).json({success:true, message:'Recruiter details fetched successfully', recruiterDetails, jobs})
        
    } catch (error) {
        console.log('Error occured while fetching recruiter profile details', error)
        return res.status(500).json({success:false, message:'Internal server error, please try again after some time'})
    }
}

export const createJob = async (req : Auth, res : Response) : Promise<Response> => {
    try {
        const id = req.user.id
        const validateJob = CreateJobSchema.parse(req.body)
        const jobModel = createJobFromDTO(validateJob)
        const jRepo = new JobRepository()
        const createJobUC = new CreateJob(jRepo)
        const createJob = createJobUC.execute(id, jobModel)

        return res.status(201).json({success:true, message:'', job:createJob})
    } catch (error) {
        console.log('Error occued while creating the job', error)
        return res.status(500).json({success:false, message:'Internal server error, please try agaian after some time'})
    }
}