import { JobDTO } from '../../../DTOs/job/createJob.dto';

export default interface IUnblockJobUseCase {
  execute(id: string): Promise<JobDTO | null>;
}
