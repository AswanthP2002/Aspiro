import { inject, injectable } from 'tsyringe';
import IAddCertificateUseCase from '../../application/interfaces/usecases/certificate/IAddCertificate.usecase.FIX';
// import { Auth } from '../../middlewares/auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../statusCodes';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import ILoadCertificateUseCase from '../../application/interfaces/usecases/certificate/IGetCeritificates.usecase.FIX';
import IDeleteCertificateUsecase from '../../application/interfaces/usecases/certificate/IDeleteCertificate.usecase';

@injectable()
export default class CertificateController {
  constructor(
    @inject('IAddCertificate') private _addCertificate: IAddCertificateUseCase,
    @inject('ILoadCertificates') private _loadCertificates: ILoadCertificateUseCase,
    @inject('IDeleteCertificateUsecase') private _deleteCertificate: IDeleteCertificateUsecase
  ) {}

  async addCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;

    try {
      if (req.file) {
        const arrayBuffer = req.file.buffer;
        const filePathName = req.file.originalname.split('.')[0];

        const result = await this._addCertificate.execute({
          file: arrayBuffer,
          path: filePathName,
          userId,
          ...req.body,
        });

        res
          .status(StatusCodes.CREATED)
          .json({ success: true, message: StatusMessage.CERTIFICATE.ADD_SUCCESS, result });
        return;
      }
    } catch (error: unknown) {
      next(error);
    }
  }

  async getCertificates(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id as string;

    try {
      const result = await this._loadCertificates.execute(userId);
      res.status(StatusCodes.OK).json({
        success: true,
        message: StatusMessage.CERTIFICATE.FETCH_SUCCESS,
        certificates: result,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cloudinaryPublicId = req.query.cloudinaryPublicId as string;
    const certificateId = req.params.certificateId;

    try {
      await this._deleteCertificate.execute({ certificateId, cloudinaryPublicId });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: StatusMessage.CERTIFICATE.DELETE_SUCCESS });
    } catch (error: unknown) {
      next(error);
    }
  }
}
