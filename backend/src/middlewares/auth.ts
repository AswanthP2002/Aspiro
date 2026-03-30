import { StatusCodes } from '../presentation/statusCodes';
import { generateToken, verifyToken } from '../services/jwt';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import { UserDAO } from '../infrastructure/database/DAOs/user.dao.refactored';
import mongoose from 'mongoose';
import { UserBannedError, UserBlockedError } from '../domain/errors/AppError';

// export interface Auth extends Request {
//   user?: {
//     id: string;
//     role: string;
//   };
// }

type JWTVerificationResultPayload = {
  id: string;
  name: string;
  role: string;
  email: string;
};

// export interface AdminAuth extends Request {
//   admin: any;
//   candidateId?: string;
// }

export const refreshAccessToken = async (
  req: Request,
  res: Response
  // {next: NextFunction
): Promise<void> => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ success: false, message: 'No refresh token provided' });
  }

  try {
    const decoded = (await verifyToken(refreshToken)) as JWTVerificationResultPayload;

    const accessToken = await generateToken({
      id: decoded?.id,
      email: decoded?.email,
      role: decoded?.role,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'New Access Token issued', accessToken });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error({ error }, 'Error occured  while issuing new access token');
      switch (error.name) {
        case 'TokenExpiredError':
          res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Your session has expired, please login again to continue',
            errors: {
              code: 'REFRESH_TOKEN_EXPIRED',
              message: 'Refresh token expired, please login again',
            },
          });
          break;
        case 'JsonWebTokenError':
          res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid Token, please login again',
            errors: {
              code: 'INVALID_TOKEN',
              message: 'Invalid token, please login again',
            },
          });
          break;
        default:
          logger.error('Token verification failed');
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong, please try again after some time',
          });
      }
    }
  }
};

export const centralizedAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // console.log('Checking auth header for the request -----', req.headers)
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(406).json({
      success: false,
      message: 'No authorization header provided, please login again',
    });
    return;
  }

  try {
    const decoded = (await verifyToken(auth.split(' ')[1])) as JWTVerificationResultPayload;
    const userData = await UserDAO.findById(new mongoose.Types.ObjectId(decoded.id));
    if (userData?.isBlocked) {
      throw new UserBlockedError();
    }
    console.log('-- user not blocked --');
    if (userData?.isBanned) {
      throw new UserBannedError();
    }

    console.log('-- user not banned --');
    req.user = decoded;
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const authorization = (roles: string[]) => {
  // console.log('Entered inside the authorization;;;')
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!roles.includes(req.user.role as string)) {
      console.log('- inside authorization :: failed');
      res.status(StatusCodes.FORBIDEN).json({ success: false, message: 'Forbidden request' });
      return;
    }

    next();
  };
};
