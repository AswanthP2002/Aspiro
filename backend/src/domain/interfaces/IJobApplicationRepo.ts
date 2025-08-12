import JobApplication from "../entities/candidate/jobApplication";
import IBaseRepo from "./IBaseRepo";

export default interface IJobApplicationRepo extends IBaseRepo<JobApplication> {
    //saveJobApplication(jobApplication : JobApplication) : Promise<boolean>
    getApplicationsByJobId(jobId : string) : Promise<JobApplication[] | any>
    rejectJobApplication(applicationId : string) : Promise<boolean>
}