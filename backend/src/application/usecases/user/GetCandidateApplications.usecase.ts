import JobApplicationAggregated from '../../../domain/entities/user/jobApplicationAggregated.entity';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import JobApplicationAggregatedDTO from '../../DTOs/candidate -LEGACY/jobApplicationAggregated.dto';
import mapTojobApplicationAggregatedDTOFromAggregatedData from '../../mappers/user/mapToJobApplAggrDTOFromJobApplAggreData.mapper';
import { inject, injectable } from 'tsyringe';
import IGetMyApplicationsUsecase from '../../interfaces/usecases/user/IGetMyApplications.usecase';


@injectable()
export default class GetMyApplicationsUsecase implements IGetMyApplicationsUsecase {
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo) {}

  async execute(candidateId: string): Promise<JobApplicationAggregatedDTO[] | null> {
    const result = await this._iJobApplicationRepo.getCandidateSpecificApplications(candidateId);
    if (result) {
      const dto: JobApplicationAggregatedDTO[] = [];
      result.forEach((application: JobApplicationAggregated) => {
        dto.push(mapTojobApplicationAggregatedDTOFromAggregatedData(application));
      });
      return dto;
    }
    return null;
  }
}
