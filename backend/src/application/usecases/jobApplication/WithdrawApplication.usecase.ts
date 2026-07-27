import { inject, injectable } from 'tsyringe';
import IWithdrawApplicationUsecase from '../../interfaces/usecases/jobApplication/IWithdrawApplication.usecase';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';

@injectable()
export default class WithdrawApplicationUsecase implements IWithdrawApplicationUsecase {
  constructor(@inject('IJobApplicationRepository') private _repo: IJobApplicationRepo) {}

  async execute(applicationId: string, reason: string): Promise<void> {
    await this._repo.update(applicationId as string, {
      status: 'withdrawn',
      withdrawReason: reason,
    });
  }
}
