import JobApplicationAggregatedDTO from '../../../DTOs/job/jobApplicationAggregated.dto.FIX';

export default interface IGetMyApplicationsUsecase {
  execute(candidateId: string): Promise<JobApplicationAggregatedDTO[] | null>;
}
