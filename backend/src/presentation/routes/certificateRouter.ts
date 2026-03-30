import express from 'express';
import { container } from 'tsyringe';
import CertificateController from '../controllers/certificateController';
import { CertificateApiRoutes } from '../../constants/Apis/certificate.api.routes';
import { upload } from '../../utilities/multer';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';

function CreateCertificateRouter() {
  const certificateRouter = express.Router();
  const certificateController = container.resolve(CertificateController);

  certificateRouter.post(
    CertificateApiRoutes.CERTIFICATES.ADD,
    upload.single('certificate'),
    centralizedAuthentication,
    authorization(['user']),
    certificateController.addCertificate.bind(certificateController)
  );

  certificateRouter.get(
    CertificateApiRoutes.CERTIFICATES.LOAD,
    centralizedAuthentication,
    authorization(['user']),
    certificateController.getCertificates.bind(certificateController)
  );

  certificateRouter.delete(
    CertificateApiRoutes.CERTIFICATES.DELETE,
    centralizedAuthentication,
    authorization(['user']),
    certificateController.deleteCertificate.bind(certificateController)
  );

  return certificateRouter;
}

export default CreateCertificateRouter;
