import Certificates from '../../entities/certificate/certificates.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ICertificateRepo extends IBaseRepo<Certificates> {
  findWithCandidateId(id?: string): Promise<Certificates[] | null>;
}
