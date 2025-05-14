import express, { NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import candidateRouter from './src/presentation/routes/candidate/candidateRouter'
import authRouter from './src/presentation/routes/candidate/authRouter'
import recruiterRouter from './src/presentation/routes/recruiter/recruiterRouter'
import passport from 'passport'
import './src/config/passport'

const app = express()

dotenv.config()
app.use(cors(
    {
        origin:['http://localhost:5000', 'http://localhost:5173'],
        methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials:true,
        allowedHeaders:['Content-Type', 'Authorization']
    }
))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize())


const port = process.env.PORT || 5000

app.use('/', candidateRouter)
app.use('/', authRouter)
app.use('/', recruiterRouter)

app.listen(port, () => {
    console.log(`Server started running on port ${port}`)
})
