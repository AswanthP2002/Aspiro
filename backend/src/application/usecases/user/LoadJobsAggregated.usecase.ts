import { inject, injectable } from 'tsyringe';
import ILoadJobsAggregatedUsecase from '../../interfaces/usecases/user/IloadJobsAggregated.usecase';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import { LoadJobResDTO } from '../../DTOs/loadJob.dto';
import LoadJobsAggregatedQueryDTO from '../../DTOs/user/loadJobsAggregatedQuery.dto';
import { JobsQuery } from '../../queries/jobs.query';
import { JobAggregatedDTO } from '../../DTOs/user/jobAggregated.dto';
import mapJobAggregatedDataToDTO from '../../mappers/user/mapJobAggregatedDataToDTO.mapper';
import JobAggregatedData from '../../../domain/entities/user/jobAggregated.entity';

@injectable()
export default class LoadJobsAggregatedUsecase implements ILoadJobsAggregatedUsecase {
  constructor(@inject('IJobRepository') private _jobRepo: IJobRepo) {}

  async execute(loadJobQueryDto: LoadJobsAggregatedQueryDTO): Promise<LoadJobResDTO | null> {
    const { search, page, limit, sortOption, filter, locationSearch } = loadJobQueryDto;
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
      case 'Salary-low':
        sort['minSalary'] = 1;
        break;
      case 'Salary-high':
        sort['minSalary'] = -1;
        break;
      default:
        sort['createdAt'] = -1;
        break;
    }

    const filterOption: {
      status: string[];
      workMode: string[];
      jobType: string[];
      jobLevel: string[];
    } = {
      status: ['draft', 'active', 'expired', 'closed', 'rejected', 'blocked'],
      workMode: ['On-site', 'Remote', 'Hybrid'],
      jobType: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
      jobLevel: ['Entry-level', 'Mid-level', 'Senior-level', 'Lead', 'Manager'],
    };

    if (filter.status && filter.status !== 'all') {
      switch (filter.status) {
        case 'active':
          filterOption['status'] = ['active'];
          break;
        case 'draft':
          filterOption['status'] = ['draft'];
          break;
        case 'expired':
          filterOption['status'] = ['expired'];
          break;
        case 'closed':
          filterOption['status'] = ['closed'];
          break;
        case 'rejected':
          filterOption['status'] = ['rejected'];
          break;
        case 'blocked':
          filterOption['status'] = ['blocked'];
          break;
        default:
          filterOption['status'] = ['active', 'draft', 'expired', 'closed', 'rejected', 'blocked'];
          break;
      }
    }

    if (filter.workMode && filter.workMode !== 'all') {
      switch (filter.workMode) {
        case 'On-site':
          filterOption['workMode'] = ['On-site'];
          break;
        case 'Remote':
          filterOption['workMode'] = ['Remote'];
          break;
        case 'Hybrid':
          filterOption['workMode'] = ['Hybrid'];
          break;
        default:
          filterOption['workMode'] = ['On-site', 'Remote', 'Hybrid'];
          break;
      }
    }

    if (filter.jobType && filter.jobType !== 'all') {
      switch (filter.jobType) {
        case 'Full-time':
          filterOption['jobType'] = ['Full-time'];
          break;
        case 'Part-time':
          filterOption['jobType'] = ['Part-time'];
          break;
        case 'Contract':
          filterOption['jobType'] = ['Contract'];
          break;
        case 'Internship':
          filterOption['jobType'] = ['Internship'];
          break;
        case 'Temporary':
          filterOption['jobType'] = ['Temporary'];
          break;
        default:
          filterOption['jobType'] = [
            'Full-time',
            'Part-time',
            'Contract',
            'Internship',
            'Temporary',
          ];
          break;
      }
    }

    if (filter.jobLevel && filter.jobLevel !== 'all') {
      switch (filter.jobLevel) {
        case 'Entry-level':
          filterOption['jobLevel'] = ['Entry-level'];
          break;
        case 'Mid-level':
          filterOption['jobLevel'] = ['Mid-level'];
          break;
        case 'Senior-level':
          filterOption['jobLevel'] = ['Senior-level'];
          break;
        case 'Lead':
          filterOption['jobLevel'] = ['Lead'];
          break;
        case 'Manager':
          filterOption['jobLevel'] = ['Manager'];
          break;
        default:
          filterOption['jobLevel'] = [
            'Entry-level',
            'Mid-level',
            'Senior-level',
            'Lead',
            'Manager',
          ];
          break;
      }
    }

    const dbQuery: JobsQuery = {
      search: search,
      page: page,
      limit: limit,
      skip: (page - 1) * limit,
      sortOption: sort,
      filter: filterOption,
      locationSearch: locationSearch
    };

    const result = await this._jobRepo.getJobs(dbQuery);

    if (result) {
      const { jobs, totalPages, totalDocs, page } = result;
      const dto: JobAggregatedDTO[] = [];

      jobs.forEach((job: JobAggregatedData) => {
        dto.push(mapJobAggregatedDataToDTO(job));
      });

      return {
        jobs: dto,
        totalPages: totalPages,
        page: page,
        currentSort: sortOption,
      };
    }

    return null;
  }
}
