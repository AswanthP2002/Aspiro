import { inject, injectable } from 'tsyringe';
import IDeactiveACompanyUsecase from '../../interfaces/usecases/company/IDeactiveACompany.usecase';
import ICompanyRepo from '../../../domain/interfaces/ICompanyRepo';
import CompanyDTO from '../../DTOs/company/company.dto';
import CompanyMapper from '../../mappers/company/Company.mapperClass';

@injectable()
export default class DeactiveACompanyUsecase implements IDeactiveACompanyUsecase {
  constructor(
    @inject('ICompanyRepository') private _repo: ICompanyRepo,
    @inject('CompanyMapper') private _mapper: CompanyMapper
  ) {}

  async execute(companyId: string): Promise<CompanyDTO | null> {
    const result = await this._repo.update(companyId.toString(), {
      isDeactivated: true,
    });

    if (result) {
      return this._mapper.companyEntityToCompanyDTO(result);
    }

    return null;
  }
}
