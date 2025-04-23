const express = require('express')
import { Request, Response } from "express"
import { loginUser, registerCandidate, verifyUser } from "../../controllers/candidate/candidateController"

const candidateRouter = express.Router()

candidateRouter.post('/register', (req : Request, res : Response) => registerCandidate(req, res))
candidateRouter.post('/verify', (req : Request, res : Response) => verifyUser(req, res))
candidateRouter.post('/login', (req : Request, res : Response) => loginUser(req, res))


export default candidateRouter