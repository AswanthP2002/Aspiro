const express = require('express')
import { Request, Response } from "express"
import { registerCandidate, verifyUser } from "../../controllers/candidate/candidateController"

const candidateRouter = express.Router()

candidateRouter.post('/register', (req : Request, res : Response) => registerCandidate(req, res))
candidateRouter.post('/verify', (req : Request, res : Response) => verifyUser(req, res))


export default candidateRouter