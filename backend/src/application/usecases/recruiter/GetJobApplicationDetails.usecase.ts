import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import ApplicationDetailsAggregatedDTO from '../../DTOs/recruiter/applicationDetailsAgg.dto';
import mapToApplicationDetailsAggregatedDTO from '../../mappers/recruiter/mapToApplDetailsAggDTO.mapper';
import IGetJobApplicationDetailsUseCase from './interface/IGetJobApplicationDetails.usecase';

export default class GetJobApplicationDetailsUseCase
  implements IGetJobApplicationDetailsUseCase
{
  constructor(private _iJobApplicationRepo: IJobApplicationRepo) {}

  async execute(
    applicationId: string
  ): Promise<ApplicationDetailsAggregatedDTO | null> {
    const result = await this._iJobApplicationRepo.getApplicationDetails(
      applicationId
    );
    if (result) {
      const dto = mapToApplicationDetailsAggregatedDTO(result);
      return dto;
    }
    return null;
  }
}
