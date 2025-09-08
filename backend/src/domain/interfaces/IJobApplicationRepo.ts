import JobApplication from "../entities/candidate/jobApplication";
import JobApplicationAggregated from "../entities/candidate/jobApplicationAggregated";
import ApplicationDetailsAggregated from "../entities/recruiter/jobApplicationDetailsAggregated";
import ApplicationsAggregated from "../entities/recruiter/jobApplicationsAggregated";
import IBaseRepo from "./IBaseRepo";

export default interface IJobApplicationRepo extends IBaseRepo<JobApplication> {
    //saveJobApplication(jobApplication : JobApplication) : Promise<boolean>
    getApplicationsByJobId(jobId : string) : Promise<ApplicationsAggregated[] | null>
    rejectJobApplication(applicationId : string) : Promise<JobApplication | null>
    getCandidateSpecificApplications(candidateId : string) : Promise<JobApplicationAggregated[] | null>
    getApplicationDetails(applicationId : string) : Promise<ApplicationDetailsAggregated | null>
}