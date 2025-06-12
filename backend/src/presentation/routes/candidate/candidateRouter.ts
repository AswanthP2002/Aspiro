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
import ExperienceRepository from "../../../infrastructure/repositories/candidate/experienceRepository"
import AddExperienceUseCase from "../../../application/usecases/candidate/addExperience"
import { StatusCodes } from "../../statusCodes"
import getExperienceUseCase from "../../../application/usecases/candidate/getExperienceUseCase"
import GetExperienceUseCase from "../../../application/usecases/candidate/getExperienceUseCase"
import deleteExperienceUseCase from "../../../application/usecases/candidate/deleteExperienceUseCase"
import DeleteExperienceUseCase from "../../../application/usecases/candidate/deleteExperienceUseCase"
import EditExperienceUseCase from "../../../application/usecases/candidate/editExperienceUseCase"
import JobRepository from "../../../infrastructure/repositories/jobRepository"
import LoadJobsCandidateSideUseCase from "../../../application/usecases/candidate/loadJobLists"
import LoadJobDetailsCandidateSide from "../../../application/usecases/candidate/loadJobDetails"
import SkillRepsitory from "../../../infrastructure/repositories/candidate/skillRespository"
import AddSkill from "../../../application/usecases/candidate/addSkill"
import GetSkillsUseCase from "../../../application/usecases/candidate/getSkills"
import DeleteSkillUseCase from "../../../application/usecases/candidate/deleteSkill"

const candidateRouter = express.Router()

const candidateRepo = new CandidateRepository()
const experienceRepo = new ExperienceRepository()
const jobRepo = new JobRepository()
const skillRepo = new SkillRepsitory()

const registerCandidateUC = new RegisterCandidateUseCase(candidateRepo)
const verifyCandidateUC = new VerifyUserUseCase(candidateRepo)
const loginCandidateUC = new LoginCandidateUseCase(candidateRepo)
const saveCandidateBasicUC = new SaveIntroDetailsUseCase(candidateRepo)
const loadCandidatePersonalDataUC = new LoadCandidatePersonalDataUC(candidateRepo)
const addExperienceUC = new AddExperienceUseCase(experienceRepo)
const getExperiencesUC = new GetExperienceUseCase(experienceRepo)
const deleteExperienceUC = new DeleteExperienceUseCase(experienceRepo)
const editExperienceUC = new EditExperienceUseCase(experienceRepo)
const loadJobsUC = new LoadJobsCandidateSideUseCase(jobRepo)
const loadJobDetailsUC = new LoadJobDetailsCandidateSide(jobRepo)
const addSkillUC = new AddSkill(skillRepo)
const getSkillsUC = new GetSkillsUseCase(skillRepo)
const deleteSkillUC = new DeleteSkillUseCase(skillRepo)


const candidateController = new CandidateController(
    registerCandidateUC,
    verifyCandidateUC,
    loginCandidateUC,
    saveCandidateBasicUC,
    loadCandidatePersonalDataUC,
    addExperienceUC,
    getExperiencesUC,
    deleteExperienceUC,
    editExperienceUC,
    loadJobsUC,
    loadJobDetailsUC,
    addSkillUC,
    getSkillsUC,
    deleteSkillUC
)

candidateRouter.post('/register', candidateController.registerCandidate.bind(candidateController))
candidateRouter.post('/verify', candidateController.verifyUser.bind(candidateController))
candidateRouter.post('/login', candidateController.loginCandidate.bind(candidateController))
candidateRouter.get('/jobs', candidateController.loadJobs.bind(candidateController))
candidateRouter.get('/jobs/details/:jobId', candidateController.loadJobDetails.bind(candidateController))
candidateRouter.post('/personal/details/save', candidateAuth, candidateController.saveIntroDetailsCandidate.bind(candidateController))
candidateRouter.get('/profile/personal/datas', candidateAuth, candidateController.loadCandidatePersonalData.bind(candidateController))
candidateRouter.post('/candidate/experience/add', candidateAuth, candidateController.addExperience.bind(candidateController))
candidateRouter.get('/candidate/experience', candidateAuth, candidateController.getExperiences.bind(candidateController))
candidateRouter.delete('/candidate/experience/:experienceId', candidateAuth, candidateController.deleteExperience.bind(candidateController))
candidateRouter.put('/candidate/experience/edit/:experienceId', candidateAuth, candidateController.editExperience.bind(candidateController))
candidateRouter.post('/candidate/skills/add', candidateAuth, candidateController.addSkill.bind(candidateController))
candidateRouter.get('/candidate/skills', candidateAuth, candidateController.getSkills.bind(candidateController))
candidateRouter.delete('/candidate/skills/:skillId', candidateAuth, candidateController.deleteSkill.bind(candidateController))

candidateRouter.put('/candidate/profile',  candidateAuth, editCandidateProfile) //need updation

candidateRouter.get('/candidate/token/refresh', refreshAccessToken) //only checking refresh token
candidateRouter.post('/candidate/logout', candidateAuth, candidateController.candidateLogout.bind(candidateController))

candidateRouter.get('/get/user/:id', getAuthUserData)

function testMiddleWare(req : Request, res : Response, next : NextFunction) {
    console.log('Testing flow details from the client side', req.body)
    return res.status(StatusCodes.OK).json({success:true, message:'Maintanance purpose'})
}


export default candidateRouter