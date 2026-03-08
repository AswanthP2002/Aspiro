import Experience from '../../entities/user/experience.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IExperienceRepo extends IBaseRepo<Experience> {
  editExperience(experienceId: string, experience: Partial<Experience>): Promise<Experience | null>;
  findWihUserId(userId: string): Promise<Experience[] | null>;
}
