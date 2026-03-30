import mongoose from 'mongoose';
import Resume from '../../../domain/entities/resume/resume.entity';
import IResumeRepo from '../../../domain/interfaces/user/IResumeRepo';
import BaseRepository from '../baseRepository';
import { ResumeDAO } from '../../database/DAOs/user/resume.dao';

export default class ResumeRepository extends BaseRepository<Resume> implements IResumeRepo {
  constructor() {
    super(ResumeDAO);
  }
  async findWithCandidateId(id?: string): Promise<Resume[] | null> {
    const result = await ResumeDAO.find({
      userId: new mongoose.Types.ObjectId(id),
    });
    return result;
  }

  async setResumePrimary(userId: string, resumeId: string): Promise<Resume | null> {
    //remove primary from the current primary resume
    await ResumeDAO.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(userId),
        isPrimary: true,
      },
      {
        $set: { isPrimary: false },
      }
    );

    //set new resume primary
    const result = await ResumeDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(resumeId) },
      { $set: { isPrimary: true } },
      { returnDocument: 'after' }
    ).lean();

    return result as Resume | null;
  }
}
