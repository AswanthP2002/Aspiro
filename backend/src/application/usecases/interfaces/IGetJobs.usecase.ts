import LoadJobDTO, { LoadJobResDTO } from '../../DTOs/job/loadJob.dto.FIX';

export default interface IGetJobsUseCase {
  execute(loadJobsDto: LoadJobDTO): Promise<LoadJobResDTO | null>;
}
