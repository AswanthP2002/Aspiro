import JobApplication from '../entities/user/jobApplication.entity';
import JobApplicationAggregated from '../entities/user/jobApplicationAggregated.entity';
import { SingleJobApplicationDetailsAggregated } from '../entities/recruiter/jobApplicationDetailsAggregated.entity';
import ApplicationsAggregated from '../entities/recruiter/jobApplicationsAggregated.entity';
import IBaseRepo from './IBaseRepo';

export default interface IJobApplicationRepo extends IBaseRepo<JobApplication> {
  getApplicationsByJobId(
    jobId: string,
    search: string,
    page: number,
    limit: number,
    filter: string[]
  ): Promise<{
    applications: ApplicationsAggregated[];
    totalPages: number;
    totalDocs: number;
  } | null>;
  rejectJobApplication(applicationId: string): Promise<JobApplication | null>;
  getCandidateSpecificApplications(
    candidateId: string,
    search: string,
    page: number,
    limit: number,
    status: string[],
    sort: { [key: string]: -1 | 1 }
  ): Promise<{
    applications: JobApplicationAggregated[];
    totalDocs: number;
    totalPages: number;
  } | null>;
  getApplicationDetails(
    applicationId: string
  ): Promise<SingleJobApplicationDetailsAggregated | null>;
  getJobApplicationWithJobIdCandidateId(
    jobId: string,
    candidateId: string
  ): Promise<JobApplication | null>;
}
