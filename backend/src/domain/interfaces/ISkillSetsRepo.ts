import SkillsLoadQuery from '../../application/queries/skills/skills.query';
import SkillSet from '../entities/skill.admin/skills.entity';
import IBaseRepo from './IBaseRepo';

export default interface ISkillSetsRepo extends IBaseRepo<SkillSet> {
  loadSkillSets(query: SkillsLoadQuery): Promise<{ skills: SkillSet[]; totalPages: number } | null>;
  findSkillWithName(name: string): Promise<SkillSet | null>;
}
