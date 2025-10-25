import { EducationDTO, UpdateEducationDTO } from '../../../DTOs/user/education.dto';

export default interface IEditUserEducationUsecase {
  execute(updateEducationDto: UpdateEducationDTO): Promise<EducationDTO | null>;
}
