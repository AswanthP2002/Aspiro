import ResumeDTO, { SetResumePrimaryDTO } from '../../../DTOs/user/resume.dto';

export default interface ISetResumePrimaryUsecase {
  execute(dto: SetResumePrimaryDTO): Promise<ResumeDTO | null>;
}
