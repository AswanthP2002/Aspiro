import { verifyToken } from "../services/jwt";
import { Request, Response, NextFunction } from "express";

export interface Auth extends Request {
    user : any
}
export const candidateAuth = async (req : Auth, res : Response, next : NextFunction) => {
    try {
        const token = req.headers.authorization
        console.log('Token reached here', token)
        if(!token) throw new Error('Token invalid')
        
        const decoded = await verifyToken(token.split(" ")[1])
        if(!decoded) return res.status(400).json({success:false, message:"Your session has expired, please re login"})
        req.user = decoded
        next()
    } catch (error) {
        console.log('Error occured while authenticating candidate', error)
        return res.status(500).json({success:false, message:"Internal server error, please try again after some time"})
    }
}