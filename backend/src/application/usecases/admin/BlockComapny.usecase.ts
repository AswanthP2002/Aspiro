import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import IBlockCompanyUseCase from './interfaces/IBlockCompany.usecase';

export default class BlockCompanyUseCase implements IBlockCompanyUseCase {
  constructor(private _recruiterRepo: IRecruiterRepo) {}

  async execute(id: string): Promise<boolean> {
    const result = await this._recruiterRepo.blockRecruiter(id);
    return result;
  }
}
