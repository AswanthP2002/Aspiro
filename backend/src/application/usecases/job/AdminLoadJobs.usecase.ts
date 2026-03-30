import { inject, injectable } from 'tsyringe';
import ILoadJobsUseCase from '../../interfaces/usecases/job/IAdminLoadJobs.usecase';
import JobMapper from '../../mappers/job/Job.mapperClass';
import { AdminJobsListDTO, AdminLoadJobsDTO } from '../../DTOs/job/loadJob.dto.FIX';
import AdminJobAggregatedEntity from '../../../domain/entities/job/adminJobAggregated.entity';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import JobType from '../../../domain/entities/jobType/jobType.entity';
// import JObApplicationRepository from '../../../infrastructure/repositories/JobApplicationRepository';

@injectable()
export default class LoadJobsUseCase implements ILoadJobsUseCase {
  constructor(
    @inject('IJobRepository') private _repo: IJobRepo,
    @inject('IJobTypeRepository') private _jobTypeRepo: IJobTypeRepository,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(
    dto: AdminLoadJobsDTO
  ): Promise<{ jobs: AdminJobsListDTO[]; totalPages: number } | null> {
    const { search, page, limit, statusFilter, reportsCount } = dto;

    const jobTypeResult = await this._jobTypeRepo.find();

    let jobStatusFilter = ['active', 'draft', 'expired', 'closed', 'rejected', 'blocked'];
    const jobtypeFilter = jobTypeResult
      ? jobTypeResult.map((jobType: JobType) => jobType.name)
      : ['Full-time', 'Part-time', 'Internship'];

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
      jobTypeFilter: jobtypeFilter as string[],
      statusFilter: jobStatusFilter,
      reportsCount,
    });

    if (result) {
      console.log('-- checking one recruiter details from the job --', result.jobs[0]);
      const dto: AdminJobsListDTO[] = [];
      result.jobs.forEach((job: AdminJobAggregatedEntity) => {
        dto.push(this._mapper.jobAggregatedToAdminJobListDTO(job));
      });
      return { jobs: dto, totalPages: result.totalPages };
    }

    return null;
  }
}
