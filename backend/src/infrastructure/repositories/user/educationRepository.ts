import mongoose from 'mongoose';
import Education from '../../../domain/entities/education/educations.entity';
import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import BaseRepository from '../baseRepository';
import { EducationDAO } from '../../database/DAOs/user/education.dao';

export default class EducationRepository
  extends BaseRepository<Education>
  implements IEducationRepo
{
  constructor() {
    super(EducationDAO);
  }

  async findWithUserId(userId: string): Promise<Education[] | null> {
    const result = await EducationDAO.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return result;
  }

  async editEducation(updateEducation: Education): Promise<Education | null> {
    const result = await EducationDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(updateEducation._id) },
      {
        $set: {
          stream: updateEducation.educationStream,
          level: updateEducation.educationLevel,
          organization: updateEducation.institution,
          location: updateEducation.location,
          isPresent: updateEducation.isPresent,
          startYear: updateEducation.startYear,
          endYear: updateEducation.endYear,
        },
      },
      { returnDocument: 'after' }
    );

    return result;
  }
}
