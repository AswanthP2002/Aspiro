import { Admin, Auth } from "mongodb"
import { AdminLoginUseCase } from "../../../application/usecases/admin/adminLogin"
import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import { Request, Response } from "express"
import { AdminAuth } from "../../../middlewares/auth"
import RecruiterRespository from "../../../infrastructure/repositories/recruiter/recruiterRepository"
import { LoadCompaniesUseCase } from "../../../application/usecases/admin/loadCompanies"
import { LoadCandidatesUseCase } from "../../../application/usecases/admin/loadCandidates"
import { StatusCodes } from "../../statusCodes"
import { LoadCandidateDetailsUseCase } from "../../../application/usecases/admin/loadCandidateDetails"
import { BlockCandidateUseCase } from "../../../application/usecases/admin/blockCandidateUseCase"
import { UnblockCandidateUseCase } from "../../../application/usecases/admin/unblockCandidateUseCase"
import LoadCompanyDetailsUseCase from "../../../application/usecases/admin/loadComapnyDetailsUseCase"
import BlockCompanyUseCase from "../../../application/usecases/admin/blockCompanyUseCase"
import UnblockCompanyUseCase from "../../../application/usecases/admin/unblockCompanyUseCase"
import CloseCompanyUseCase from "../../../application/usecases/admin/closeCompanyUseCase"
import LoadJobsUseCase from "../../../application/usecases/admin/loadJobs"
import { LoadJobDetailsUseCase } from "../../../application/usecases/admin/loadJobDetailsUseCase"
import { BlockJobUseCase } from "../../../application/usecases/admin/blockJobUseCase"
import { UnblockJobUseCase } from "../../../application/usecases/admin/unBlockJobUseCase"
import { RejectJobUseCase } from "../../../application/usecases/admin/rejectJobUseCase"
import { UnRejectJobUseCase } from "../../../application/usecases/admin/unRejectJobUseCase"

export class AdminController {
    constructor(
        private _adminLoginUC : AdminLoginUseCase,
        private _loadCandidatesUC : LoadCandidatesUseCase,
        private _loadCompaniesUC : LoadCompaniesUseCase,
        private _loadCandidateDetailsUC : LoadCandidateDetailsUseCase,
        private _blockCandidateUC : BlockCandidateUseCase,
        private _unblockCandidateUC : UnblockCandidateUseCase,
        private _loadCompanyDetailsUC : LoadCompanyDetailsUseCase,
        private _blockCompanyUC : BlockCompanyUseCase,
        private _unblockCompanyUC : UnblockCompanyUseCase,
        private _closeCompanyUC : CloseCompanyUseCase,
        private _loadJobsUC : LoadJobsUseCase,
        private _loadJobDetails : LoadJobDetailsUseCase,
        private _blockJobUC : BlockJobUseCase,
        private _unblockJobUC : UnblockJobUseCase,
        private _rejectJobUC : RejectJobUseCase,
        private _unrejectJobUC : UnRejectJobUseCase
    ){}

    async adminLogin(req : Request, res : Response) : Promise<Response> { //login controller for admin
        const {email, password} = req.body 
        try {
            const result : any = await this._adminLoginUC.execute(email, password)
            const {refreshToken} = result
            return res.status(StatusCodes.OK)
            .cookie('adminRefreshToken', refreshToken, {
                httpOnly:true,
                secure:false,
                sameSite:'lax',
                maxAge:24 * 60 * 60 * 1000
            })
            .json({
                success:true, 
                message:'Admin loged in successfully', 
                result
            })
        } catch (error : unknown) {
            if(error instanceof Error){
                switch(error.message){
                    case 'Not Found' :
                        return res.status(StatusCodes.NOT_FOUND).json({success:false, message:"User not found"})
                    case 'Wrong Password' :
                        return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:"Invalid password, please enter correct password"})
                    default :
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"Internal server error, please try again after some time"})
                    }
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"An unknown error occured"})
        }
    }

    async loadCandidates(req : AdminAuth, res : Response) : Promise<Response> { //list of candidates
        const search = req.query.search as string || ""
        console.log('Search query reached here', req.query.search)
        const page = parseInt(req?.query?.page as string) || 1
        const limit = parseInt(req?.query?.limit as string) || 3
        try {
            const result = await this._loadCandidatesUC.execute(search, page, limit)

            return res.status(StatusCodes.OK).json({
                success:true,
                message:'Candidates details fetched successfully',
                result,
                pagination:{page, limit}
            })
        } catch (error : unknown) {
            console.log('Error occured while fethcing the candidate details adminController.ts :::', error)
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success:false,
                    message:'Internal server error, please try agaiain after some time'
                })
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'An unknown error occured'
            })
        }
    }

    async loadCandidateDetails(req : AdminAuth, res : Response) : Promise<Response> { //individual candidate details
        const {candidateId} = req.query
        console.log(`candidate id reached here`, candidateId)
        try {
            if(typeof candidateId !== 'string'){
                throw new Error('undefined data')
            }
            const result = await this._loadCandidateDetailsUC.execute(candidateId)
            return res.status(StatusCodes.OK).json({success:true, message:'Candidate Details fetched successfully', candidateDetails:result})
        } catch (error : any) {
            console.log('error occured while fetching the details of candidate', error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error'})
        }
    }

    async loadCompanies(req : AdminAuth, res : Response) : Promise<Response> { //company list
        try {
            const result = await this._loadCompaniesUC.execute()

            return res.status(201).json({success:true, result})
        } catch (error : unknown) {
             if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
             }
             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"An unknown error occured"})
        }
    }

    async blockCandidate(req : AdminAuth, res : Response) : Promise<Response> { //block individual candidate
        try {
            const {id} = req.body

            const result = await this._blockCandidateUC.execute(id)
            if(!result) throw new Error('Can not block candidate')
            return res.status(StatusCodes.OK).json({success:true, message:'Candidate blocked successfully'})
        } catch (error : any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error'})
        }
    }

    async unblockCandidate(req : AdminAuth, res : Response) : Promise<Response> { //unblock individual candidates
        try {
            const {id} = req.body

            const result = await this._unblockCandidateUC.execute(id)
            if(!result) throw new Error('Can not unblock candidate')
            return res.status(StatusCodes.OK).json({success:true, message:'Candidate unblocked successfully'})
        } catch (error : any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error'})
        }
    }

    async loadCompanyDetails(req : AdminAuth, res : Response) : Promise<Response> {
        const {companyId} = req.params
        if(!companyId) return res.status(StatusCodes.NOT_ACCEPTABLE).json({success:false, message:'Company id not provided'})
        
        try {
            const companyDetails = await this._loadCompanyDetailsUC.execute(companyId)
            return res.status(StatusCodes.OK).json({success:true, message:'Company details fetched successfully', companyDetails})
        } catch (error : unknown) {
            console.log('Error occured while fetching comapny details', error)
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }

    async blockRecruiter(req : AdminAuth, res : Response) : Promise<Response> {
        const {companyId} = req.params

        try {
            const blockResult = await this._blockCompanyUC.execute(companyId)
            if(!blockResult) throw new Error('Can not block company')

            return res.status(StatusCodes.OK).json({success:true, message:'Company blocked successfully'})
        } catch (error : unknown) {
            console.log('Error occured while blocking company')
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }

    async unblockRecruiter(req : AdminAuth, res : Response) : Promise<Response> {
        const {companyId} = req.params

        try {
            const unblockResult = await this._unblockCompanyUC.execute(companyId)
            if(!unblockResult) throw new Error('Can not unlblock company')

            return res.status(StatusCodes.OK).json({success:true, message:'Company unblocked successfully'})
        } catch (error : unknown) {
            console.log('Error occured while unblocking company')
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }

    async closeCompany(req : AdminAuth, res : Response) : Promise<Response> {
        const {companyId} = req.params
        console.log('Company id for closing the company', companyId, typeof companyId)

        try {
            const closeCompanyResult = await this._closeCompanyUC.execute(companyId)
            if(!closeCompanyResult) throw new Error('Can not close company' )
                return res.status(StatusCodes.OK).json({success:true, message:'Company closed successfully'})
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while closing the company', error)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }

    async loadJobs(req : AdminAuth, res : Response) : Promise<Response> {
        try {
            const jobs = await this._loadJobsUC.execute()
            return res.status(StatusCodes.OK).json({success:true, message:'Job fetched successfully', jobs})
        } catch (error : unknown) {
            if(error instanceof Error){
                console.log('Error occured while fetching the jobs')
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    }

    async loadJObDetails(req : AdminAuth, res : Response) : Promise<Response> {
        try {
            const {jobId} = req.params
            const result = await this._loadJobDetails.execute(jobId)
            const jobDetails = result[0]
            return res.status(StatusCodes.OK).json({success:true, message:'Job details fetched successfully', jobDetails})
        } catch (error : unknown) {
            console.log('Error occured while fetching job details', error)
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured'})
        }
    }

    async blockJob(req :AdminAuth, res : Response) : Promise<Response> {
        const {jobId} = req.params

        try {
            const blockResult = await this._blockJobUC.execute(jobId)
            if(!blockResult) throw new Error('Can not block job')

            return res.status(StatusCodes.OK).json({success:true, message:'job blocked successfully'})
        } catch (error : unknown) {
            console.log('Error occured while blocking job')
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }

    async unblockJob(req :AdminAuth, res : Response) : Promise<Response> {
        const {jobId} = req.params

        try {
            const blockResult = await this._unblockJobUC.execute(jobId)
            if(!blockResult) throw new Error('Can not unblock job')

            return res.status(StatusCodes.OK).json({success:true, message:'job unblocked successfully'})
        } catch (error : unknown) {
            console.log('Error occured while unblocking job')
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }

    async rejectJob(req :AdminAuth, res : Response) : Promise<Response> {
        const {jobId} = req.params

        try {
            const blockResult = await this._rejectJobUC.execute(jobId)
            if(!blockResult) throw new Error('Can not block job')

            return res.status(StatusCodes.OK).json({success:true, message:'job rejected successfully'})
        } catch (error : unknown) {
            console.log('Error occured while rejecting job')
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }

    async unrejectJob(req :AdminAuth, res : Response) : Promise<Response> {
        const {jobId} = req.params

        try {
            const blockResult = await this._unrejectJobUC.execute(jobId)
            if(!blockResult) throw new Error('Can not unreject job')

            return res.status(StatusCodes.OK).json({success:true, message:'job unrejected successfully'})
        } catch (error : unknown) {
            console.log('Error occured while unrejecting job')
            if(error instanceof Error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Internal server error, please try again after some time'})
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'An unknown error occured, please try again after some time'})
        }
    }
}
