import { EducationDTO } from '../../../DTOs/education/education.dto.FIX';

export default interface IGetUserEducationsUsecase {
  execute(userId?: string): Promise<EducationDTO[] | null>;
}
