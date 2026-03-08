import { inject, injectable } from 'tsyringe';
import ILoadJobsUseCase from '../../interfaces/usecases/admin/IAdminLoadJobs.usecase';
import JobMapper from '../../mappers/recruiter/Job.mapperClass';
import { AdminJobsListDTO, AdminLoadJobsDTO } from '../../DTOs/job/loadJob.dto.FIX';
import AdminJobAggregatedEntity from '../../../domain/entities/admin/jobAggregated.entity';
import IJobRepo from '../../../domain/interfaces/IJobRepo';

@injectable()
export default class LoadJobsUseCase implements ILoadJobsUseCase {
  constructor(
    @inject('IJobRepository') private _repo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(
    dto: AdminLoadJobsDTO
  ): Promise<{ jobs: AdminJobsListDTO[]; totalPages: number } | null> {
    const { search, page, limit, jobTypeFilter, statusFilter, reportsCount } = dto;

    let jobStatusFilter = ['active', 'draft', 'expired', 'closed', 'rejected', 'blocked'];
    const jobtypeFilter = ['Full-time', 'Part-time', 'Internship'];

    switch (statusFilter) {
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

    const result = await this._repo.getJobsListForAdmin({
      search,
      limit,
      page,
      jobTypeFilter: jobtypeFilter,
      statusFilter: jobStatusFilter,
      reportsCount,
    });

    if (result) {
      const dto: AdminJobsListDTO[] = [];
      result.jobs.forEach((job: AdminJobAggregatedEntity) => {
        dto.push(this._mapper.jobAggregatedToAdminJobListDTO(job));
      });
      return { jobs: dto, totalPages: result.totalPages };
    }

    return null;
  }

  
}
