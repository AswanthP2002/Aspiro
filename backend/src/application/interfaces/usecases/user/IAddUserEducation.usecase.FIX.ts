import { CreateEducationDTO, EducationDTO } from '../../../DTOs/user/education.dto.FIX';

export default interface IAddUserEducationUsecase {
  execute(createEducationDto: CreateEducationDTO): Promise<EducationDTO | null>;
}
