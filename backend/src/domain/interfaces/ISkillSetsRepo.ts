import SkillsLoadQuery from '../../application/queries/skills.query';
import SkillSet from '../entities/skills.entity';
import IBaseRepo from './IBaseRepo';

export default interface ISkillSetsRepo extends IBaseRepo<SkillSet> {
  loadSkillSets(query: SkillsLoadQuery): Promise<{ skills: SkillSet[]; totalPages: number } | null>;
}
