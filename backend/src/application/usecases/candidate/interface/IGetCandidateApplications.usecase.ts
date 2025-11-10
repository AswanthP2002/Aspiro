import JobApplicationAggregatedDTO from '../../../DTOs/candidate -LEGACY/jobApplicationAggregated.dto';

export default interface IGetCandidateApplicationsUseCase {
  execute(candidateId: string): Promise<JobApplicationAggregatedDTO[] | null>;
}
