import { injectable } from 'tsyringe';
import Interviews from '../../../domain/entities/interview/interview.entity';
import IInterviewRepo from '../../../domain/interfaces/user/IInterviewRepo';
import BaseRepository from '../baseRepository';
import { InterviewDAO } from '../../database/DAOs/user/interview.dao';
import mongoose from 'mongoose';

@injectable()
export default class InterviewRepository
  extends BaseRepository<Interviews>
  implements IInterviewRepo
{
  constructor() {
    super(InterviewDAO);
  }

  async getCandidateInterviewsByCandidateId(candidateId: string): Promise<Interviews[] | null> {
    const result = await InterviewDAO.find({
      candidateId: new mongoose.Types.ObjectId(candidateId),
    });
    return result;
  }
}
