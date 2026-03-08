import Skills from '../../entities/user/skills.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ISkillRepo extends IBaseRepo<Skills> {
  findWithUserId(userId: string): Promise<Skills[] | null>;
}
