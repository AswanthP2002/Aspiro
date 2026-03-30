import { inject, injectable } from 'tsyringe';
import IAddResumeUseCase from '../../application/interfaces/usecases/resume/IAddResume.usecase.FIX';
// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import ILoadResumeUseCase from '../../application/interfaces/usecases/resume/ILoadResumes.usecase.FIX';
import ISetResumePrimaryUsecase from '../../application/interfaces/usecases/resume/ISetResumePrimary.usecase';
import IDeleteResumeUseCase from '../../application/usecases/candidate/interface/IDeleteResume.usecase.FIX';
import IAnalyzeResumeUsecase from '../../application/interfaces/usecases/AI/IAnalyzeResume.ai.usecase';
import IAnalyzeResumeDetailedUsecase from '../../application/interfaces/usecases/AI/IAnalyzeResumeDetailed.usecase';

@injectable()
export class ResumeController {
  constructor(
    @inject('IAddResumeUsecase') private _addResume: IAddResumeUseCase,
    @inject('ILoadResumeUsecase') private _loadResumes: ILoadResumeUseCase,
    @inject('ISetResumePrimary') private _setResumePrimary: ISetResumePrimaryUsecase,
    @inject('IDeleteResumeUsecase') private _deleteResume: IDeleteResumeUseCase,
    @inject('IAnalyzeResumeUsecase') private _analyzeResume: IAnalyzeResumeUsecase,
    @inject('IAnalyzeResumeDetailsUsecase')
    private _analyzeResumeDetailed: IAnalyzeResumeDetailedUsecase
  ) {}

  async addResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;

    try {
      if (req.file) {
        const resume = req.file.buffer;

        const result = await this._addResume.execute({
          userId,
          file: resume,
          path: req.file.originalname,
          ...req.body,
        });

        if (!result) {
          res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_CREATION_FAILED('Resume'),
          });
          return;
        }

        res.status(StatusCodes.OK).json({
          success: true,
          message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_ADD('Resume'),
          result,
        });
        return;
      }
      console.log('No file found in request for addResume');
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_CREATION_FAILED('Resume'),
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async loadResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;

    try {
      const resumes = await this._loadResumes.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Resumes'),
        resumes,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async setResumePrimary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const resumeId = req.params.resumeId;

      const result = await this._setResumePrimary.execute({ resumeId, userId });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Resume primary status'),
        result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { resumeId } = req.params;
    const cloudinaryPublicId = req.query?.cloudinaryPublicId as string;

    try {
      await this._deleteResume.execute({ cloudinaryPublicId, resumeId });

      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.RESOURCE_MESSAGES.RESOURCE_DELETE('Resume'),
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async analyzeResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // console.log('-- checking resume content from the frontend', req.body.data);
      const result = await this._analyzeResume.execute(req.body.data, req.body.targettedRole);
      res.status(StatusCodes.OK).json({ success: true, message: 'checking flow', result });
    } catch (error) {
      next(error);
    }
  }

  async analyzeResumeDetailed(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // console.log('-- checking resume content from the frontend', req.body.data);
      const result = await this._analyzeResumeDetailed.execute(
        req.body.data,
        req.body.targettedRole
      );
      res.status(StatusCodes.OK).json({ success: true, message: 'checking flow', result });
    } catch (error) {
      next(error);
    }
  }
}
