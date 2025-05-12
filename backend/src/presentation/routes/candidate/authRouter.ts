import express, {Router, Request, Response, NextFunction} from 'express'
import { generateToken } from '../../../services/jwt'
import CandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo'
import passport from 'passport'
import CandidateRepository from '../../../infrastructure/repositories/candidate/candidateRepository'

const authRouter : Router = express.Router()

authRouter.get('/google', passport.authenticate('google', {scope:['profile', 'email'], session:false}))
authRouter.get('/auth/google/callback', 
                passport.authenticate('google', {failureRedirect:'http://localhost:5173/login', session:false, failureFlash:true}),
                async (req : Request, res : Response) => {
                    console.log('This is the request object from the passpoart authentication', req?.user)
                    const token = await generateToken({id:(req?.user as any)._id})
                    // res.status(200).json({success:true, message:"Testing user request object", token})
                    console.log('going to the auth success page for front end')
                    res.redirect(`http://localhost:5173/auth-success?auth=${token}&id=${encodeURIComponent((req?.user as any)._id)}&email=${encodeURIComponent((req?.user as any).email)}`)
                }
)
authRouter.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    console.log('passpoart authentication error', err)
    next(err)
})

export default authRouter
