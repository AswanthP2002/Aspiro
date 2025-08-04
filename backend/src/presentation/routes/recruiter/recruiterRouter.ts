const express = require('express')
import { Request, Response, NextFunction } from 'express'
import RecruiterController from '../../controllers/recruiter/recruiterController'
import { recruiterAuth, refreshAccessToken } from '../../../middlewares/auth'
import { StatusCodes } from '../../statusCodes'
import RecruiterRespository from '../../../infrastructure/repositories/recruiter/recruiterRepository'
import CandidateRepository from '../../../infrastructure/repositories/candidate/candidateRepository'
import RegisterRecruiterUseCase from '../../../application/usecases/recruiter/registerRecruiter'
import VerifyRecruiterUseCase from '../../../application/usecases/recruiter/verifyRecruiter'
import { LoginRecruiterUseCase } from '../../../application/usecases/recruiter/loginRecruiter'
import SaveBasicsUseCase from '../../../application/usecases/recruiter/saveBasics'
import { LoadRecruiterProfileDataUseCase } from '../../../application/usecases/recruiter/loadProfile'
import CreateJobUseCase from '../../../application/usecases/createJob'
import JobRepository from '../../../infrastructure/repositories/jobRepository'
import JObApplicationRepository from '../../../infrastructure/repositories/JobApplicationRepository'
import GetJobApplicationDetailsUseCase from '../../../application/usecases/recruiter/getApplicationDetailsUseCase'
import { Db } from 'mongodb'

async function createRecruiterRouter(db : Db){


const recruiterRouter = express.Router()

const recruiterRepo = new RecruiterRespository(db)
const candiateRepo = new CandidateRepository(db)
const jobRepo = new JobRepository(db)
const jobApplicationRepo = new JObApplicationRepository(db)

const registerRecruiterUC = new RegisterRecruiterUseCase(recruiterRepo, candiateRepo)
const verifyRecruiterUC = new VerifyRecruiterUseCase(recruiterRepo)
const loginRecruiterUC = new LoginRecruiterUseCase(recruiterRepo)
const saveBasicsUC = new SaveBasicsUseCase(recruiterRepo)
const loadRecruiterProfileDataUC = new LoadRecruiterProfileDataUseCase(recruiterRepo)
const createJobUC = new CreateJobUseCase(jobRepo)
const getJobApplicationDetails = new GetJobApplicationDetailsUseCase(jobApplicationRepo)

const recruiterController = new RecruiterController(
    registerRecruiterUC,
    verifyRecruiterUC,
    loginRecruiterUC,
    saveBasicsUC,
    loadRecruiterProfileDataUC,
    createJobUC,
    getJobApplicationDetails
)

recruiterRouter.post('/recruiter/register',  recruiterController.registerRecruiter.bind(recruiterController))
recruiterRouter.post('/recruiter/verify', recruiterController.verifyRecruiter.bind(recruiterController))
recruiterRouter.post('/recruiter/login',  recruiterController.loginRecruiter.bind(recruiterController))
recruiterRouter.post('/recruiter/intro/details', recruiterAuth, recruiterController.saveIntroDetailsRecruiter.bind(recruiterController))
recruiterRouter.get('/recruiter/profile/overview', recruiterAuth, recruiterController.loadRecruiterProfileData.bind(recruiterController))
recruiterRouter.post('/recruiter/job/create', recruiterAuth, recruiterController.createJob.bind(recruiterController))
recruiterRouter.get('/recruiter/job/:jobId/application/details', recruiterController.getJobApplicationDetails.bind(recruiterController))
recruiterRouter.post('/recruiter/logout', (req : Request, res : Response, next : NextFunction) => {
    console.log('Logout request reached at test middleware', req.headers)
    next()
}, recruiterAuth, recruiterController.recruiterLogout.bind(recruiterController))

recruiterRouter.get('/recruiter/token/refresh', refreshAccessToken)

return recruiterRouter
}

export default createRecruiterRouter