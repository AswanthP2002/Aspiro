import Resume from '../../entities/user/resume.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IResumeRepo extends IBaseRepo<Resume> {
  findWithCandidateId(id?: string): Promise<Resume[] | null>;
  setResumePrimary(userId: string, resumeId: string): Promise<Resume | null>;
}
