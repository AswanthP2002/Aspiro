import { certificateDTO } from '../../../presentation/controllers/dtos/candidate/certificateDTO';
import Certificates from '../../entities/user/certificates.entity';

export default function createCertificatefromDTO(
  dto: certificateDTO
): Certificates {
  return {
    ...dto,
  };
}
