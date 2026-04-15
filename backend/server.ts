import 'reflect-metadata';
import '../backend/src/config/DI.container';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from './logger';
import passport from 'passport';
import connectToDb from './src/infrastructure/database/connection';
import createAdminRouter from './src/presentation/routes/adminRouter';
import createFollowRouter from './src/presentation/routes/followRouter';
import createPostRouter from './src/presentation/routes/postRouter';
import createChatRouter from './src/presentation/routes/chatRouter';
import exceptionhandle from './src/middlewares/exception';
import CreateOAuthRouter from './src/presentation/routes/oAuthRouter';
import CreateJobRouter from './src/presentation/routes/jobRouter';
import createUserRouter from './src/presentation/routes/user.router';
//import connectRedis from './src/infrastructure/redis/redisClient';
import createRecruiterRouter from './src/presentation/routes/recruiterRouter';
import { initSocket } from './src/infrastructure/socketio/socket';
import createNotificationRouter from './src/presentation/routes/notificationRouter';
import { connectRedis } from './src/infrastructure/redis/redisClient';
import createCompanyRouter from './src/presentation/routes/companyRouter';
import CreateExperienceRouter from './src/presentation/routes/experienceRouter';
import CreateEducationRouter from './src/presentation/routes/educationRouter';
import CreateSkillRouter from './src/presentation/routes/skillRouter';
import CreateCertificateRouter from './src/presentation/routes/certificateRouter';
import CreateResumeRouter from './src/presentation/routes/resumeRouter';
import CreateWorkModeRouter from './src/presentation/routes/workModeRouter';
import CreateJobLevelRouter from './src/presentation/routes/jobLevelRouter';
import CreateJobTypeRouter from './src/presentation/routes/jobTypeRouter';
import CreateAlertsRouter from './src/presentation/routes/alertsRouter';
import CreateConnectionRouter from './src/presentation/routes/connectionRouter';
import CreatePlanRouter from './src/presentation/routes/planRouter';
import PlanController from './src/presentation/controllers/planController';
import { container } from 'tsyringe';
// import { initalizeSocket } from './src/infrastructure/socketio/chatSocket';

async function main() {
  const app = express();
  const planController = container.resolve(PlanController);
  dotenv.config();
  app.use(
    cors({
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.post(
    '/api/v1/subscriptions/webhook',
    express.raw({ type: 'application/json' }),
    planController.handleWebhook.bind(planController)
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
  //await connectRedis(); closed right now for testing :
  await connectRedis();

  const expressServer = http.createServer(app);
  initSocket(expressServer);

  const userRouter = createUserRouter();
  const recruiterRouter = createRecruiterRouter();
  const adminRouter = createAdminRouter();
  const followRouter = createFollowRouter();
  const postRouter = createPostRouter();
  const chatRouter = createChatRouter();
  const oAuthRouter = CreateOAuthRouter();
  const jobRouter = CreateJobRouter();
  const notificationRouter = createNotificationRouter();
  const companyRouter = createCompanyRouter();
  const experienceRouter = CreateExperienceRouter();
  const educationRouter = CreateEducationRouter();
  const skillRouter = CreateSkillRouter();
  const certificateRouter = CreateCertificateRouter();
  const resumeRouter = CreateResumeRouter();
  const workModeRouter = CreateWorkModeRouter();
  const jobLevelRouter = CreateJobLevelRouter();
  const jobtypeRouter = CreateJobTypeRouter();
  const alertsRouter = CreateAlertsRouter();
  const connectionRouter = CreateConnectionRouter();
  const planRouter = CreatePlanRouter();

  const port = process.env.PORT || 5000;
  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url} - User:${req.user ? req.user : 'Guest'}`);
    next();
  });

  //to automatically log all apis
  //app.use(pinoHttp({ logger }));

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
  app.use('/api', notificationRouter);
  app.use('/api', companyRouter);
  app.use('/api', experienceRouter);
  app.use('/api', educationRouter);
  app.use('/api', skillRouter);
  app.use('/api', certificateRouter);
  app.use('/api', resumeRouter);
  app.use('/api', workModeRouter);
  app.use('/api', jobLevelRouter);
  app.use('/api', jobtypeRouter);
  app.use('/api', alertsRouter);
  app.use('/api', connectionRouter);
  app.use('/api', planRouter);

  app.use(exceptionhandle); //centralized exception handling

  // initalizeSocket(expressServer)

  expressServer
    .listen(port, () => {
      logger.info(`Server started running on port ${port}`);
    })
    .on('error', (error) => {
      logger.error({ error }, 'Error occurred while starting the server');
      process.exit(1);
    });

  process.on('uncaughtException', (error: unknown) => {
    logger.error({ error }, 'Uncaught Error occured');
    // Consider a graceful shutdown here as well
  });
}

main();
