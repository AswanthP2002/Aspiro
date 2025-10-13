import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import ApplicationsAggregatedDTO from '../../DTOs/recruiter/applicationAgg.dto';
import mapToApplicationAggregatedDTOFromAggregated from '../../mappers/recruiter/mapToApplAggDTOFromApplAggregated.mapper';
import IGetJobApplicationsUseCase from './interface/IGetJobApplications.usecase';

export default class GetJobApplicationsUseCase
  implements IGetJobApplicationsUseCase
{
  constructor(private _iJobApplicationRepo: IJobApplicationRepo) {}

  async execute(jobId: string): Promise<ApplicationsAggregatedDTO[] | null> {
    const result = await this._iJobApplicationRepo.getApplicationsByJobId(
      jobId
    );
    if (result) {
      const dto: ApplicationsAggregatedDTO[] = [];
      result.forEach((application) => {
        dto.push(mapToApplicationAggregatedDTOFromAggregated(application));
      });

      return dto;
    }
    return null;
  }
}
