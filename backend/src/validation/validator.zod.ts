import { NextFunction, Request, Response } from 'express'
import {ZodSchema} from 'zod'
import { StatusCodes } from '../presentation/statusCodes'

export default function Validator(schema: ZodSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body)
            req.body = validatedData
            next()
        } catch (error: unknown) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success:false,
                    title:'Validation Failed',
                    message:'One or more input fields are invalid',
                    errors:[
                        {
                            code:'MISSING_FIELDS',
                            message:'Incompletion of required fields'
                        },
                        {
                            code:'INVALID_DATA',
                            message:'Data entered, can not be processed by server'
                        },
                        {
                            code:'TOO_SHORT',
                            message:'Data entered is too short'
                        },
                        {
                            code:'TOO_LONG',
                            message:'Data entered is too long'
                        }
                    ]
                })
            
            return

        }
    }
}