import { injectable } from 'tsyringe';
import SkillSet from '../../domain/entities/skills.entity';
import ISkillSetsRepo from '../../domain/interfaces/ISkillSetsRepo';
import { SkillSetDAO } from '../database/Schemas/adminSkillSet.schema';
import BaseRepository from './baseRepository';
import SkillsLoadQuery from '../../application/queries/skills.query';
import { SkillDAO } from '../database/DAOs/user/skill.dao';

@injectable()
export default class SkillSetRepository extends BaseRepository<SkillSet> implements ISkillSetsRepo {
  constructor() {
    super(SkillSetDAO);
  }

  async loadSkillSets(
    query: SkillsLoadQuery
  ): Promise<{ skills: SkillSet[]; totalPages: number } | null> {
    const { limit, page, search } = query;

    const skip = (page - 1) * limit;

    const result = await SkillSetDAO.aggregate([
      {
        $match: {
          skills: { $regex: new RegExp(search, 'i') },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalDocs = await SkillDAO.aggregate([
      {
        $match: {
          skills: { $regex: new RegExp(search, 'i') },
        },
      },
      { $count: 'totalDocs' },
    ]);

    const totalPages = Math.ceil((totalDocs[0]?.totalDocs ?? 0) / limit) || 0;
    return { skills: result, totalPages };
  }
}
