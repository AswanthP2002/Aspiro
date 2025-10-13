import {
  EducationDTO,
  UpdateEducationDTO,
} from '../../../DTOs/candidate/education.dto';

export default interface IEditEducationUseCase {
  execute(updateEducationDto: UpdateEducationDTO): Promise<EducationDTO | null>;
}
