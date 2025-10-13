import { DeleteResumeDTO } from '../../../DTOs/candidate/resume.dto';

export default interface IDeleteResumeUseCase {
  execute(deleteResumeDto: DeleteResumeDTO): Promise<void>;
}
