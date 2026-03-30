import { JobDTO } from '../../../DTOs/job/createJob.dto';

export default interface IAdminToggleFlagJobUsecase {
  execute(jobId: string, action: 'flag' | 'un-flag'): Promise<JobDTO | null>;
}
