import passport from "passport";
import { Strategy as GoogleStrategy, Profile} from "passport-google-oauth20";
import dotenv from 'dotenv'
import CandidateRepository from "../infrastructure/repositories/candidate/candidateRepository";
import { RegisterGoogleAuthCandidateSchema } from "../presentation/controllers/dtos/candidate/registerGoogleAuthCandidate";
import { createCandidatefromDTO, createGoogleAutCandidatefromDTO } from "../domain/mappers/candidate/candidate.mapper";
import { join } from "path";
dotenv.config()

passport.use(new GoogleStrategy({
    clientID:'45515747429-0m75vis59qopfm89l2qdj4d5bcu4v94l.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:"http://localhost:5000/auth/google/callback"
}, 
    async (accesstoken : string, refreshtoken : string, profile : Profile, done : any) => {
        const candidateRepository = new CandidateRepository()
        try{
            //find the user with same googleid
            console.log('user id before querying the db', profile.id)
            const candidate = await candidateRepository.findByGoogleId(profile.id)
            console.log('after fetching from passport.ts:::', candidate)
            if(candidate){//already user account exist => login procedure
                console.log('Passport.ts :: Candidate account already exist going to return that user', candidate)
                return done(null, candidate)
            }else if(candidate){//candidate blocked so need information
                console.log('Passport.ts :: Candidate found but blocked by admin')
                return done(null, false)

            }else{
                console.log('Passport.ts :: No users with this google id') // try to inspect use of email 
                if(profile && profile?.emails?.[0]){
                    const candidateSameEmail = await candidateRepository.findByEmail(profile.emails?.[0].value)
                    if(candidateSameEmail){
                        console.log('Passport.ts :: user with same email exist')
                        return done(null, false)
                    }else{
                        console.log('Passport.ts :: No candidate with this email')
                        const validateCandidate = RegisterGoogleAuthCandidateSchema.parse({name:profile.displayName, googleId:profile.id, email:profile?.emails?.[0].value})
                        const candidateModel = createGoogleAutCandidatefromDTO(validateCandidate)
                        const createduser = await candidateRepository.create(candidateModel)
                        const user = await candidateRepository.findByEmail(profile.emails[0].value)
                        console.log('passport.ts :: final user before sending to the routers', user)
                        return done(null, user)
                    }
                }else{
                    return done(null, false)
                }
            }
        }catch(error){
            console.log('Passport.ts :: Error occured while google auth', error)
            return done(error, false)
        }
    }
))