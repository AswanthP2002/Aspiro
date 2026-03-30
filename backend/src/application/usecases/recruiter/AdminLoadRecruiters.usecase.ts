import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import RecruiterPaginatedDTO from '../../DTOs/recruiter/recruiterPaginated.dto';
import IAdminLoadRecruitersUsecase from '../../interfaces/usecases/recruiter/IAdminLoadRecruiters.usecase';
import LoadRecruitersDTO from '../../DTOs/company/loadCompanies.dto';
import FindRecruitersDBQuery from '../../queries/recruiter/recruiter.query';
import { AdminRecruiterListDTO } from '../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';
import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';

@injectable()
export class AdminLoadRecruitersUsecase implements IAdminLoadRecruitersUsecase {
  constructor(
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo,
    @inject('RecruiterMapper') private _mapper: RecruiterMapper
  ) {}

  async execute(loadRecruitersDto: LoadRecruitersDTO): Promise<RecruiterPaginatedDTO | null> {
    const { search, limit, page, recruiterType, employerStatusFilter } = loadRecruitersDto;

    let recruiterTypeFilter: string[] = ['freelance', 'corporate'];
    let recruiterStatusFilter: boolean[] = [true, false];

    switch (recruiterType) {
      case 'all':
        recruiterTypeFilter = ['freelance', 'corporate'];
        break;
      case 'freelance':
        recruiterTypeFilter = ['freelance'];
        break;
      case 'corporate':
        recruiterTypeFilter = ['corporate'];
        break;
      default:
        recruiterTypeFilter = ['freelance', 'corporate'];
    }

    switch (employerStatusFilter) {
      case 'all':
        recruiterStatusFilter = [true, false];
        break;
      case 'verified':
        recruiterStatusFilter = [true];
        break;
      case 'not-verified':
        recruiterStatusFilter = [false];
        break;
      default:
        recruiterStatusFilter = [true, false];
    }

    const findCompanyQuery: FindRecruitersDBQuery = {
      search,
      page,
      limit,
      employer_type_filter: recruiterTypeFilter,
      employer_status_filter: recruiterStatusFilter,
      sortOption: { createdAt: -1 },
    };
    const result = await this._recruiterRepo.findRecruitersPaginated(findCompanyQuery);

    if (result) {
      const recruiterDto: AdminRecruiterListDTO[] = [];
      console.log('-- checking company data of one recruiter --', result.recruiters[0]);
      result.recruiters.forEach((recruiter: RecruiterProfileOverviewData) => {
        recruiterDto.push(this._mapper.recruiterProfileOverviewToAdminRecruiterListDTO(recruiter));
      });
      return {
        recruiters: recruiterDto,
        page,
        totalPages: result.totalPages,
      };
    }

    return null;
  }
}
