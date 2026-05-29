import CompanyDTO from '../../../DTOs/company/company.dto';
import EditCompanyDTO from '../../../DTOs/company/editCompany.dto';

export default interface IAdminEditCompanyUsecase {
  execute(dto: EditCompanyDTO): Promise<CompanyDTO | null>;
}
