import { Request, Response, NextFunction } from 'express'
import pdf from 'pdf-parse'
import { StatusCodes } from '../presentation/statusCodes'

export default async function parsePdf(req: Request, res: Response, next: NextFunction) {
    if (req.file) {
        try {
            const arrayBuffer = req.file.buffer
            const result = await pdf(arrayBuffer)
            if (!result.text.trim()) {
                console.log('text are not accessible')
                return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'This resume is not ats friendly or this might be a converted pdf that is not suitable for better job matching. Please reselect file' })
            }
            console.log('text accessible')
            next()
        } catch (error: unknown) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error, please try again after some time' })
        }
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'Something went wrong'})
    }
    
}