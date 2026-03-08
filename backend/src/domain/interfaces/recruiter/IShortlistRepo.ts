import Shortlist from '../../entities/recruiter/shortlist..GARBAGE.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IShortlistRepo extends IBaseRepo<Shortlist> {
  getShortlistDataAggregated(jobId: string): Promise<Shortlist[]>;
}
