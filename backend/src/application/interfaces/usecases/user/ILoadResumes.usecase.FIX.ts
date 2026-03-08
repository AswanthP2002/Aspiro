import ResumeDTO from '../../../DTOs/user/resume.dto';

export default interface ILoadResumeUseCase {
  execute(userId?: string): Promise<ResumeDTO[] | null>;
}
