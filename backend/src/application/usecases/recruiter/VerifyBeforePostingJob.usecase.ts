import { inject, injectable } from 'tsyringe';
import IVerifyBeforePostingJobUsecase from '../../interfaces/usecases/recruiter/IVerifyBeforePostingJob.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';

@injectable()
export default class VerifyBeforePostingJobUsecase implements IVerifyBeforePostingJobUsecase {
  constructor(@inject('IRecruiterRepository') private _repo: IRecruiterRepo) {}

  async execute(userId: string): Promise<boolean> {
    const recruiter = await this._repo.findRecruiterByUserId(userId);
    console.log(
      '-- checking from the backend is recruiter verified or not --',
      recruiter?.isVerified
    );
    if (recruiter && recruiter.isVerified) {
      return true;
    } else {
      return false;
    }
  }
}
