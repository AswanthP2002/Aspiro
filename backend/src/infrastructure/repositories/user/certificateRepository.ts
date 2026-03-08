import mongoose from 'mongoose';
import Certificates from '../../../domain/entities/user/certificates.entity';
import ICertificateRepo from '../../../domain/interfaces/user/ICertificateRepo';
import BaseRepository from '../baseRepository';
import { CertificateDAO } from '../../database/DAOs/user/certificate.dao';

export default class CertificateRepository
  extends BaseRepository<Certificates>
  implements ICertificateRepo
{
  constructor() {
    super(CertificateDAO);
  }

  async findWithCandidateId(id?: string): Promise<Certificates[] | null> {
    const result = await CertificateDAO.find({
      userId: new mongoose.Types.ObjectId(id),
    });
    return result;
  }
}
