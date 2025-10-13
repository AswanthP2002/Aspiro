import ApplicationDetailsAggregatedDTO from '../../../DTOs/recruiter/applicationDetailsAgg.dto';

export default interface IGetJobApplicationDetailsUseCase {
  execute(
    applicationId: string
  ): Promise<ApplicationDetailsAggregatedDTO | null>;
}
