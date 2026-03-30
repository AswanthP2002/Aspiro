import { injectable } from 'tsyringe';
import SkillSet from '../../domain/entities/skill.admin/skills.entity';
import ISkillSetsRepo from '../../domain/interfaces/ISkillSetsRepo';
import { SkillSetDAO } from '../database/Schemas/adminSkillSet.schema';
import BaseRepository from './baseRepository';
import SkillsLoadQuery from '../../application/queries/skills/skills.query';

@injectable()
export default class SkillSetRepository extends BaseRepository<SkillSet> implements ISkillSetsRepo {
  constructor() {
    super(SkillSetDAO);
  }

  async loadSkillSets(
    query: SkillsLoadQuery
  ): Promise<{ skills: SkillSet[]; totalPages: number } | null> {
    // console.log('-- load skill repo method triggered--');
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
    // console.log('-- Inspecitng skill before sending to the frontend', skills);
    // console.log('-- Inspecing total pages before sending to the frontend', totalPages);
    return { skills, totalPages };
  }

  async findSkillWithName(name: string): Promise<SkillSet | null> {
    const result = await SkillSetDAO.findOne({ skills: { $regex: new RegExp(`^${name}$`, 'i') } });
    return result;
  }
}

//having problem while loading skills -> geting empty array check
