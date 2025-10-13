import Job from '../../../../domain/entities/job.entity';

export default interface ILoadCompanyPostedJobsUseCase {
  execute(id: string): Promise<Job[]>;
}
