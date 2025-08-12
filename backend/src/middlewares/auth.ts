import CheckCandidateBlockStatusUseCase from "../application/usecases/candidate/CheckCandidateBlockStatusUseCase";
import { connectDb } from "../infrastructure/database/connection";
import CandidateRepository from "../infrastructure/repositories/candidate/candidateRepository";
import { StatusCodes } from "../presentation/statusCodes";
import { generateToken, verifyToken } from "../services/jwt";
import { Request, Response, NextFunction } from "express";


let candidateRepo
let checkCandidateBlockStatusUC : any

(async function(){
    const db = await connectDb()
    candidateRepo = new CandidateRepository(db)
    checkCandidateBlockStatusUC = new CheckCandidateBlockStatusUseCase(candidateRepo)
})()

export interface Auth extends Request {
    user : any 
}

export interface AdminAuth extends Request {
    admin : any
    candidateId?:string
}
export const candidateAuth = async (req : Auth, res : Response, next : NextFunction) => {
    console.log('resume upload request reached at candidateAuth.ts')
    try {
        //check candidate blocked or not??
        const authHeader = req.headers.authorization
        
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            console.log('Token is missing or malformed')
            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Authorization token is missing or malformed'})
        }

        const token = authHeader.split(" ")[1]
        try {
            const decod : any = await verifyToken(token)
            const isBlocked = await checkCandidateBlockStatusUC.execute(decod.id)
            if(isBlocked) return res.status(StatusCodes.FORBIDEN).json({success:false, message:'Your account has been blocked by the admin, you will logout shortly..'})
            req.user = decod
            console.log('Authentication success, transfering control to next parsePdf function')
            next()
        } catch (error : any) {
                switch(error.name){
                    case 'TokenExpiredError' :
                        console.log('error occured',error.message)
                        return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Session expired, please login again'})
                    case 'JsonWebTokenError' :
                        console.log('error occured', error.message)
                        return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Invalid Token, please login again'})
                    default :
                        console.log('Token verification failed', error)
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong while verifying the token'})
                    }
        }
        
    } catch (error : any) {
        console.log('Error occured while authenticating candidate', error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"Internal server error, please try again after some time"})
    }
}

export const recruiterAuth = async (req : Auth, res : Response, next : NextFunction) => {

    const token = req.headers.authorization
    console.log('recruiter token before decoding', token)

    if(!token){
        console.log('NO token')
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({success:false, message:'Access denied, no token provided or token malformed'})
    }

    try {
        const decoded = await verifyToken(token.split(" ")[1])
        req.user = decoded
        next()
    } catch (error : unknown) {
        if(error instanceof Error){
            switch(error.name){
                case 'TokenExpiredError' :
                    return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Your session has expired, please re login'})
                case 'JsonWebTokenError' :
                    return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Invalid token, please re login'})
                default :
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong, please try again after some time'})
            }
        }
    }
}

export const adminAuth = async (req : AdminAuth, res : Response, next : NextFunction) => {
    console.log('Admin logout request reached admin auth')
    //get token from authorization
    const token = req.headers.authorization

    //check token existance
    if(!token){
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({success:false, message:'Access denied, No token provided or token malformed'})
    }

    //decode token
    try {
        const decoded = await verifyToken(token.split(" ")[1])
        req.admin = decoded
        next()

    } catch (error : unknown) {
        if(error instanceof Error){
            console.log('Error occured while authenticating admin', error)
            switch(error.name){
                case 'TokenExiredError' :
                    return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Your session has expired, please login'})
                case 'JsonWebTokenError' :
                    return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Invalid token, please login'})
                default :
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong, please try again after some time'})
            }
        }
    }
}


export const refreshAccessToken = async (req : Request, res : Response) => {
    const candidateRefreshToken = req.cookies?.refreshToken
    const recruiterRefreshToken = req.cookies?.recruiterRefreshToken
    const adminRefreshToken = req.cookies?.adminRefreshToken

    let refreshToken = ''
    let role = ''
    let accessToken = ''

    if(candidateRefreshToken){
        refreshToken = candidateRefreshToken
        role = 'Candidate'
    }else if(recruiterRefreshToken){
        refreshToken = recruiterRefreshToken
        role = 'Recruiter'
    }else if(adminRefreshToken){
        refreshToken = adminRefreshToken
        role = 'Admin'
    }else {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({success:false, message:'Access denied, no token provided'})
    }


    try {
        const decoded : any = await verifyToken(refreshToken)

        switch (decoded.role){
            case 'Candidate' :
                accessToken = await generateToken({id:decoded?.id, email:decoded?.email, name:decoded?.name, role:role})
                break
            case 'Recruiter' :
                accessToken = await generateToken({id:decoded?.id, email:decoded?.email, username:decoded?.username, role:role})
                break
            case 'Admin' :
                accessToken = await generateToken({id:decoded?.id, email:decoded?.email, role:role})
                break
            default :
                throw new Error('Unknown Error')
        }

        return res.status(StatusCodes.OK).json({success:true, message:'New Access Token issued', accessToken})

    } catch (error : unknown) {
        if(error instanceof Error){
            console.log('Error occured  while issuing new access token', error)
            switch(error.name){
                case 'TokenExpiredError' :
                    return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Your session has expired, please login to continue'})
                case 'JsonWebTokenError' :
                    return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Invalid Token, please login again'})
                default :
                    console.log('token validation failed')
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong, please try again after some time'})
            }
        }
    }
}
