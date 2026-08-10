import { LoadJobDetailsDTOForPublic } from '../../DTOs/job/loadJob.dto';

export default interface IGetJobDetailsUseCase {
  execute(jobId: string): Promise<LoadJobDetailsDTOForPublic | null>;
}
