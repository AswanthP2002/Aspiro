import JobApplication from '../entities/candidate/jobApplication.entity';
import JobApplicationAggregated from '../entities/candidate/jobApplicationAggregated.entity';
import ApplicationDetailsAggregated from '../entities/recruiter/jobApplicationDetailsAggregated.entity';
import ApplicationsAggregated from '../entities/recruiter/jobApplicationsAggregated.entity';
import IBaseRepo from './IBaseRepo';

export default interface IJobApplicationRepo extends IBaseRepo<JobApplication> {
  //saveJobApplication(jobApplication : JobApplication) : Promise<boolean>
  getApplicationsByJobId(
    jobId: string
  ): Promise<ApplicationsAggregated[] | null>;
  rejectJobApplication(applicationId: string): Promise<JobApplication | null>;
  getCandidateSpecificApplications(
    candidateId: string
  ): Promise<JobApplicationAggregated[] | null>;
  getApplicationDetails(
    applicationId: string
  ): Promise<ApplicationDetailsAggregated | null>;
}
