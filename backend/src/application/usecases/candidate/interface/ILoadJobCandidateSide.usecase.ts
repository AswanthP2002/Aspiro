import LoadJobDTO, { LoadJobResDTO } from '../../../DTOs/loadJob.dto';

export default interface ILoadJobCandidateSideUseCase {
  execute(loadJobDto: LoadJobDTO): Promise<LoadJobResDTO | null>;
}
