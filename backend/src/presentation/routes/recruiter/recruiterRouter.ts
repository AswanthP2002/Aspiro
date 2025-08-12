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
import NotificationRepository from '../../../infrastructure/repositories/notificationRepository'
import RejectCandidateUseCase from '../../../application/usecases/recruiter/rejectCandidateUseCase'
import CreateNotification from '../../../application/usecases/common/useCases/CreateNotificationUseCase'
import ShortlistRepository from '../../../infrastructure/repositories/recruiter/shortlistRepository'
import FinalizeShortlistUseCase from '../../../application/usecases/recruiter/FinalizeShortlistUseCase'
import GetFinalizedDataUseCase from '../../../application/usecases/recruiter/GetFinalizedDataUseCase'

async function createRecruiterRouter(db : Db){


const recruiterRouter = express.Router()

const recruiterRepo = new RecruiterRespository(db)
const candiateRepo = new CandidateRepository(db)
const jobRepo = new JobRepository(db)
const jobApplicationRepo = new JObApplicationRepository(db)
const notificationRepo = new NotificationRepository(db)
const shortlsitRepo = new ShortlistRepository(db)

const registerRecruiterUC = new RegisterRecruiterUseCase(recruiterRepo, candiateRepo)
const verifyRecruiterUC = new VerifyRecruiterUseCase(recruiterRepo)
const loginRecruiterUC = new LoginRecruiterUseCase(recruiterRepo)
const saveBasicsUC = new SaveBasicsUseCase(recruiterRepo)
const loadRecruiterProfileDataUC = new LoadRecruiterProfileDataUseCase(recruiterRepo)
const createJobUC = new CreateJobUseCase(jobRepo)
const getJobApplicationDetails = new GetJobApplicationDetailsUseCase(jobApplicationRepo)
const rejectCandidateApplicationUC = new RejectCandidateUseCase(jobApplicationRepo)
const createNotificationUC = new CreateNotification(notificationRepo)
const finalizeShortlistUC = new FinalizeShortlistUseCase(shortlsitRepo)
const getFinalizedDataUC = new GetFinalizedDataUseCase(shortlsitRepo)

const recruiterController = new RecruiterController(
    registerRecruiterUC,
    verifyRecruiterUC,
    loginRecruiterUC,
    saveBasicsUC,
    loadRecruiterProfileDataUC,
    createJobUC,
    getJobApplicationDetails,
    rejectCandidateApplicationUC,
    createNotificationUC,
    finalizeShortlistUC,
    getFinalizedDataUC
)

recruiterRouter.post('/recruiter/register',  recruiterController.registerRecruiter.bind(recruiterController))
recruiterRouter.post('/recruiter/verify', recruiterController.verifyRecruiter.bind(recruiterController))
recruiterRouter.post('/recruiter/login',  recruiterController.loginRecruiter.bind(recruiterController))
recruiterRouter.post('/recruiter/intro/details', recruiterAuth, recruiterController.saveIntroDetailsRecruiter.bind(recruiterController))
recruiterRouter.get('/recruiter/profile/overview', recruiterAuth, recruiterController.loadRecruiterProfileData.bind(recruiterController))
recruiterRouter.post('/recruiter/job/create', recruiterAuth, recruiterController.createJob.bind(recruiterController))
recruiterRouter.get('/recruiter/job/:jobId/application/details', recruiterController.getJobApplicationDetails.bind(recruiterController))
recruiterRouter.put('/recruiter/reject/application/:applicationId/:candidateId', recruiterController.rejectCandidateJobApplication.bind(recruiterController))
recruiterRouter.post('/recruiter/applications/finalize/:jobId', recruiterAuth, recruiterController.finalizeShortlist.bind(recruiterController))
recruiterRouter.get('/recruiter/applications/finalize/:jobId', recruiterAuth, recruiterController.getFinalizedShortlistData.bind(recruiterController))

recruiterRouter.post('/recruiter/logout', (req : Request, res : Response, next : NextFunction) => {
    console.log('Logout request reached at test middleware', req.headers)
    next()
}, recruiterAuth, recruiterController.recruiterLogout.bind(recruiterController))

recruiterRouter.get('/recruiter/token/refresh', refreshAccessToken)

return recruiterRouter
}

export default createRecruiterRouter