import Job from '../../../domain/entities/job.entity';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ILoadCompanyPostedJobsUseCase from './interface/ILoadCompanyPostedJobs.usecase';

export class LoadCompanyPostedJobs implements ILoadCompanyPostedJobsUseCase {
  constructor(private jobRepo: IJobRepo) {}

  async execute(id: string): Promise<Job[]> {
    const jobs = await this.jobRepo.findCompanyJobsById(id);
    return jobs;
  }
}
