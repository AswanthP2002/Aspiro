import Education from '../../entities/user/educations.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IEducationRepo extends IBaseRepo<Education> {
  editEducation(updateEducation: Education): Promise<Education | null>;
  findWithUserId(userId: string): Promise<Education[] | null>;
}
