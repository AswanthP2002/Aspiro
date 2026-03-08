import { injectable } from 'tsyringe';
import SkillSet from '../../domain/entities/skills.entity';
import ISkillSetsRepo from '../../domain/interfaces/ISkillSetsRepo';
import { SkillSetDAO } from '../database/Schemas/adminSkillSet.schema';
import BaseRepository from './baseRepository';
import SkillsLoadQuery from '../../application/queries/skills.query';

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
      { $match: { skills: { $regex: new RegExp(search, 'i') } } },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalDocs: [{ $count: 'totalDocs' }],
        },
      },
    ]);
    const skills = result[0]?.data;
    const totalPages = Math.ceil(result[0]?.totalDocs[0]?.totalDocs / limit);
    return { skills, totalPages };
  }
}
