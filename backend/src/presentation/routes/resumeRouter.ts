import express from 'express';
import { container } from 'tsyringe';
import { ResumeController } from '../controllers/resumeController';
import { ResumeApiRoutes } from '../../constants/Apis/resume.api.routes';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { upload } from '../../utilities/multer';
import parsePdf from '../../middlewares/parsePdf';

function CreateResumeRouter() {
  const resumeRouter = express.Router();
  const resumeController = container.resolve(ResumeController);

  resumeRouter.post(
    ResumeApiRoutes.RESUMES.ADD,
    centralizedAuthentication,
    authorization(['user']),
    upload.single('resume'),
    parsePdf,
    resumeController.addResume.bind(resumeController)
  );

  resumeRouter.get(
    ResumeApiRoutes.RESUMES.LOAD,
    centralizedAuthentication,
    authorization(['user']),
    resumeController.loadResume.bind(resumeController)
  );

  resumeRouter.patch(
    ResumeApiRoutes.RESUMES.SET_RESUME_AS_PRIMARY,
    centralizedAuthentication,
    authorization(['user']),
    resumeController.setResumePrimary.bind(resumeController)
  );

  resumeRouter.delete(
    ResumeApiRoutes.RESUMES.DELETE,
    centralizedAuthentication,
    authorization(['user']),
    resumeController.deleteResume.bind(resumeController)
  );

  resumeRouter.post(
    ResumeApiRoutes.RESUMES.ANALYZE_RESUME,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    resumeController.analyzeResume.bind(resumeController)
  )

  resumeRouter.post(
    ResumeApiRoutes.RESUMES.ANALYZE_RESUME_DETAILED,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    resumeController.analyzeResumeDetailed.bind(resumeController)
  )

  return resumeRouter;
}

export default CreateResumeRouter;
