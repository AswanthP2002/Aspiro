import { injectable, inject } from 'tsyringe';
import IVerifyBeforeManagingApplicationsUsecase from '../../interfaces/usecases/recruiter/IVerifyBeforeManagingApplications.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';

@injectable()
export default class VerifyBeforeManagingApplicationsUsecase implements IVerifyBeforeManagingApplicationsUsecase {
  constructor(@inject('IRecruiterRepository') private _repo: IRecruiterRepo) {}

  async execute(userId: string): Promise<boolean> {
    const recruiterData = await this._repo.findRecruiterByUserId(userId);
    return recruiterData?.allowManageApplications as boolean;
  }
}
