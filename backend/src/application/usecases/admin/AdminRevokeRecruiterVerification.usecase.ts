import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import IAdminRevokeRecruiterVerification from '../../interfaces/usecases/admin/IAdminRevokeRecruiterVerification.usecase';

@injectable()
export default class AdminRevokeRecruiteerVerificationUsecase implements IAdminRevokeRecruiterVerification {
  constructor(@inject('IRecruiterRepository') private _repo: IRecruiterRepo) {}

  async execute(recruiterId: string, action: 'Verified' | 'Revoked'): Promise<RecruiterDTO | null> {
    if (action === 'Revoked') {
      await this._repo.update(recruiterId, {
        isVerified: false,
      });
    } else {
      await this._repo.update(recruiterId, {
        isVerified: true,
      });
    }

    const timelineUpdateResult = await this._repo.updateVerificationTimeLine(recruiterId, action);
    return timelineUpdateResult as RecruiterDTO;
  }
}
