import Skills from '../../../domain/entities/user/skills.entity';
import ISkillRepo from '../../../domain/interfaces/user/ISkillRepo';
import mongoose from 'mongoose';
import BaseRepository from '../baseRepository';
import { SkillDAO } from '../../database/DAOs/user/skill.dao';

export default class SkillRepsitory
  extends BaseRepository<Skills>
  implements ISkillRepo
{
  constructor() {
    super(SkillDAO);
  }
  async findWithUserId(userId: string): Promise<Skills[] | null> {
    const result = await SkillDAO.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return result;
  }

}
