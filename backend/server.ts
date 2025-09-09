import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from './src/utilities/logger'
//import candidateRouter from './src/presentation/routes/candidate/candidateRouter'
import authRouter from './src/presentation/routes/candidate/authRouter'
//import recruiterRouter from './src/presentation/routes/recruiter/recruiterRouter'
//import adminRouter from './src/presentation/routes/admin/adminRouter'
import passport from 'passport'
import './src/config/passport'
import createCandidateRouter from './src/presentation/routes/candidate/candidateRouter'
import connectToDb from './src/infrastructure/database/connection'
import createRecruiterRouter from './src/presentation/routes/recruiter/recruiterRouter'
import createAdminRouter from './src/presentation/routes/admin/adminRouter'
import createFollowRouter from './src/presentation/routes/followRouter'
import createPostRouter from './src/presentation/routes/postRouter'

async function main(){
    const app = express()

    dotenv.config()
    app.use(cors(
        {
            origin:['http://localhost:5173'],
            methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials:true,
            allowedHeaders:['Content-Type', 'Authorization']
        }
    ))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(cookieParser())
    app.use(passport.initialize())

    await connectToDb()

    const candidateRouter = await createCandidateRouter()
    const recruiterRouter = await createRecruiterRouter()
    const adminRouter = await createAdminRouter()
    const followRouter = await createFollowRouter()
    const postRouter = await createPostRouter()

    const port = process.env.PORT || 5000
    app.use('/', (req : Request, res : Response, next : NextFunction) => {
        logger.info(`${req.method} ${req.url} - User:${req.user ? req.user : "Guest"}`)
        next()
    })
    app.use('/', candidateRouter)
    app.use('/', authRouter)
    app.use('/', recruiterRouter)
    app.use('/', adminRouter)
    app.use('/', followRouter)
    app.use('/', postRouter)
    app.use((err : unknown, req : Request, res : Response, next : NextFunction) => {
        if(err instanceof Error){
            logger.error({err}, 'Something went wrong')
        }
        next()
    })

    try {
        app.listen(port, () => {
        logger.info(`Server started running on port ${port}`)
        })
    } catch (error) {
        logger.error({error},'error occured while starting the server')
    }

    process.on('SIGINT', () => {
        logger.info('Server shutting down...')
        process.exit(0)
    })

    process.on("uncaughtException", (error : unknown) => {
        logger.error({error}, "Uncaught Error occured")
    })

}

main()

