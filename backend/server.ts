import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
//import candidateRouter from './src/presentation/routes/candidate/candidateRouter'
import authRouter from './src/presentation/routes/candidate/authRouter'
//import recruiterRouter from './src/presentation/routes/recruiter/recruiterRouter'
//import adminRouter from './src/presentation/routes/admin/adminRouter'
import passport from 'passport'
import './src/config/passport'
import createCandidateRouter from './src/presentation/routes/candidate/candidateRouter'
import { connectDb } from './src/infrastructure/database/connection'
import createRecruiterRouter from './src/presentation/routes/recruiter/recruiterRouter'
import createAdminRouter from './src/presentation/routes/admin/adminRouter'

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

    const db = await connectDb()

    const candidateRouter = await createCandidateRouter(db)
    const recruiterRouter = await createRecruiterRouter(db)
    const adminRouter = await createAdminRouter(db)

    const port = process.env.PORT || 5000
    app.use('/', (req : Request, res : Response, next : NextFunction) => {
        console.log('Request reaced at the backend', req.url)
        next()
    })
    app.use('/', candidateRouter)
    app.use('/', authRouter)
    app.use('/', recruiterRouter)
    app.use('/', adminRouter)
    app.use((err : unknown, req : Request, res : Response, next : NextFunction) => {
        if(err instanceof Error){
            console.error('Something went rong', err)
        }
    })

    try {
        app.listen(port, () => {
        console.log(`Server started running on port ${port}`)
        })
    } catch (error) {
        console.log('error occured', error)
    }

}

main()

