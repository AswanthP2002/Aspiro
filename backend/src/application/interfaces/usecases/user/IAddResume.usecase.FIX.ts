import ResumeDTO, { CreateResumeDTO } from '../../../DTOs/user/resume.dto';

export default interface IAddResumeUseCase {
  execute(addResumeDto: CreateResumeDTO): Promise<ResumeDTO | null>;
}
