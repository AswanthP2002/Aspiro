import { inject, injectable } from 'tsyringe';
import ILoadRecruiterRecentJobs from '../../interfaces/usecases/recruiter/ILoadRecruiterRecentJobs.usecase';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import { JobDTO } from '../../DTOs/recruiter/createJob.dto';
import Job from '../../../domain/entities/recruiter/job.entity';
import PaginatedJobsDTO from '../../DTOs/recruiter/paginattedJobsDTO.dto';

@injectable()
export default class LoadRecruiterRecentJobsUsecase implements ILoadRecruiterRecentJobs {
  constructor(@inject('IJobRepository') private _jobRepo: IJobRepo) {}

  async execute(recruiterId: string): Promise<PaginatedJobsDTO | null> {
    const result = await this._jobRepo.getRecruiterRecentJobs(recruiterId);

    if (result) {
      const { jobs, totalPages, totalDocs, page } = result;
      const jobDto: JobDTO[] = [];
      jobs.forEach((job: Job) => {
        jobDto.push(job);
      });

      return {
        jobs: jobDto,
        page: page,
        limit: 10,
        totalPages: totalPages,
      };
    }

    return null 
  }
}
