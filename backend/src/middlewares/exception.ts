import { NextFunction, Request, Response } from 'express';
import AppError from '../domain/errors/AppError';
import { StatusCodes } from '../presentation/statusCodes';

export default function exceptionhandle(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let responseMessage: string;
  let code: number;

  console.error(err.stack);

  switch (err.name) {
    case 'DUPLICATE_MOBILE':
      responseMessage = 'This mobile number is already taken, please use another one';
      code = StatusCodes.CONFLICT;
      break;
    case 'DUPLICATE_EMAIL':
      responseMessage = 'This email is already taken, please use another one';
      code = StatusCodes.CONFLICT;
      break;
    //Another errors
    case 'INVALID_USER':
      responseMessage = 'User not found';
      code = StatusCodes.NOT_FOUND;
      break;
    case 'OTP_EXPIRED':
      responseMessage = 'OTP Expired';
      code = StatusCodes.BAD_REQUEST;
      break;
    case 'WRONG_CREDENTIALS':
      responseMessage = 'Incorrect';
      code = StatusCodes.BAD_REQUEST;
      break;
    case 'BLOCKED_ENTITY':
      responseMessage = 'Your account has been blocked by the admin';
      code = StatusCodes.NOT_ACCEPTABLE;
      break;
    case 'WRONG_PASSWORD':
      responseMessage = 'Incorrect password';
      code = StatusCodes.BAD_REQUEST;
      break;

    //jwt based errors
    case 'TokenExpiredError' :
      responseMessage = 'Your session has expired, please re login'
      code = StatusCodes.UNAUTHORIZED
      break;
    
    case 'JsonWebTokenError':
      console.log('json web token error executed') //debugging
      responseMessage = 'Invalid token'
      code = StatusCodes.UNAUTHORIZED
      break;
    default:
      console.log('Internal server error executed') // debugging
      responseMessage = 'Internal server error, please try again after some time';
      code = StatusCodes.INTERNAL_SERVER_ERROR;
      break;
  }

  res.status(code).json({ success: false, message: responseMessage });
  return;
}
