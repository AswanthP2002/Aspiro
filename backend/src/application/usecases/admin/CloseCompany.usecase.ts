import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import ICloseCompanyUseCase from './interfaces/ICloseCompany.usecase';

export default class CloseCompanyUseCase implements ICloseCompanyUseCase {
  constructor(private _recruiterRepo: IRecruiterRepo) {}

  async execute(id: string): Promise<boolean> {
    const deleteResult = await this._recruiterRepo.deleteRecruiter(id);
    return deleteResult;
  }
}
