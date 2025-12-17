import mongoose from 'mongoose';
import Experience from '../../../domain/entities/user/experience.entity';
import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import { SaveExperience } from '../../../domain/interfaces/user/saveResponses';
import BaseRepository from '../baseRepository';
import { Db } from 'mongodb';
const { ObjectId } = mongoose.Types;
import { experienceDAO } from '../../database/DAOs/user/candidateExperience.dao';

export default class ExperienceRepository
  extends BaseRepository<Experience>
  implements IExperienceRepo
{
  private _collection = 'experience';

  constructor() {
    super(experienceDAO);
  }

  // async addExperience(experience: Experience): Promise<SaveExperience> {
  //     const db = await connectDb()
  //     const result = await db.collection<Experience>(this._collection).insertOne(experience)
  //     return result
  // }

  // async getExperiences(candidateIdd: string): Promise<Experience[]> {
  //     const db = await connectDb()
  //     const result = await db.collection<Experience>(this._collection).find({ candidateId: new ObjectId(candidateIdd) }).sort({startdate:-1}).toArray()
  //     return result
  // }

  // async deleteExperience(experienceId: string): Promise<boolean> {
  //     const db = await connectDb()
  //     const result = await db.collection<Experience>(this._collection).deleteOne({_id:new ObjectId(experienceId)})
  //     return result.acknowledged
  // }

  async editExperience(
    experienceId: string,
    editData: any
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
