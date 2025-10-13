import { LoadJobRes } from '../../application/DTOs/loadJob.dto';
import Job from '../entities/job.entity';
import JobAggregated from '../entities/jobAggregated.entity';
import IBaseRepo from './IBaseRepo';
export interface SaveJob {
  acknowledged: boolean;
  insertedId: Object;
}
export default interface IJobRepo extends IBaseRepo<Job> {
  //create(job : Job) : Promise<SaveJob>
  findCompanyJobsById(id: string): Promise<Job[]>;
  getJobs(
    search: string,
    page: number,
    limit: number,
    sort?: string,
    filters?: any,
    minSalary?: string,
    maxSalary?: string
  ): Promise<LoadJobRes | null>; //change strict later
  searchJobsFromHome(search: string): Promise<JobAggregated[] | null>;
  getJobDetails(id: string): Promise<JobAggregated | null>;
  blockJob(id: string): Promise<boolean>;
  unblockJob(id: string): Promise<boolean>;
  rejectJob(id: string): Promise<boolean>;
  unrejectJob(id: string): Promise<boolean>;
}
