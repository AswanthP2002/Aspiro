import ResumeDTO from '../../../DTOs/candidate/resume.dto';

export default interface ILoadResumeUseCase {
  execute(candidateId?: string): Promise<ResumeDTO[] | null>;
}
