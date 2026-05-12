import { inject, injectable } from 'tsyringe';
import IAdminEditCompanyUsecase from '../../interfaces/usecases/company/IAdminEditCompany.usecase';
import ICompanyRepo from '../../../domain/interfaces/ICompanyRepo';
import CompanyMapper from '../../mappers/company/Company.mapperClass';
import CompanyDTO from '../../DTOs/company/company.dto';
import EditCompanyDTO from '../../DTOs/company/editCompany.dto';

@injectable()
export default class AdminEditCompanyUsecase implements IAdminEditCompanyUsecase {
  constructor(
    @inject('ICompanyRepository') private _companyRepo: ICompanyRepo,
    @inject('CompanyMapper') private _mapper: CompanyMapper
  ) {}

  async execute(dto: EditCompanyDTO): Promise<CompanyDTO | null> {
    const updatableData = this._mapper.editCompanyDTOtoCompanyEntity(dto);
    const result = await this._companyRepo.update(dto._id as string, updatableData);
    if (result) {
      return this._mapper.companyEntityToCompanyDTO(result);
    } else {
      return null;
    }
  }
}
