import CheckCandidateBlockStatusUseCase from '../application/usecases/candidate/CheckCandidateBlockStatus.usecase';
import CandidateRepository from '../infrastructure/repositories/candidate/candidateRepository';
import { StatusCodes } from '../presentation/statusCodes';
import { generateToken, verifyToken } from '../services/jwt';
import { Request, Response, NextFunction } from 'express';
import logger from '../utilities/logger';
import UserRepository from '../infrastructure/repositories/userRepository';

let candidateRepo;
let checkCandidateBlockStatusUC: any;

(async function () {
  candidateRepo = new CandidateRepository();
  const userRepo = new UserRepository();
  checkCandidateBlockStatusUC = new CheckCandidateBlockStatusUseCase(candidateRepo, userRepo);
})();

export interface Auth extends Request {
  user?: any;
}

export interface AdminAuth extends Request {
  admin: any;
  candidateId?: string;
}
// export const candidateAuth = async (req: Auth, res: Response, next: NextFunction) => {
//   try {
//     //check candidate blocked or not??
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       logger.warn('Token is missing or malformed');
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: 'Authorization token is missing or malformed',
//       });
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//       const decod: any = await verifyToken(token);
//       const isBlocked = await checkCandidateBlockStatusUC.execute(decod.id);
//       if (isBlocked)
//         return res.status(StatusCodes.FORBIDEN).json({
//           success: false,
//           message: 'Your account has been blocked by the admin, you will logout shortly..',
//         });
//       req.user = decod;
//       next();
//     } catch (error: any) {
//       switch (error.name) {
//         case 'TokenExpiredError':
//           logger.error({ error }, 'error occured');
//           return res.status(StatusCodes.UNAUTHORIZED).json({
//             success: false,
//             message: 'Session expired, please login again',
//           });
//         case 'JsonWebTokenError':
//           logger.error({ error }, 'error occured');
//           return res.status(StatusCodes.BAD_REQUEST).json({
//             success: false,
//             message: 'Invalid Token, please login again',
//           });
//         default:
//           logger.error({ error }, 'Token verification failed');
//           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message: 'Something went wrong while verifying the token',
//           });
//       }
//     }
//   } catch (error: any) {
//     logger.error({ error }, 'Error occured while authenticating candidate');
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: 'Internal server error, please try again after some time',
//     });
//   }
// };
// export const userAuth = async (req: Auth, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;
//   console.log('token for testing incoming token', token)

//   if (!token) {
//     logger.warn({}, 'No Token');
//     return res.status(StatusCodes.NOT_ACCEPTABLE).json({
//       success: false,
//       message: 'Access denied, no token provided or token malformed',
//     });
//   }

//   try {
//     const decoded = await verifyToken(token.split(' ')[1]);
//     req.user = decoded;
//     next();
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       switch (error.name) {
//         case 'TokenExpiredError':
//           return res.status(StatusCodes.UNAUTHORIZED).json({
//             success: false,
//             message: 'Your session has expired, please re login',
//           });
//         case 'JsonWebTokenError':
//           return res.status(StatusCodes.BAD_REQUEST).json({
//             success: false,
//             message: 'Invalid token, please re login',
//           });
//         default:
//           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message: 'Something went wrong, please try again after some time',
//           });
//       }
//     }
//   }
// };
// export const recruiterAuth = async (req: Auth, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     logger.warn({}, 'NO Token');
//     return res.status(StatusCodes.NOT_ACCEPTABLE).json({
//       success: false,
//       message: 'Access denied, no token provided or token malformed',
//     });
//   }

//   try {
//     const decoded = await verifyToken(token.split(' ')[1]);
//     req.user = decoded;
//     next();
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       switch (error.name) {
//         case 'TokenExpiredError':
//           return res.status(StatusCodes.UNAUTHORIZED).json({
//             success: false,
//             message: 'Your session has expired, please re login',
//           });
//         case 'JsonWebTokenError':
//           return res.status(StatusCodes.BAD_REQUEST).json({
//             success: false,
//             message: 'Invalid token, please re login',
//           });
//         default:
//           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message: 'Something went wrong, please try again after some time',
//           });
//       }
//     }
//   }
// };

// export const adminAuth = async (req: AdminAuth, res: Response, next: NextFunction) => {
//   //get token from authorization
//   const token = req.headers.authorization;

//   //check token existance
//   if (!token) {
//     return res.status(StatusCodes.NOT_ACCEPTABLE).json({
//       success: false,
//       message: 'Access denied, No token provided or token malformed',
//     });
//   }

//   //decode token
//   try {
//     const decoded = await verifyToken(token.split(' ')[1]);
//     req.admin = decoded;
//     next();
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       logger.error({ error }, 'Error occured while authenticating admin');
//       switch (error.name) {
//         case 'TokenExiredError':
//           return res.status(StatusCodes.UNAUTHORIZED).json({
//             success: false,
//             message: 'Your session has expired, please login',
//           });
//         case 'JsonWebTokenError':
//           return res
//             .status(StatusCodes.BAD_REQUEST)
//             .json({ success: false, message: 'Invalid token, please login' });
//         default:
//           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message: 'Something went wrong, please try again after some time',
//           });
//       }
//     }
//   }
// };

export const refreshAccessToken = async (req: Auth, res: Response, next: NextFunction) : Promise<void> => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded: any = await verifyToken(refreshToken);

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
              message: 'Refresh token expired, please login again'
            }
          });
        case 'JsonWebTokenError':
           res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid Token, please login again',
            errors: {
              code: 'INVALID_TOKEN',
              message: 'Invalid token, please login again'
            }
          });
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
  console.log('Checking fresh request------------------------------------------------')
  console.log('checking request headers', req.headers)
  const auth = req.headers.authorization; //access the token from header
  console.log('This is auth', auth);
  if (!auth) {
    console.log('---No authorization header---');
    res.status(406).json({
      success: false,
      message: 'No authorization header provided, please login again',
    });
    return;
  }

  try {
    const decoded = await verifyToken(auth.split(' ')[1]);
    //console.log('Decoded value for debuging', decoded)

    req.user = decoded;
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const authorization = (roles: string[]) => {
  return async (req: Auth, res: Response, next: NextFunction) : Promise<void> => {
    console.log('request reached in the authorization')
    if (!roles.includes(req?.user?.role)) {
      res.status(StatusCodes.FORBIDEN).json({ success: false, message: 'Forbidden request' });
      return;
    }

    next();
  };
};
