import { EducationDTO } from '../../../DTOs/candidate/education.dto';

export default interface ILoadEducationsUseCase {
  execute(candidateId?: string): Promise<EducationDTO[] | null>;
}
