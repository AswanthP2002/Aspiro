import ResumeDTO from '../../../DTOs/candidate -LEGACY/resume.dto';

export default interface ILoadResumeUseCase {
  execute(candidateId?: string): Promise<ResumeDTO[] | null>;
}
