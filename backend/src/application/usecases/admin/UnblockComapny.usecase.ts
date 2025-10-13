import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import IUnblockCompanyUseCase from './interfaces/IUnblockCompany.usecase';

export default class UnblockCompanyUseCase implements IUnblockCompanyUseCase {
  constructor(private _recruiterRepo: IRecruiterRepo) {}

  async execute(id: string): Promise<boolean> {
    const result = await this._recruiterRepo.unblockRecruiter(id);
    return result;
  }
}
