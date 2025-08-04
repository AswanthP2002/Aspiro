const express = require('express')
import { upload } from "../../../utilities/multer"
import pdf from 'pdf-parse'
import { NextFunction, Request, Response } from "express"
import { CandidateController, getAuthUserData } from "../../controllers/candidate/candidateController"
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
import EducationRepository from "../../../infrastructure/repositories/candidate/educationRepository"
import AddEducationUseCase from "../../../application/usecases/candidate/addEducation"
import GetEducationsUseCase from "../../../application/usecases/candidate/getEducationsUseCase"
import DeleteEducationUseCase from "../../../application/usecases/candidate/deleteEducationUseCase"
import EditEducationUseCase from "../../../application/usecases/candidate/editEducationUseCase"
import ResumeRepository from "../../../infrastructure/repositories/candidate/resumeRepository"
import AddResumeUseCase from "../../../application/usecases/candidate/addResumeUseCase"
import LoadResumesUseCase from "../../../application/usecases/candidate/loadResumesUseCase"
import DeleteResumeUseCase from "../../../application/usecases/candidate/deleteResumeUseCase"
import CertificateRepository from "../../../infrastructure/repositories/candidate/certificateRepository"
import AddCertificateUseCase from "../../../application/usecases/candidate/addCertificateUseCase"
import GetCertificatesUseCase from "../../../application/usecases/candidate/getCertificatesUseCase"
import JObApplicationRepository from "../../../infrastructure/repositories/JobApplicationRepository"
import SaveJobApplicationUseCase from "../../../application/usecases/saveJobApplicationUseCase"
import parsePdf from "../../../middlewares/parsePdf"
import SearchJobsFromHomeUseCase from "../../../application/usecases/searchJobsFromHomeUseCase"
import { connectDb } from "../../../infrastructure/database/connection"
import { Db } from "mongodb"
import EditProfileUseCase from "../../../application/usecases/candidate/editProfile"

async function createCandidateRouter(db : Db){
    const candidateRouter = express.Router()
    //const candidateRouter = express.Router()

    const candidateRepo = new CandidateRepository(db)
    const experienceRepo = new ExperienceRepository(db)
    const jobRepo = new JobRepository(db)
    const skillRepo = new SkillRepsitory(db)
    const educationRepo = new EducationRepository(db)
    const resumeRepo = new ResumeRepository(db)
    const certificateRepo = new CertificateRepository(db)
    const jobApplicationRepo = new JObApplicationRepository(db)


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
    const addEducationUC = new AddEducationUseCase(educationRepo)
    const getEducationsUC = new GetEducationsUseCase(educationRepo)
    const deleteEducationUC = new DeleteEducationUseCase(educationRepo)
    const editEducationUC = new EditEducationUseCase(educationRepo)
    const addResumeUC = new AddResumeUseCase(resumeRepo)
    const loadResumeUC = new LoadResumesUseCase(resumeRepo)
    const deleteResumeUC = new DeleteResumeUseCase(resumeRepo)
    const addCertificateUC = new AddCertificateUseCase(certificateRepo)
    const loadCertificatesUC = new GetCertificatesUseCase(certificateRepo)
    const applyJobUC = new SaveJobApplicationUseCase(jobApplicationRepo)
    const searchJobsHomePageUC = new SearchJobsFromHomeUseCase(jobRepo)
    const editCandidateProfileUC = new EditProfileUseCase(candidateRepo)


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
        deleteSkillUC,
        addEducationUC,
        getEducationsUC,
        deleteEducationUC,
        editEducationUC,
        addResumeUC,
        loadResumeUC,
        deleteResumeUC,
        addCertificateUC,
        loadCertificatesUC,
        applyJobUC,
        searchJobsHomePageUC,
        editCandidateProfileUC
    )

candidateRouter.post('/register', candidateController.registerCandidate.bind(candidateController))
candidateRouter.post('/verify', candidateController.verifyUser.bind(candidateController))
candidateRouter.post('/login', candidateController.loginCandidate.bind(candidateController))
candidateRouter.get('/jobs', candidateController.loadJobs.bind(candidateController))
candidateRouter.get('/jobs/details/:jobId', candidateController.loadJobDetails.bind(candidateController))
candidateRouter.post('candidate/personal/details/save', candidateAuth, candidateController.saveIntroDetailsCandidate.bind(candidateController))
candidateRouter.get('candidate/profile/personal/datas', candidateAuth, candidateController.loadCandidatePersonalData.bind(candidateController))
candidateRouter.post('/candidate/experience/add', candidateAuth, candidateController.addExperience.bind(candidateController))
candidateRouter.get('/candidate/experience', candidateAuth, candidateController.getExperiences.bind(candidateController))
candidateRouter.delete('/candidate/experience/:experienceId', candidateAuth, candidateController.deleteExperience.bind(candidateController))
candidateRouter.put('/candidate/experience/edit/:experienceId', candidateAuth, candidateController.editExperience.bind(candidateController))
candidateRouter.post('/candidate/skills/add', candidateAuth, candidateController.addSkill.bind(candidateController))
candidateRouter.get('/candidate/skills', candidateAuth, candidateController.getSkills.bind(candidateController))
candidateRouter.delete('/candidate/skills/:skillId', candidateAuth, candidateController.deleteSkill.bind(candidateController))
candidateRouter.post('/candidate/education/add', candidateAuth, candidateController.addEducation.bind(candidateController))
candidateRouter.get('/candidate/education', candidateAuth, candidateController.getEducations.bind(candidateController))
candidateRouter.delete('/candidate/education/:educationId', candidateAuth, candidateController.deleteEducation.bind(candidateController))
candidateRouter.put('/candidate/education/:educationId', candidateAuth, candidateController.editEducation.bind(candidateController))
candidateRouter.delete('/candidate/resume/:resumeId', candidateAuth, candidateController.deleteResume.bind(candidateController))
candidateRouter.post('/candidate/certificate',upload.single('certificate'), candidateAuth, candidateController.addCertificate.bind(candidateController))
candidateRouter.get('/candidate/certificate', candidateAuth, candidateController.getCertificates.bind(candidateController))

candidateRouter.get('/home/jobs', testMiddleWare, candidateController.searchJobFromHomePage.bind(candidateController))

candidateRouter.post('/candidate/resume/upload', candidateAuth, upload.single('resume'), parsePdf, candidateController.addResume.bind(candidateController))

candidateRouter.get('/candidate/resumes', candidateAuth, candidateController.loadResume.bind(candidateController))

candidateRouter.patch('/candidate/profile',  candidateAuth, candidateController.editCandidateProfile.bind(candidateController)) //need updation

candidateRouter.post('/candidate/job/:jobId/apply', candidateAuth, upload.single('resume'), parsePdf, candidateController.saveJobApplication.bind(candidateController))

candidateRouter.get('/candidate/token/refresh', refreshAccessToken) //only checking refresh token
candidateRouter.post('/candidate/logout', candidateAuth, candidateController.candidateLogout.bind(candidateController))

candidateRouter.get('/get/user/:id', getAuthUserData)

function testMiddleWare(req : Request, res : Response, next : NextFunction) {
    console.log('Testing flow details from the client side, full query :: ', req.query)
    next()
    // return res.status(StatusCodes.OK).json({success:true, message:'Maintanance purpose'})
}

 return candidateRouter
}

export default createCandidateRouter
