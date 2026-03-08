import CompanyDTO from '../../DTOs/recruiter/company.dto';
export default interface IGetCompanyListUsecase {
  execute(filter?: { industry?: string; location?: string }): Promise<CompanyDTO[] | null>;
}
