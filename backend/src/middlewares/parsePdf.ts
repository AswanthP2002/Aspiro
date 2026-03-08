import { Request, Response, NextFunction } from 'express';
import pdf from 'pdf-parse';
import { StatusCodes } from '../presentation/statusCodes';

export default async function parsePdf(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    try {
      const arrayBuffer = req.file.buffer;
      const result = await pdf(arrayBuffer);
      if (!result.text.trim()) {
        console.log('text are not accessible');
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message:
            'This resume is not ats friendly or this might be a converted pdf that is not suitable for better job matching. Please reselect file',
        });
      }
      console.log('text accessible');
      next();
    } catch (error: unknown) {
      console.log(
        'Error occured while uploadin the resume in the catch block of parser function',
        error instanceof Error ? error.message : null
      );
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'We could not read this PDF properly. Please upload a valid, readable PDF resume.',
      });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Something went wrong' });
  }
}
