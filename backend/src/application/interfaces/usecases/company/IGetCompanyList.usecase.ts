import CompanyDTO from '../../../DTOs/company/company.dto';
export default interface IGetCompanyListUsecase {
  execute(filter?: { industry?: string; location?: string }): Promise<CompanyDTO[] | null>;
}
