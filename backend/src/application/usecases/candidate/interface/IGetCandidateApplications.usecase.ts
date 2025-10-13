import JobApplicationAggregatedDTO from '../../../DTOs/candidate/jobApplicationAggregated.dto';

export default interface IGetCandidateApplicationsUseCase {
  execute(candidateId: string): Promise<JobApplicationAggregatedDTO[] | null>;
}
