import Job from '../entities/recruiter/job.entity';
import JobAggregated from '../entities/jobAggregated.entity';
import IBaseRepo from './IBaseRepo';
import {
  AdminLoadJobsQuery,
  JobsQuery,
  LoadJobsAggregatedListForPublicQuery,
} from '../../application/queries/jobs.query';
import JobAggregatedData from '../entities/user/jobAggregated.entity';
import AdminJobAggregatedEntity from '../entities/admin/jobAggregated.entity';
import JobListAggregatedForPublic from '../entities/job/jobListAggregatedForPublic.entity';
export interface SaveJob {
  acknowledged: boolean;
  insertedId: object;
}
export default interface IJobRepo extends IBaseRepo<Job> {
  getRecruiterJobsByRecruiterId(
    recruiterId: string,
    dbQuery: JobsQuery
  ): Promise<{ jobs: Job[]; totalPages: number; totalDocs: number; page: number } | null>;
  getJobs(dbQuery: JobsQuery): Promise<{
    jobs: JobAggregatedData[];
    totalPages: number;
    totalDocs: number;
    page: number;
  } | null>; 
  searchJobsFromHome(search: string): Promise<JobAggregated[] | null>;
  getJobDetails(id: string): Promise<JobAggregated | null>;
  blockJob(id: string): Promise<boolean>;
  unblockJob(id: string): Promise<boolean>;
  rejectJob(id: string): Promise<boolean>;
  unrejectJob(id: string): Promise<boolean>;
  incraseApplicationCount(id: string): Promise<Job | null>;
  getRecruiterRecentJobs(
    recruiterId: string
  ): Promise<{ jobs: Job[]; totalPages: number; totalDocs: number; page: number } | null>;
  getJobsListForAdmin(
    query: AdminLoadJobsQuery
  ): Promise<{ jobs: AdminJobAggregatedEntity[]; totalPages: number } | null>;
  getJobDetailsForAdmin(jobId: string): Promise<AdminJobAggregatedEntity | null>;
  getJobListForPublic(
    query: LoadJobsAggregatedListForPublicQuery
  ): Promise<{ jobs: JobListAggregatedForPublic[]; totalPages: number } | null>;
}
