import { JobDTO } from '../../../DTOs/job/createJob.dto';

export default interface IBlockJobUseCase {
  execute(id: string): Promise<JobDTO | null>;
}
