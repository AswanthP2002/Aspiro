import CompanyDTO from '../../../DTOs/company/company.dto';

export default interface IGetcompaniesBySuggesionUsecase {
  exeucte(name: string): Promise<CompanyDTO[] | null>;
}
