import { inject, injectable } from 'tsyringe';
import IAddCompanyUsecase from '../../interfaces/usecases/company/IAddCompnay.usecase';
import ICompanyRepo from '../../../domain/interfaces/ICompanyRepo';
import CompanyDTO, { AddCompanyDTO } from '../../DTOs/company/company.dto';
import CompanyMapper from '../../mappers/company/Company.mapperClass';

@injectable()
export default class AddCompanyUsecase implements IAddCompanyUsecase {
  constructor(
    @inject('ICompanyRepository') private _repo: ICompanyRepo,
    @inject('CompanyMapper') private _mapper: CompanyMapper
  ) {}

  async execute(dto: AddCompanyDTO): Promise<CompanyDTO | null> {
    const newCompany = this._mapper.companyDtoToCompanyEntity(dto);
    const addedCompany = await this._repo.create(newCompany);
    if (addedCompany) {
      return this._mapper.companyEntityToCompanyDTO(addedCompany);
    }

    return null;
  }
}
