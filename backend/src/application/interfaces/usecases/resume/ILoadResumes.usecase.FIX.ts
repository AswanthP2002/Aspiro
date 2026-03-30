import ResumeDTO from '../../../DTOs/resume/resume.dto';

export default interface ILoadResumeUseCase {
  execute(userId?: string): Promise<ResumeDTO[] | null>;
}
