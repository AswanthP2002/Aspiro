import {
  CreateEducationDTO,
  EducationDTO,
} from '../../../DTOs/candidate/education.dto';

export default interface IAddEducationUseCase {
  execute(createEducationDto: CreateEducationDTO): Promise<EducationDTO | null>;
}
