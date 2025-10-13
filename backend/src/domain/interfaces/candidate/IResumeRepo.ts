import Resume from '../../entities/candidate/resume.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IResumeRepo extends IBaseRepo<Resume> {
  //addResume(resume : Resume) : Promise<boolean>
  //loadResumes(candidateId : string) : Promise<Resume[] | null>
  //deleteResume(resumeId : string) : Promise<boolean>
  findWithCandidateId(id?: string): Promise<Resume[] | null>;
}
