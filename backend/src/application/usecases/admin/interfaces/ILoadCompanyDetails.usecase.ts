import Recruiter from '../../../../domain/entities/recruiter/recruiter.entity';

export default interface ILoadCompanyDetailsUseCase {
  execute(companyId: string): Promise<Recruiter | null>;
}
