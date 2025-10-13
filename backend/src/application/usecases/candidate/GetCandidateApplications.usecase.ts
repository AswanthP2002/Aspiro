import JobApplicationAggregated from '../../../domain/entities/candidate/jobApplicationAggregated.entity';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import JobApplicationAggregatedDTO from '../../DTOs/candidate/jobApplicationAggregated.dto';
import mapTojobApplicationAggregatedDTOFromAggregatedData from '../../mappers/candidate/mapToJobApplAggrDTOFromJobApplAggreData.mapper';
import IGetCandidateApplicationsUseCase from './interface/IGetCandidateApplications.usecase';

export default class GetCandidateApplicationsUseCase
  implements IGetCandidateApplicationsUseCase
{
  constructor(private _iJobApplicationRepo: IJobApplicationRepo) {}

  async execute(
    candidateId: string
  ): Promise<JobApplicationAggregatedDTO[] | null> {
    const result =
      await this._iJobApplicationRepo.getCandidateSpecificApplications(
        candidateId
      );
    if (result) {
      const dto: JobApplicationAggregatedDTO[] = [];
      result.forEach((application: JobApplicationAggregated) => {
        dto.push(
          mapTojobApplicationAggregatedDTOFromAggregatedData(application)
        );
      });
      return dto;
    }
    return null;
  }
}
