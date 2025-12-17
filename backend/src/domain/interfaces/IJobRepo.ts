import { LoadJobRes } from '../../application/DTOs/loadJob.dto';
import Job from '../entities/recruiter/job.entity';
import JobAggregated from '../entities/jobAggregated.entity';
import IBaseRepo from './IBaseRepo';
import { JobsQuery } from '../../application/queries/jobs.query';
import JobAggregatedData from '../entities/user/jobAggregated.entity';
export interface SaveJob {
  acknowledged: boolean;
  insertedId: Object;
}
export default interface IJobRepo extends IBaseRepo<Job> {
  //create(job : Job) : Promise<SaveJob>

  getRecruiterJobsByRecruiterId(
    recruiterId: string, dbQuery: JobsQuery
  ): Promise<{jobs: Job[], totalPages: number, totalDocs: number, page: number} | null>;
  getJobs(dbQuery: JobsQuery): Promise<{jobs: JobAggregatedData[], totalPages: number, totalDocs: number, page: number} | null>; //change strict later
  searchJobsFromHome(search: string): Promise<JobAggregated[] | null>;
  getJobDetails(id: string): Promise<JobAggregated | null>;
  blockJob(id: string): Promise<boolean>;
  unblockJob(id: string): Promise<boolean>;
  rejectJob(id: string): Promise<boolean>;
  unrejectJob(id: string): Promise<boolean>;
  incraseApplicationCount(id: string): Promise<Job | null>
  
}
