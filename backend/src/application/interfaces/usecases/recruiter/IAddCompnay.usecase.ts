import CompanyDTO, { AddCompanyDTO } from '../../../DTOs/recruiter/company.dto';

export default interface IAddCompanyUsecase {
  execute(dto: AddCompanyDTO): Promise<CompanyDTO | null>;
}
