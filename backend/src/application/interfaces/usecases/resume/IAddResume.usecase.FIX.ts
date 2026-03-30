import ResumeDTO, { CreateResumeDTO } from '../../../DTOs/resume/resume.dto';

export default interface IAddResumeUseCase {
  execute(addResumeDto: CreateResumeDTO): Promise<ResumeDTO | null>;
}
