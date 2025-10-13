import ApplicationsAggregatedDTO from '../../../DTOs/recruiter/applicationAgg.dto';

export default interface IGetJobApplicationsUseCase {
  execute(jobId: string): Promise<ApplicationsAggregatedDTO[] | null>;
}
