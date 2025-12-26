import { inject, injectable } from 'tsyringe';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterPaginatedDTO from '../../DTOs/recruiter/recruiterPaginated.dto';
import IAdminLoadRecruitersUsecase from '../../interfaces/usecases/admin/IAdminLoadRecruiters.usecase';
import LoadRecruitersDTO from '../../DTOs/admin/loadCompanies.dto';
import { plainToInstance } from 'class-transformer';
import FindRecruitersDBQuery from '../../queries/recruiter.query';
import RecruiterProfilelOverviewDataDTO from '../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

@injectable()
export class AdminLoadRecruitersUsecase implements IAdminLoadRecruitersUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(loadRecruitersDto: LoadRecruitersDTO): Promise<RecruiterPaginatedDTO | null> {
    //change to strict later
    const { search, page, limit, sort, filter, employerStatusFilter, employerTypeFilter } =
      loadRecruitersDto;
    const sortOption: { [key: string]: number } = {
      createdAt: -1,
      companyName: 1,
    };
    let employer_type_filter: string[] = [];
    let employer_status_filter: any = {};
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

    switch (employerTypeFilter) {
      case 'All':
        employer_type_filter = ['self', 'company'];
        break;
      case 'Self':
        employer_type_filter = ['self'];
        break;
      case 'Company':
        employer_type_filter = ['company'];
        break;
      default:
        employer_type_filter = ['self', 'company'];
    }

    switch (employerStatusFilter) {
      case 'All':
        employer_status_filter = {};
        break;
      case 'Suspended':
        employer_status_filter = { isSuspended: true };
        break;
      case 'Closed':
        employer_status_filter = { isDeleted: true };
        break;
      case 'Active':
        employer_status_filter = { isSuspended: { $ne: true }, isDeleted: { $ne: true } };
        break;
      default:
        employer_status_filter = {};
    }

    const findCompanyQuery: FindRecruitersDBQuery = {
      search: search,
      limit: limit,
      page: page,
      employer_type_filter,
      employer_status_filter,
      sortOption: sortOption,
    };
    const result = await this._recruiterRepo.findRecruitersPaginated(findCompanyQuery);

    if (result) {
      const recruiterDto: RecruiterProfilelOverviewDataDTO[] = [];
      result.recruiters.forEach((recruiter: Recruiter) => {
        recruiterDto.push(plainToInstance(RecruiterProfilelOverviewDataDTO, recruiter));
      });
      return {
        recruiters: recruiterDto,
        currentSort: sort,
        page,
        totalPages: result.totalPages,
      };
    }

    return null;
  }
}
