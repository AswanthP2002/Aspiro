import { AdminLoginUseCase } from "../../../application/usecases/admin/adminLogin"
import { BlockCandidateUseCase } from "../../../application/usecases/admin/blockCandidateUseCase"
import BlockCompanyUseCase from "../../../application/usecases/admin/blockCompanyUseCase"
import CloseCompanyUseCase from "../../../application/usecases/admin/closeCompanyUseCase"
import { LoadCandidateDetailsUseCase } from "../../../application/usecases/admin/loadCandidateDetails"
import { LoadCandidatesUseCase } from "../../../application/usecases/admin/loadCandidates"
import LoadCompanyDetailsUseCase from "../../../application/usecases/admin/loadComapnyDetailsUseCase"
import { LoadCompaniesUseCase } from "../../../application/usecases/admin/loadCompanies"
import { UnblockCandidateUseCase } from "../../../application/usecases/admin/unblockCandidateUseCase"
import UnblockCompanyUseCase from "../../../application/usecases/admin/unblockCompanyUseCase"
import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import RecruiterRespository from "../../../infrastructure/repositories/recruiter/recruiterRepository"
import { adminAuth, refreshAccessToken } from "../../../middlewares/auth"
import { AdminController } from "../../controllers/admin/adminController"

const express = require('express')

const adminRouter = express.Router()

const candidateRepo = new CandidateRepository()
const recruiterRepo = new RecruiterRespository()

const adminLoginUC = new AdminLoginUseCase(candidateRepo)
const loadCandidatesUC = new LoadCandidatesUseCase(candidateRepo)
const loadCompaniesUC = new LoadCompaniesUseCase(recruiterRepo)
const loadCandidateDetailsUC = new LoadCandidateDetailsUseCase(candidateRepo)
const blockCandidateUC = new BlockCandidateUseCase(candidateRepo)
const unblockCandidateUC = new UnblockCandidateUseCase(candidateRepo)
const loadCompanyDetailsUC = new LoadCompanyDetailsUseCase(recruiterRepo)
const blockCompanyUC = new BlockCompanyUseCase(recruiterRepo)
const unblockCompanyUC = new UnblockCompanyUseCase(recruiterRepo)
const closeCompanyUC = new CloseCompanyUseCase(recruiterRepo)


const adminController = new AdminController(
    adminLoginUC,
    loadCandidatesUC,
    loadCompaniesUC,
    loadCandidateDetailsUC,
    blockCandidateUC,
    unblockCandidateUC,
    loadCompanyDetailsUC,
    blockCompanyUC,
    unblockCompanyUC,
    closeCompanyUC
)

adminRouter.post('/admin/login', adminController.adminLogin.bind(adminController))
adminRouter.get('/admin/candidates/data', adminAuth, adminController.loadCandidates.bind(adminController))
adminRouter.get('/admin/companies/data', adminAuth, adminController.loadCompanies.bind(adminController))
adminRouter.get('/admin/candidate/details', adminAuth, adminController.loadCandidateDetails.bind(adminController))
adminRouter.post('/admin/candidate/block', adminAuth, adminController.blockCandidate.bind(adminController))
adminRouter.post('/admin/candidate/unblock', adminAuth, adminController.unblockCandidate.bind(adminController))
adminRouter.get('/admin/company/details/:companyId', adminAuth, adminController.loadCompanyDetails.bind(adminController))
adminRouter.put('/admin/company/block/:companyId', adminAuth, adminController.blockRecruiter.bind(adminController))
adminRouter.put('/admin/company/unblock/:companyId', adminAuth, adminController.unblockRecruiter.bind(adminController))
adminRouter.delete('/admin/company/close/:companyId', adminAuth, adminController.closeCompany.bind(adminController))

adminRouter.post('/admin/token/refresh', refreshAccessToken)


export default adminRouter