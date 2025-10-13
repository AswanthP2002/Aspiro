import LoadJobDTO, { LoadJobResDTO } from '../../DTOs/loadJob.dto';

export default interface IGetJobsUseCase {
  execute(loadJobsDto: LoadJobDTO): Promise<LoadJobResDTO | null>;
}
