import ResumeDTO, { CreateResumeDTO } from '../../../DTOs/candidate -LEGACY/resume.dto';

export default interface IAddResumeUseCase {
  execute(addResumeDto: CreateResumeDTO): Promise<ResumeDTO | null>;
}
