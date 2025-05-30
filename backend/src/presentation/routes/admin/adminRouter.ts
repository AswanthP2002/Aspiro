import { AdminLoginUseCase } from "../../../application/usecases/admin/adminLogin"
import { BlockCandidateUseCase } from "../../../application/usecases/admin/blockCandidateUseCase"
import BlockCompanyUseCase from "../../../application/usecases/admin/blockCompanyUseCase"
import { BlockJobUseCase } from "../../../application/usecases/admin/blockJobUseCase"
import CloseCompanyUseCase from "../../../application/usecases/admin/closeCompanyUseCase"
import { LoadCandidateDetailsUseCase } from "../../../application/usecases/admin/loadCandidateDetails"
import { LoadCandidatesUseCase } from "../../../application/usecases/admin/loadCandidates"
import LoadCompanyDetailsUseCase from "../../../application/usecases/admin/loadComapnyDetailsUseCase"
import { LoadCompaniesUseCase } from "../../../application/usecases/admin/loadCompanies"
import { LoadJobDetailsUseCase } from "../../../application/usecases/admin/loadJobDetailsUseCase"
import LoadJobsUseCase from "../../../application/usecases/admin/loadJobs"
import { RejectJobUseCase } from "../../../application/usecases/admin/rejectJobUseCase"
import { UnblockCandidateUseCase } from "../../../application/usecases/admin/unblockCandidateUseCase"
import UnblockCompanyUseCase from "../../../application/usecases/admin/unblockCompanyUseCase"
import { UnblockJobUseCase } from "../../../application/usecases/admin/unBlockJobUseCase"
import { UnRejectJobUseCase } from "../../../application/usecases/admin/unRejectJobUseCase"
import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import JobRepository from "../../../infrastructure/repositories/jobRepository"
import RecruiterRespository from "../../../infrastructure/repositories/recruiter/recruiterRepository"
import { adminAuth, refreshAccessToken } from "../../../middlewares/auth"
import { AdminController } from "../../controllers/admin/adminController"

const express = require('express')

const adminRouter = express.Router()

const candidateRepo = new CandidateRepository()
const recruiterRepo = new RecruiterRespository()
const jobRepo = new JobRepository()

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
const loadJobsUC = new LoadJobsUseCase(jobRepo)
const loadJobDetailsUC = new LoadJobDetailsUseCase(jobRepo)
const blockJobUC = new BlockJobUseCase(jobRepo)
const unblockJobUC = new UnblockJobUseCase(jobRepo)
const rejectJobUC = new RejectJobUseCase(jobRepo)
const unrejectJobUC = new UnRejectJobUseCase(jobRepo)


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
    closeCompanyUC,
    loadJobsUC,
    loadJobDetailsUC,
    blockJobUC,
    unblockJobUC,
    rejectJobUC,
    unrejectJobUC
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
adminRouter.get('/admin/jobs/data', adminAuth, adminController.loadJobs.bind(adminController))
adminRouter.get('/admin/job/details/:jobId', adminAuth, adminController.loadJObDetails.bind(adminController))
adminRouter.put('/admin/job/block/:jobId', adminAuth, adminController.blockJob.bind(adminController))
adminRouter.put('/admin/job/unblock/:jobId', adminAuth, adminController.unblockJob.bind(adminController))
adminRouter.put('/admin/job/reject/:jobId', adminAuth, adminController.rejectJob.bind(adminController))
adminRouter.put('/admin/job/unreject/:jobId', adminAuth, adminController.unrejectJob.bind(adminController))


adminRouter.post('/admin/token/refresh', refreshAccessToken)


export default adminRouter