import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterProfileAggregatedDTO } from '../../DTOs/recruiter/recruiterProfileAggregatedData.dto';
import mapToRecruiterAggregatedDTOFromAggregatedData from '../../mappers/recruiter/mapToRecruiterAggregatedDTOFromRecruiterAggregatedData.mapper';
import ILoadRecruiterProfileUseCase from './interface/ILoadRecruiterProfile.usecase';

@injectable()
export class LoadRecruiterProfileDataUseCase
  implements ILoadRecruiterProfileUseCase
{
  constructor(
    @inject('IRecruiterRepository') private recruiterRepo: IRecruiterRepo
  ) {}

  async execute(id: string): Promise<RecruiterProfileAggregatedDTO | null> {
    const recruiterDetails = await this.recruiterRepo.aggregateRecruiterProfile(
      id
    );
    if (recruiterDetails) {
      const dto =
        mapToRecruiterAggregatedDTOFromAggregatedData(recruiterDetails);
      return dto;
    }
    return null;
  }
}
