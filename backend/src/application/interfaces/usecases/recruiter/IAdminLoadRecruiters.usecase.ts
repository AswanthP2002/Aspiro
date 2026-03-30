import LoadRecruitersDTO from '../../../DTOs/company/loadCompanies.dto';
import RecruiterPaginatedDTO from '../../../DTOs/recruiter/recruiterPaginated.dto';

export default interface IAdminLoadRecruitersUsecase {
  execute(loadRecruitersDto: LoadRecruitersDTO): Promise<RecruiterPaginatedDTO | null>;
}
