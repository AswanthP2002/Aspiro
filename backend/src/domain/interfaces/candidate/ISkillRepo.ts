import Skills from '../../entities/candidate/skills.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ISkillRepo extends IBaseRepo<Skills> {
  //saveSkill(skill : Skills) : Promise<boolean>
  //getSkills(candidateId : string) : Promise<Skills[]>
  //deleteSkill(skillId : string) : Promise<boolean>
  findWithCandidateId(id: string): Promise<Skills[] | null>;
}
