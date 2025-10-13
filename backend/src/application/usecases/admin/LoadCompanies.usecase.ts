import { inject, injectable } from 'tsyringe';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import ILoadCompaniesUseCase from './interfaces/ILoadCompanies.usecase';
import LoadCompaniesDTO from '../../DTOs/admin/loadCompanies.dto';
import FindCompaniesQuery, {
  RecruiterJoinedDateQuery,
  RecruiterNameSortQuery,
} from '../../queries/recruiter.query';
import RecruiterPaginatedDTO from '../../DTOs/recruiter/recruiterPaginated.dto';

@injectable()
export class LoadCompaniesUseCase implements ILoadCompaniesUseCase {
  constructor(
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo
  ) {}

  async execute(
    loadCompaniesDto: LoadCompaniesDTO
  ): Promise<RecruiterPaginatedDTO | null> {
    //change to strict later
    const { search, page, limit, sort } = loadCompaniesDto;
    const sortOption: RecruiterJoinedDateQuery & RecruiterNameSortQuery = {
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
