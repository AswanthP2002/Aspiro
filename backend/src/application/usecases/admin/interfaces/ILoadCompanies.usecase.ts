import LoadCompaniesDTO from '../../../DTOs/admin/loadCompanies.dto';
import RecruiterPaginatedDTO from '../../../DTOs/recruiter/recruiterPaginated.dto';

export default interface ILoadCompaniesUseCase {
  execute(
    loadComapniesDto: LoadCompaniesDTO
  ): Promise<RecruiterPaginatedDTO | null>;
}
