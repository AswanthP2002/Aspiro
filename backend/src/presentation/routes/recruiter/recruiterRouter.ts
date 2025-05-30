const express = require('express')
import { Request, Response, NextFunction } from 'express'
import { createJob, loadRecruiterData, loginRecruiter, registerRecruiter, saveIntroDetailsRecruiter, verifyRecruiter } from '../../controllers/recruiter/recruiterController'
import { recruiterAuth, refreshAccessToken } from '../../../middlewares/auth'
import { StatusCodes } from '../../statusCodes'

const recruiterRouter = express.Router()

recruiterRouter.post('/recruiter/register',  registerRecruiter)
recruiterRouter.post('/recruiter/verify', verifyRecruiter)
recruiterRouter.post('/recruiter/login',  loginRecruiter)
recruiterRouter.post('/recruiter/intro/details', recruiterAuth, saveIntroDetailsRecruiter)
recruiterRouter.get('/recruiter/profile/overview', recruiterAuth, loadRecruiterData)
recruiterRouter.post('/recruiter/job/create', recruiterAuth, createJob)

recruiterRouter.post('/recruiter/token/refresh', refreshAccessToken)

export default recruiterRouter