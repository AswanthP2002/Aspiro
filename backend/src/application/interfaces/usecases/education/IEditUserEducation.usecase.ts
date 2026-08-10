import { EducationDTO, UpdateEducationDTO } from '../../../DTOs/education/education.dto';

export default interface IEditUserEducationUsecase {
  execute(updateEducationDto: UpdateEducationDTO): Promise<EducationDTO | null>;
}
