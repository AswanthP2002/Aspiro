import Interviews from '../../entities/interview/interview.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IInterviewRepo extends IBaseRepo<Interviews> {
  getCandidateInterviewsByCandidateId(candidateId: string): Promise<Interviews[] | null>;
}
