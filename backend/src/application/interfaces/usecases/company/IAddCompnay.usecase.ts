import CompanyDTO, { AddCompanyDTO } from '../../../DTOs/company/company.dto';

export default interface IAddCompanyUsecase {
  execute(dto: AddCompanyDTO): Promise<CompanyDTO | null>;
}
