import { inject, injectable } from 'tsyringe';
import IAdminLoadAllCompaniesDataUsecase from '../../interfaces/usecases/company/IAdminLoadCompanies.usecase';
import ICompanyRepo from '../../../domain/interfaces/ICompanyRepo';
import AdminCompanyDataDTO from '../../DTOs/company/adminCompanyData.dto';
import CompanyMapper from '../../mappers/company/Company.mapperClass';

@injectable()
export default class AdminLoadAllCompaniesDataUsecase implements IAdminLoadAllCompaniesDataUsecase {
  constructor(
    @inject('ICompanyRepository') private _companyRepo: ICompanyRepo,
    @inject('CompanyMapper') private _mapper: CompanyMapper
  ) {}

  async execute(
    page: number,
    limit: number
  ): Promise<{ companies: AdminCompanyDataDTO[]; totalPages: number } | null> {
    const result = await this._companyRepo.getAllComapniesDataForAdmin(page, limit);
    if (result) {
      const dto: AdminCompanyDataDTO[] = [];
      result.companyData.forEach((data) =>
        dto.push(this._mapper.companyWithJobsAndRecruitersToCompanyDataForAdminDTO(data))
      );

      return { companies: dto, totalPages: result.totalPages };
    }

    return null;
  }
}
