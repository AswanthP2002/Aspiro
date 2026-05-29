import { inject, injectable } from 'tsyringe';
import IVerifyBeforeEditJobUsecase from '../../interfaces/usecases/recruiter/IVerifyBeforeEditJob.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';

@injectable()
export default class VerifyBeforeEditJobUsecase implements IVerifyBeforeEditJobUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(userId: string): Promise<boolean> {
    const recruiterProfile = await this._recruiterRepo.findRecruiterByUserId(userId);
    return recruiterProfile?.allowEditJobs as boolean;
  }
}
