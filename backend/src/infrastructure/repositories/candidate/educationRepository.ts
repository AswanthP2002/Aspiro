import mongoose from 'mongoose';
import Education from '../../../domain/entities/user/educations.entity';
import IEducationRepo from '../../../domain/interfaces/candidate/IEducationRepo';
import BaseRepository from '../baseRepository';
import { EducationDAO } from '../../database/DAOs/user/education.dao';

export default class EducationRepository
  extends BaseRepository<Education>
  implements IEducationRepo
{
  constructor() {
    super(EducationDAO);
  }
  // private _collection : string
  // constructor(db : Db){
  //     super(db, 'education')
  //     this._collection = 'education'
  // }
  // async addEducation(education: Education): Promise<boolean> {
  //     const db = await connectDb()
  //     const result = await db.collection<Education>(this._collection).insertOne(education)
  //     return result.acknowledged
  // }

  // async getEducations(candidateId : string): Promise<Education[]> {
  //     const db = await connectDb()
  //     const result = await db.collection<Education>(this._collection).find({candidateId:new mongoose.Types.ObjectId(candidateId)}).toArray()
  //     return result

  // }

  // async deleteEducation(educationId: string): Promise<boolean> {
  //     const db = await connectDb()
  //     const result = await db.collection<Education>(this._collection).deleteOne({_id:new mongoose.Types.ObjectId(educationId)})
  //     return result.acknowledged
  // }

  async findWithUserId(userId: string): Promise<Education[] | null> {
    const result = await EducationDAO.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return result;
  }

  async editEducation(updateEducation: Education): Promise<Education | null> {
    console.log('update education id in the repository', updateEducation._id);
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
