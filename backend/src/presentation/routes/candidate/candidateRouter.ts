const express = require('express')
import { NextFunction, Request, Response } from "express"
import { editCandidateProfile, getAuthUserData, loadCandidatePersonalData, loginUser, registerCandidate, saveIntroDetailsUser, verifyUser } from "../../controllers/candidate/candidateController"
import { candidateAuth } from "../../../middlewares/auth"

const candidateRouter = express.Router()

candidateRouter.post('/register', registerCandidate)
candidateRouter.post('/verify', verifyUser)
candidateRouter.post('/login', loginUser)
candidateRouter.post('/personal/details/save', candidateAuth, saveIntroDetailsUser)
candidateRouter.get('/profile/personal/datas', candidateAuth, loadCandidatePersonalData)
candidateRouter.put('/candidate/profile', (req : Request, res : Response, next : NextFunction) => {
    console.log('Request for editing candidate profile reached here ::::: ::::: :::::', req.body)
    next()
}, candidateAuth, editCandidateProfile)

candidateRouter.get('/get/user/:id', getAuthUserData)


export default candidateRouter