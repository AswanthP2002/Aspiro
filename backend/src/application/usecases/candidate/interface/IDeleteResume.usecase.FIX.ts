import { DeleteResumeDTO } from '../../../DTOs/user/resume.dto';

export default interface IDeleteResumeUseCase {
  execute(deleteResumeDto: DeleteResumeDTO): Promise<void>;
}
