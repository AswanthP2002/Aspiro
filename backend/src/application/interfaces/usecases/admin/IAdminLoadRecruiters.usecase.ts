import LoadRecruitersDTO from '../../../DTOs/admin/loadCompanies.dto';
import RecruiterPaginatedDTO from '../../../DTOs/recruiter/recruiterPaginated.dto';

export default interface IAdminLoadRecruitersUsecase {
  execute(loadRecruitersDto: LoadRecruitersDTO): Promise<RecruiterPaginatedDTO | null>;
}
