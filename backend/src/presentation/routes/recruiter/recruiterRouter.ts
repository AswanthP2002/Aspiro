const express = require('express')
import { Request, Response, NextFunction } from 'express'
import { createJob, loadRecruiterData, loginRecruiter, registerRecruiter, saveIntroDetailsRecruiter, verifyRecruiter } from '../../controllers/recruiter/recruiterController'
import { recruiterAuth } from '../../../middlewares/auth'

const recruiterRouter = express.Router()

recruiterRouter.post('/recruiter/register', (req : Request, res : Response, next : NextFunction) => {
    console.log('recruiter registration request :: recruiterRouter.ts')
    next()
},  registerRecruiter)
recruiterRouter.post('/recruiter/verify', (req : Request, res : Response, next : NextFunction) => {
    console.log('recruiter verification request :: recruiterRouter.ts')
    next()
},  verifyRecruiter)
recruiterRouter.post('/recruiter/login', (req : Request, res : Response, next : NextFunction) => {
    console.log('Request reached here for recriter login')
    // return res.status(200).json({success:true, message:'test case'})
    next()
},  loginRecruiter)
recruiterRouter.post('/recruiter/intro/details', recruiterAuth, saveIntroDetailsRecruiter)
recruiterRouter.get('/recruiter/profile/overview', recruiterAuth, loadRecruiterData)
recruiterRouter.post('/recruiter/job/create', recruiterAuth, createJob)

export default recruiterRouter