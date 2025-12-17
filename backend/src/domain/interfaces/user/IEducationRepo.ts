import Education from '../../entities/user/educations.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IEducationRepo extends IBaseRepo<Education> {
  //addEducation(education : Education) : Promise<boolean>
  //getEducations(candidateID : string) : Promise<Education[]>
  //deleteEducation(educationId : string) : Promise<boolean>
  editEducation(updateEducation: Education): Promise<Education | null>;
  findWithUserId(userId: string): Promise<Education[] | null>;
}
