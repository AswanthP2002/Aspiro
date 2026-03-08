import { inject, injectable } from 'tsyringe';
import IAdminChangeRecruiterApplicationStatusToUnderReview from '../../interfaces/usecases/admin/IAdminChangeRecruiterApplicationStatusToUnderReview.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';

@injectable()
export default class AdminChangeRecruiterApplicationStatusToUnderReview implements IAdminChangeRecruiterApplicationStatusToUnderReview {
  constructor(
    @inject('IRecruiterRepository') private _repo: IRecruiterRepo,
    @inject('RecruiterMapper') private _mapper: RecruiterMapper
  ) {}

  async execute(applicationId: string): Promise<RecruiterDTO | null> {
    const result = await this._repo.update(applicationId, { profileStatus: 'under-review' });
    if (result) {
      return this._mapper.recruiterToRecruiterDTO(result);
    }

    return null;
  }
}
