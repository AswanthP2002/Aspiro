import ResumeDTO, { SetResumePrimaryDTO } from '../../../DTOs/resume/resume.dto';

export default interface ISetResumePrimaryUsecase {
  execute(dto: SetResumePrimaryDTO): Promise<ResumeDTO | null>;
}
