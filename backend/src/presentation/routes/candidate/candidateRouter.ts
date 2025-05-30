const express = require('express')
import { NextFunction, Request, Response } from "express"
import { CandidateController, editCandidateProfile, getAuthUserData } from "../../controllers/candidate/candidateController"
import { candidateAuth, refreshAccessToken } from "../../../middlewares/auth"
import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import RegisterCandidateUseCase from "../../../application/usecases/candidate/registerCandidate"
import VerifyUserUseCase from "../../../application/usecases/candidate/verifyUser"
import { LoginCandidateUseCase } from "../../../application/usecases/candidate/loginCandidate"
import SaveBasics from "../../../application/usecases/recruiter/saveBasics"
import SaveIntroDetailsUseCase from "../../../application/usecases/candidate/saveBasiscs"
import { LoadCandidatePersonalDataUC } from "../../../application/usecases/candidate/loadPersonalDatas"

const candidateRouter = express.Router()

const candidateRepo = new CandidateRepository()

const registerCandidateUC = new RegisterCandidateUseCase(candidateRepo)
const verifyCandidateUC = new VerifyUserUseCase(candidateRepo)
const loginCandidateUC = new LoginCandidateUseCase(candidateRepo)
const saveCandidateBasicUC = new SaveIntroDetailsUseCase(candidateRepo)
const loadCandidatePersonalDataUC = new LoadCandidatePersonalDataUC(candidateRepo)


const candidateController = new CandidateController(
    registerCandidateUC,
    verifyCandidateUC,
    loginCandidateUC,
    saveCandidateBasicUC,
    loadCandidatePersonalDataUC
)

candidateRouter.post('/register', candidateController.registerCandidate.bind(candidateController))
candidateRouter.post('/verify', candidateController.verifyUser.bind(candidateController))
candidateRouter.post('/login', candidateController.loginCandidate.bind(candidateController))
candidateRouter.post('/personal/details/save', candidateAuth, candidateController.saveIntroDetailsCandidate.bind(candidateController))
candidateRouter.get('/profile/personal/datas', candidateAuth, candidateController.loadCandidatePersonalData.bind(candidateController))
candidateRouter.put('/candidate/profile',  candidateAuth, editCandidateProfile)

candidateRouter.get('/candidate/token/refresh', refreshAccessToken) //only checking refresh token
candidateRouter.post('/candidate/logout', candidateAuth, candidateController.candidateLogout.bind(candidateController))

candidateRouter.get('/get/user/:id', getAuthUserData)

function testMiddleWare(req : Request, res : Response, next : NextFunction) {
    console.log('Testing middleware :: candidateRouter.ts')
    console.log('Refresh token saved in cookie', req.cookies?.refreshToken)
    next()
}


export default candidateRouter