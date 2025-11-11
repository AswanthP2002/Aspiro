import { NextFunction, Request, Response } from 'express'
import {ZodSchema} from 'zod'

export default function Validator(schema: ZodSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body)
            req.body = validatedData
            next()
        } catch (error: unknown) {
            next(error)
        }
    }
}