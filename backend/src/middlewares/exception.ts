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
  let errors: { code: string; message: string } = { code: '', message: '' }; //from any changed to proper structure

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
    case 'USER_SUSPENDED':
      responseMessage =
        'Your Account has been temporarly blocked, check email for further information';
      code = StatusCodes.NOT_ACCEPTABLE;
      break;
    case 'USER_BANNED':
      responseMessage =
        'Your account has been permanently banned due to violation of our community guidelines';
      code = StatusCodes.NOT_ACCEPTABLE;
      break;
    case 'WRONG_PASSWORD':
      responseMessage = 'Incorrect password';
      code = StatusCodes.UNAUTHORIZED;
      errors = {
        code: 'AUTH_FAILED',
        message: 'User entered wrong password',
      };
      break;
    case 'BAD_REQUEST':
      responseMessage = 'Your request contains incorrect data';
      code = StatusCodes.BAD_REQUEST;
      break;

    //jwt based errors
    case 'TokenExpiredError':
      console.log('--Un Authorized Error Occured in Authentication :: TOKEN EXPIRED--');
      responseMessage = 'Your session has expired, please re login';
      code = StatusCodes.UNAUTHORIZED;
      errors = {
        code: 'ACCESS_TOKEN_EXPIRED',
        message: 'Access Token Expired, required refresh',
      };
      break;

    case 'JsonWebTokenError':
      console.log('--Un Authorized Error Occured in Authentication :: JSON WEB TOKEN ERROR--');
      responseMessage = 'Invalid token';
      code = StatusCodes.UNAUTHORIZED;
      errors = {
        code: 'INVALID_ACCESS_TOKEN',
        message: 'Invalid toke or jwt token malformed',
      };
      break;
    default:
      console.log('Internal server error executed', err); 
      responseMessage = 'Internal server error, please try again after some time';
      code = StatusCodes.INTERNAL_SERVER_ERROR;
      break;
  }

  res.status(code).json({ success: false, message: responseMessage, errors: errors });
  return;
}
