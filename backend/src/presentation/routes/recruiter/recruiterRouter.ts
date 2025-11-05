import express, { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe';
import RecruiterController from '../../controllers/recruiterController';
import { StatusCodes } from '../../statusCodes';
import { authorization, centralizedAuthentication } from '../../../middlewares/auth';

// const express = require('express');
// import { Request, Response, NextFunction } from 'express';
// import RecruiterController from '../../controllers/recruiter/recruiterController';
// import {
//   authorization,
//   centralizedAuthentication,
//   recruiterAuth,
//   refreshAccessToken,
// } from '../../../middlewares/auth';
// import { StatusCodes } from '../../statusCodes';
// import RecruiterRespository from '../../../infrastructure/repositories/recruiter/recruiterRepository';
// import CandidateRepository from '../../../infrastructure/repositories/candidate/candidateRepository';
// import RegisterRecruiterUseCase from '../../../application/usecases/recruiter/RegisterRecruiter.usecase';
// import VerifyRecruiterUseCase from '../../../application/usecases/recruiter/VerifyRecruiter.usecase';
// import { LoginRecruiterUseCase } from '../../../application/usecases/recruiter/LoginRecruiter.usecase';
// import SaveBasicsUseCase from '../../../application/usecases/recruiter/SaveBasicsRecruiter.usecase';
// import { LoadRecruiterProfileDataUseCase } from '../../../application/usecases/recruiter/LoadRecruiterProfile.usecase';
// import CreateJobUseCase from '../../../application/usecases/recruiter/CreateJob.usecase';
// import JobRepository from '../../../infrastructure/repositories/jobRepository';
// import JObApplicationRepository from '../../../infrastructure/repositories/JobApplicationRepository';
// import { Db } from 'mongodb';
// import NotificationRepository from '../../../infrastructure/repositories/notificationRepository';
// import RejectCandidateUseCase from '../../../application/usecases/recruiter/RejectCandidate.usecase';
// import CreateNotification from '../../../application/usecases/common/useCases/CreateNotification.usecase';
// import ShortlistRepository from '../../../infrastructure/repositories/recruiter/shortlistRepository';
// import FinalizeShortlistUseCase from '../../../application/usecases/recruiter/FinalizeShortlist.usecase';
// import GetFinalizedDataUseCase from '../../../application/usecases/recruiter/GetFinalizedData.usecase';
// import GetJobApplicationsUseCase from '../../../application/usecases/recruiter/GetJobApplications.usecase';
// import GetJobApplicationDetailsUseCase from '../../../application/usecases/recruiter/GetJobApplicationDetails.usecase';
// import { container } from 'tsyringe';

function createRecruiterRouter() {
  const recruiterRouter = express.Router();

  const recruiterController = container.resolve(RecruiterController)

  recruiterRouter.post(
    '/recruiter/create',
    centralizedAuthentication,
    authorization(['user']),
    recruiterController.CreateRecruiter.bind(recruiterController)
  );
  // recruiterRouter.post(
  //   '/recruiter/verify',
  //   recruiterController.verifyRecruiter.bind(recruiterController)
  // );
  // recruiterRouter.post(
  //   '/recruiter/login',
  //   recruiterController.loginRecruiter.bind(recruiterController)
  // );
  // recruiterRouter.post(
  //   '/recruiter/intro/details',
  //   centralizedAuthentication,
  //   authorization(['recruiter']),
  //   testMIddleware
  //   //recruiterController.saveIntroDetailsRecruiter.bind(recruiterController)
  // );
  recruiterRouter.get(
    '/recruiter/profile/overview',
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.loadRecruiterProfileData.bind(recruiterController)
  );
  recruiterRouter.post(
    '/recruiter/job/create',
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.createJob.bind(recruiterController)
  );
  recruiterRouter.put(
    '/recruiter/job/edit',
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.editJob.bind(recruiterController)
  )
  recruiterRouter.delete(
    '/recruiter/job/delete/:jobId',
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.deleteJob.bind(recruiterController)
  )
  
  recruiterRouter.get(
    '/recruiter/jobs',
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    recruiterController.LoadRecruiterJobs.bind(recruiterController)
  )
  // // recruiterRouter.get(
  // //   '/recruiter/job/:jobId/application/details',
  // //   recruiterController.getJobApplications.bind(recruiterController)
  // // );
  // // recruiterRouter.get(
  // //   '/recruiter/application/:applicationId',
  // //   recruiterAuth,
  // //   recruiterController.getJobApplicationDetails.bind(recruiterController)
  // // );
  // // recruiterRouter.patch(
  // //   '/recruiter/reject/application/:applicationId',
  // //   recruiterAuth,
  // //   recruiterController.rejectCandidateJobApplication.bind(recruiterController)
  // // );
  // // // recruiterRouter.post('/recruiter/applications/finalize/:jobId', recruiterAuth, recruiterController.finalizeShortlist.bind(recruiterController))
  // // // recruiterRouter.get('/recruiter/applications/finalize/:jobId', recruiterAuth, recruiterController.getFinalizedShortlistData.bind(recruiterController))
  // // recruiterRouter.post(
  // //   '/recruiter/logout',
  // //   recruiterAuth,
  // //   recruiterController.recruiterLogout.bind(recruiterController)
  // // );

  // // recruiterRouter.get('/recruiter/token/refresh', refreshAccessToken);

  // function testMIddleware(req: Request, res: Response, next: NextFunction) {
  //   function removeEmpty(obj: any) {
  //     return Object.entries(obj)
  //       .filter(([_, v]) => v !== '' && v !== null && v !== undefined)
  //       .reduce((acc: any, [k, v]) => {
  //         acc[k] =
  //           typeof v === 'object' && !Array.isArray(v) ? removeEmpty(v) : v;
  //         return acc;
  //       }, {});
  //   }
  //   console.log('request body', removeEmpty(req.body));

  //   return res
  //     .status(StatusCodes.ACCEPTED)
  //     .json({ success: true, message: 'Testing job creating path' });
  // }

  function testMiddleware(req: Request, res: Response, next: NextFunction){
    console.log('checking request body', req.body)
    next()

  }

  return recruiterRouter;
}

export default createRecruiterRouter;
