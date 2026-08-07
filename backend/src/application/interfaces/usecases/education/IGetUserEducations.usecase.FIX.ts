import { EducationDTO } from '../../../DTOs/education/education.dto';

export default interface IGetUserEducationsUsecase {
  execute(userId?: string): Promise<EducationDTO[] | null>;
}
