import Certificates from '../../entities/user/certificates.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ICertificateRepo extends IBaseRepo<Certificates> {
  //addCertificate(certificate : Certificates) : Promise<boolean>
  //loadCertificates(candidateId : string) : Promise<Certificates[] | null>
  findWithCandidateId(id?: string): Promise<Certificates[] | null>;
}
