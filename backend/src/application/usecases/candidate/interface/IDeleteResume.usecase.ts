import { DeleteResumeDTO } from '../../../DTOs/candidate -LEGACY/resume.dto';

export default interface IDeleteResumeUseCase {
  execute(deleteResumeDto: DeleteResumeDTO): Promise<void>;
}
