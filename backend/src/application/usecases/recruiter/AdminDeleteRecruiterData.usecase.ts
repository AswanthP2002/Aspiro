import { inject, injectable } from 'tsyringe';
import { IAdminDeleteRecruiterDataUsecase } from '../../interfaces/usecases/recruiter/IAdminDeleteRecruiterData.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';

@injectable()
export default class AdminDeleteRecruiterDataUsecase implements IAdminDeleteRecruiterDataUsecase {
  constructor(@inject('IRecruiterRepository') private _repo: IRecruiterRepo) {}

  async execute(recruiterId: string): Promise<void> {
    await this._repo.delete(recruiterId);
  }
}
