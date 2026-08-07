import CompanyDTO from '../../../DTOs/company/company.dto';

export default interface IDeactiveACompanyUsecase {
  execute(companyId: string): Promise<CompanyDTO | null>;
}
