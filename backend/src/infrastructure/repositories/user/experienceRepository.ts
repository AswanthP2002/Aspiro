import mongoose from 'mongoose';
import Experience from '../../../domain/entities/user/experience.entity';
import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import BaseRepository from '../baseRepository';
import { experienceDAO } from '../../database/DAOs/user/candidateExperience.dao';

export default class ExperienceRepository
  extends BaseRepository<Experience>
  implements IExperienceRepo
{
  constructor() {
    super(experienceDAO);
  }

  async editExperience(
    experienceId: string,
    editData: Partial<Experience>
  ): Promise<Experience | null> {
    console.log('Edit expereince request reached here', editData);
    const result = await experienceDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(experienceId) },
      { $set: editData },
      { returnDocument: 'after' }
    );

    return result;
  }

  async findWihUserId(userId: string): Promise<Experience[] | null> {
    const result = await experienceDAO.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return result;
  }
}
