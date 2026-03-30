import { inject, injectable } from 'tsyringe';
import ILoadRecruiterRecentJobs from '../../interfaces/usecases/job/ILoadRecruiterRecentJobs.usecase';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import { JobDTO } from '../../DTOs/job/createJob.dto';
import Job from '../../../domain/entities/job/job.entity';
import PaginatedJobsDTO from '../../DTOs/job/paginattedJobsDTO.dto';

@injectable()
export default class LoadRecruiterRecentJobsUsecase implements ILoadRecruiterRecentJobs {
  constructor(@inject('IJobRepository') private _jobRepo: IJobRepo) {}

  async execute(recruiterId: string): Promise<PaginatedJobsDTO | null> {
    const result = await this._jobRepo.getRecruiterRecentJobs(recruiterId);

    if (result) {
      const { jobs, totalPages, page } = result;
      const jobDto: JobDTO[] = [];
      jobs.forEach((job: Job) => {
        jobDto.push(job as JobDTO);
      });

      return {
        jobs: jobDto,
        page: page,
        limit: 10,
        totalPages: totalPages,
      };
    }

    return null;
  }
}
