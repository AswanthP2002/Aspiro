import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import IAdminLoadRecruiterDetailsUsecase from '../../interfaces/usecases/admin/IAdminLoadRecruiterDetails.usecase';
import { AdminRecruiterDetailsDTO } from '../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';

@injectable()
export default class AdminLoadRecruiterDetailsUsecase implements IAdminLoadRecruiterDetailsUsecase {
  constructor(
    @inject('RecruiterMapper') private _mapper: RecruiterMapper,
    @inject('IRecruiterRepository') private _repo: IRecruiterRepo
  ) {}

  async execute(recruiterId: string): Promise<AdminRecruiterDetailsDTO | null> {
    console.log('recruiter id====', recruiterId);
    const result = await this._repo.getRecruiterAggregatedDetailsById(recruiterId);
    console.log('result from the repo', result);
    if (result) {
      return this._mapper.recruiterProfileOverviewToAdminRecruiterDetailsDTO(result);
    }

    return null;
  }
}
