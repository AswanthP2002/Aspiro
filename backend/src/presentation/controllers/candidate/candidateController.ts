import { Request, Response } from "express"
import CandidateRepository from "../../../infrastructure/repositories/candidate/candidateRepository"
import RegisterCandidate from "../../../application/usecases/candidate/registerCandidate"
import { RegisterCandidateSchema } from "../dtos/candidate/registerCandidateDTOs"
import { createCandidatefromDTO } from "../../../domain/mappers/candidate/candidateMapper"


export const registerCandidate = async (req : Request , res : Response) : Promise<Response> => {
    try {
        console.log('Incoming user data', req.body)
        const validateCandidate = RegisterCandidateSchema.parse(req.body)
        const candidateModel = createCandidatefromDTO(validateCandidate)
        const cRepo = new CandidateRepository()
        const cRegUsecase = new RegisterCandidate(cRepo)
        const createUser = await cRegUsecase.execute(candidateModel)

        console.log('registered candidate is here!', createUser)
        return res.status(201).json({success:true, message:"Candidate registered successfull", candidate:createUser})
    } catch (error : any) {
        console.log('Error occured while registering the user', error)
        if(error.message === "duplicate email"){
            return res.status(409).json({success:false, message:"This email id already registered with another user, please choose another one"})
        }else if(error.message === "duplicate username"){
            return res.status(409).json({success:false, message:"Username already taken, choose new one"})
        }

        return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
        
    }
}
