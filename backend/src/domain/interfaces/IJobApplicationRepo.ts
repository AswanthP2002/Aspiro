import JobApplication, {
  JobApplicationCompanyRecruiterAggregated,
} from '../entities/jobApplication/jobApplication.entity';
import JobApplicationAggregated from '../entities/jobApplication/jobApplicationAggregated.entity';
import { SingleJobApplicationDetailsAggregated } from '../entities/jobApplication/jobApplicationDetailsAggregated.entity';
import ApplicationsAggregated from '../entities/jobApplication/jobApplicationsAggregated.entity';
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
    applied?: number;
    screening?: number;
    interview?: number;
    offer?: number;
    hired?: number;
    rejected?: number;
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
  getJobApplicationDetailsCompanyRecruiterCombined(
    applicationId: string
  ): Promise<JobApplicationCompanyRecruiterAggregated | null>;
}
