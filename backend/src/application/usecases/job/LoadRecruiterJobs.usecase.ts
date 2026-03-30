import { inject, injectable } from 'tsyringe';
import Job from '../../../domain/entities/job/job.entity';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ILoadRecruiterJobsUsecase from '../../interfaces/usecases/job/ILoadRecruiterJobs.usecase';
import { JobsQuery } from '../../queries/job/jobs.query';
import PaginatedJobsDTO from '../../DTOs/job/paginattedJobsDTO.dto';
import LoadRecruiterJobsDTO from '../../DTOs/job/loadRecruiterJobs.dto';
import JobMapper from '../../mappers/job/Job.mapperClass';
import { MyJobDTO } from '../../DTOs/job/loadJob.dto.FIX';

@injectable()
export class LoadRecruiterJobsUsecase implements ILoadRecruiterJobsUsecase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(loadRecruiterJobsDto: LoadRecruiterJobsDTO): Promise<PaginatedJobsDTO | null> {
    const { recruiterId, search, limit, page, sortOption, filter } = loadRecruiterJobsDto;
    //manage query before making request
    console.log('checking sort option from the usecase', sortOption);
    const sort: { [key: string]: number } = {};
    switch (sortOption) {
      case 'Newest':
        sort['createdAt'] = -1;
        break;
      case 'Oldest':
        sort['createdAt'] = 1;
        break;
      case 'Expiry':
        sort['expiryDate'] = -1;
        break;
      case 'Application-most':
        sort['applicationsCount'] = -1;
        break;
      case 'Application-least':
        sort['applicationsCount'] = 1;
        break;
      default:
        sort['createdAt'] = -1;
        break;
    }

    const filterData: { status: string[]; workMode: string[] } = {
      status: ['draft', 'active', 'expired', 'closed', 'rejected', 'blocked'],
      workMode: ['On-site', 'Remote', 'Hybrid'],
    };
    let jobStatusFilter = ['active', 'draft', 'expired', 'closed', 'rejected', 'blocked'];
    let jobWorkModeFilter = ['On-site', 'Remote', 'Hybrid'];

    if (filter.status && filter.status !== 'all') {
      switch (filter.status) {
        case 'active':
          jobStatusFilter = ['active'];
          break;
        case 'draft':
          jobStatusFilter = ['draft'];
          break;
        case 'expired':
          jobStatusFilter = ['expired'];
          break;
        case 'closed':
          jobStatusFilter = ['closed'];
          break;
        case 'rejected':
          jobStatusFilter = ['rejected'];
          break;
        case 'blocked':
          jobStatusFilter = ['blocked'];
          break;
        default:
          jobStatusFilter = ['draft', 'active', 'expired', 'closed', 'rejected', 'blocked'];
      }
    }

    if (filter.workMode && filter.workMode !== 'all') {
      switch (filter.workMode) {
        case 'On-site':
          jobWorkModeFilter = ['On-site'];
          break;
        case 'Remote':
          jobWorkModeFilter = ['Remote'];
          break;
        case 'Hybrid':
          jobWorkModeFilter = ['Hybrid'];
          break;
        default:
          jobWorkModeFilter = ['On-site', 'Remote', 'Hybrid'];
      }
    }

    //'draft' | 'active' | 'expired' | 'closed' | 'rejected' | 'blocked'

    const dbQuery: JobsQuery = {
      search: search,
      page: page,
      limit: limit,
      skip: (page - 1) * limit,
      sortOption: sort,
      filter: filterData,
      jobWorkModeFilter: jobWorkModeFilter,
      jobStatusFilter: jobStatusFilter,
    };
    const result = await this._jobRepo.getRecruiterJobsByRecruiterId(recruiterId, dbQuery);
    // onst {jobs, totalPages, totalDocs} : {jobs: Job[], totalPages: number, totalDocs: number, page: number} = result

    if (result) {
      const { jobs, totalPages, page } = result;
      const jobsDto: MyJobDTO[] = [];

      jobs.forEach((job: Job) => {
        jobsDto.push(this._mapper.JobToMyJobDTO(job));
      });

      return { jobs: jobsDto, page: page, limit: limit, totalPages: totalPages };
    }
    return null;
  }
}
