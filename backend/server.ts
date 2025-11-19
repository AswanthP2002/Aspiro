import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import '../backend/src/config/DI.container';
import http from 'http'
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import logger from './src/utilities/logger';
//import candidateRouter from './src/presentation/routes/candidate/candidateRouter'
//import recruiterRouter from './src/presentation/routes/recruiter/recruiterRouter'
//import adminRouter from './src/presentation/routes/admin/adminRouter'
import passport from 'passport';
import './src/config/passport';
//import createCandidateRouter from './src/presentation/routes/userRouter';
import connectToDb from './src/infrastructure/database/connection';
//import createRecruiterRouter from './src/presentation/routes/recruiter/recruiterRouter';
import createAdminRouter from './src/presentation/routes/adminRouter';
import createFollowRouter from './src/presentation/routes/followRouter';
import createPostRouter from './src/presentation/routes/postRouter';
import createChatRouter from './src/presentation/routes/chatRouter';
import exceptionhandle from './src/middlewares/exception';
import CreateOAuthRouter from './src/presentation/routes/oAuthRouter';
import CreateJobRouter from './src/presentation/routes/jobRouter';
import createUserRouter from './src/presentation/routes/userRouter';
// import connectRedis from './src/infrastructure/redis/redisClient';
import createRecruiterRouter from './src/presentation/routes/recruiter/recruiterRouter';
import { initSocket } from './src/infrastructure/socketio/socket';
// import { initalizeSocket } from './src/infrastructure/socketio/chatSocket';

async function main() {
  const app = express();

  dotenv.config();
  app.use(
    cors({
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );

  await connectToDb();
  //connect redis
  //await connectRedis()

  const userRouter = createUserRouter();
  const recruiterRouter = createRecruiterRouter()
  const adminRouter = createAdminRouter();
  const followRouter = createFollowRouter();
  const postRouter = createPostRouter();
  const chatRouter = createChatRouter();
  const oAuthRouter = CreateOAuthRouter();
  const jobRouter = CreateJobRouter();

  const port = process.env.PORT || 5000;
  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url} - User:${req.user ? req.user : 'Guest'}`);
    next();
  });

  // Group all API routes under the /api prefix for better organization
  app.use('/api', userRouter);
  // app.use('/api', authRouter); // Consider moving login/verify routes here
  app.use('/api', recruiterRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api', followRouter);
  app.use('/api', postRouter);
  app.use('/api', chatRouter);
  app.use('/api', oAuthRouter); // OAuth for google signup
  app.use('/api', jobRouter);

  app.use(exceptionhandle); //centralized exception handling

  const expressServer = http.createServer(app)
  initSocket(expressServer)
  // initalizeSocket(expressServer)

  expressServer.listen(port, () => {
    logger.info(`Server started running on port ${port}`);
  }).on('error', (error) => {
    logger.error({ error }, 'Error occurred while starting the server');
    process.exit(1);
  });

  process.on('uncaughtException', (error: unknown) => {
    logger.error({ error }, 'Uncaught Error occured');
    // Consider a graceful shutdown here as well
  });
}

main();
