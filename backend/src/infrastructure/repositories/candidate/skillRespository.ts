import Skills from '../../../domain/entities/candidate/skills.entity';
import ISkillRepo from '../../../domain/interfaces/candidate/ISkillRepo';
import mongoose, { mongo } from 'mongoose';
import BaseRepository from '../baseRepository';
import { Db } from 'mongodb';
import { SkillDAO } from '../../database/DAOs/candidate/skill.dao';

export default class SkillRepsitory
  extends BaseRepository<Skills>
  implements ISkillRepo
{
  constructor() {
    super(SkillDAO);
  }
  async findWithCandidateId(id: string): Promise<Skills[] | null> {
    const result = await SkillDAO.find({
      candidateId: new mongoose.Types.ObjectId(id),
    });
    return result;
  }
  // async saveSkill(skill: Skills): Promise<boolean> {
  //     const db = await connectDb()
  //     const result = await db.collection<Skills>(this._collection).insertOne(skill)
  //     return result.acknowledged
  // }

  // async getSkills(candidateId: string): Promise<Skills[]> {
  //     const db = await connectDb()
  //     const result = await db.collection<Skills>(this._collection).find({candidateID:new mongoose.Types.ObjectId(candidateId)}).toArray()
  //     return result
  // }

  // async deleteSkill(skillId: string): Promise<boolean> {
  //     const db = await connectDb()
  //     const deleteResult = await db.collection<Skills>(this._collection).deleteOne({_id:new mongoose.Types.ObjectId(skillId)})
  //     return deleteResult.acknowledged
  // }
}
