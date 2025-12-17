import JobApplicationAggregatedDTO from '../../../DTOs/candidate -LEGACY/jobApplicationAggregated.dto';

export default interface IGetMyApplicationsUsecase {
  execute(candidateId: string): Promise<JobApplicationAggregatedDTO[] | null>;
}
