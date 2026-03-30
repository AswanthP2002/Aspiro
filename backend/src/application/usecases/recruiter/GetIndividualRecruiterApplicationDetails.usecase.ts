import { inject, injectable } from 'tsyringe';
import IGetIndividualRecruiterApplicationDetailsUsecase from '../../interfaces/usecases/recruiter/IGetIndividualRecruiterApplicationDetails.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';
import { AdminRecruiterApplicationDetailsDTO } from '../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

@injectable()
export default class GetIndividualRecruiterApplicationDetailsUsecase implements IGetIndividualRecruiterApplicationDetailsUsecase {
  constructor(
    @inject('IRecruiterRepository') private _repo: IRecruiterRepo,
    @inject('RecruiterMapper') private _mapper: RecruiterMapper
  ) {}

  async execute(recruiterAppId: string): Promise<AdminRecruiterApplicationDetailsDTO | null> {
    const result = await this._repo.getRecruiterAggregatedDetailsById(recruiterAppId);
    if (result) {
      return this._mapper.recruiterProfileOverviewDataToAdminRecruiterApplDetailsDTO(result);
    }

    return result;
  }
}
