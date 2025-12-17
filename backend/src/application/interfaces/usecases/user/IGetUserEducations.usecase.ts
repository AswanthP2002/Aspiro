import { EducationDTO } from '../../../DTOs/user/education.dto';

export default interface IGetUserEducationsUsecase {
  execute(userId?: string): Promise<EducationDTO[] | null>;
}
