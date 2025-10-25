import Skills from '../../entities/user/skills.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ISkillRepo extends IBaseRepo<Skills> {
  //saveSkill(skill : Skills) : Promise<boolean>
  //getSkills(candidateId : string) : Promise<Skills[]>
  //deleteSkill(skillId : string) : Promise<boolean>
  findWithUserId(userId: string): Promise<Skills[] | null>;
}
