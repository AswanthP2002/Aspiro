import { inject, injectable } from 'tsyringe';
import IGetcompaniesBySuggesionUsecase from '../../interfaces/usecases/company/IGetCompaniesBySuggession.usecase';
import ICompanyRepo from '../../../domain/interfaces/ICompanyRepo';
import CompanyMapper from '../../mappers/recruiter/Company.mapperClass';
import CompanyDTO from '../../DTOs/recruiter/company.dto';
import Company from '../../../domain/entities/company.entity';

@injectable()
export default class GetCompanySuggesionUsecase implements IGetcompaniesBySuggesionUsecase {
  constructor(
    @inject('ICompanyRepository') private _repo: ICompanyRepo,
    @inject('CompanyMapper') private _mapper: CompanyMapper
  ) {}

  async exeucte(name: string): Promise<CompanyDTO[] | null> {
    const result = await this._repo.findCompaniesByName(name);
    if (result) {
      const dto: CompanyDTO[] = [];
      result.forEach((company: Company) => {
        dto.push(this._mapper.companyEntityToCompanyDTO(company));
      });

      return dto;
    }

    return null;
  }
}
