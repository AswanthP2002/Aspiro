import { inject, injectable } from 'tsyringe';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import ILoadCompaniesUseCase from '../../interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import LoadCompaniesDTO from '../../DTOs/admin/loadCompanies.dto';
import FindCompaniesQuery, {
  RecruiterJoinedDateQuery,
  RecruiterNameSortQuery,
} from '../../queries/recruiter.query';
import RecruiterPaginatedDTO from '../../DTOs/recruiter/recruiterPaginated.dto';
import IAdminLoadRecruitersUsecase from '../../interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import LoadRecruitersDTO from '../../DTOs/admin/loadCompanies.dto';

@injectable()
export class AdminLoadRecruitersUsecase implements IAdminLoadRecruitersUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(loadRecruitersDto: LoadRecruitersDTO): Promise<RecruiterPaginatedDTO | null> {
    //change to strict later
    const { search, page, limit, sort, filter } = loadRecruitersDto;
    const sortOption: {[key: string]: number} = {
      createdAt: -1,
      companyName: 1,
    };
    switch (sort) {
      case 'joined-latest':
        sortOption['createdAt'] = -1;
        break;
      case 'joined-oldest':
        sortOption['createdAt'] = 1;
        break;
      case 'name-a-z':
        sortOption['companyName'] = -1;
        break;
      case 'name-z-a':
        sortOption['createdAt'] = -1;
        break;
    }
    const findCompanyQuery: FindCompaniesQuery = {
      search: search,
      limit: limit,
      page: page,
      sortOption: sortOption,
    };
    const result = await this._recruiterRepo.findRecruiters(findCompanyQuery);

    if (result) {
      return {
        recruiters: result,
        currentSort: sortOption,
        page,
        totalPages: result.length,
      };
    }

    return null;
  }
}
