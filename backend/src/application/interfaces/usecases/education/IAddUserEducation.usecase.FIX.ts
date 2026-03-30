import { CreateEducationDTO, EducationDTO } from '../../../DTOs/education/education.dto.FIX';

export default interface IAddUserEducationUsecase {
  execute(createEducationDto: CreateEducationDTO): Promise<EducationDTO | null>;
}
