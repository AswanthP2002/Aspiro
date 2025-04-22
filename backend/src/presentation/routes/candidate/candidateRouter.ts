const express = require('express')
import { Request, Response } from "express"
import { registerCandidate } from "../../controllers/candidate/candidateController"

const candidateRouter = express.Router()

candidateRouter.post('/register', (req : Request, res : Response) => registerCandidate(req, res))


export default candidateRouter