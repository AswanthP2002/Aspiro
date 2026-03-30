import { DeleteResumeDTO } from '../../../DTOs/resume/resume.dto';

export default interface IDeleteResumeUseCase {
  execute(deleteResumeDto: DeleteResumeDTO): Promise<void>;
}
