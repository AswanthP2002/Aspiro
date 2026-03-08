import { EducationDTO } from '../../../DTOs/user/education.dto.FIX';

export default interface IGetUserEducationsUsecase {
  execute(userId?: string): Promise<EducationDTO[] | null>;
}
