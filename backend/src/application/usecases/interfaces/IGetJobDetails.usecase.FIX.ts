import { LoadJobDetailsDTOForPublic } from '../../DTOs/job/loadJob.dto.FIX';

export default interface IGetJobDetailsUseCase {
  execute(jobId: string): Promise<LoadJobDetailsDTOForPublic | null>;
}
