import CompanyDTO from '../../../DTOs/recruiter/company.dto';

export default interface IGetcompaniesBySuggesionUsecase {
  exeucte(name: string): Promise<CompanyDTO[] | null>;
}
