import JobApplication from "../entities/candidate/jobApplication";

export default interface IJobApplicationRepo {
    saveJobApplication(jobApplication : JobApplication) : Promise<boolean>
    getApplicationsByJobId(jobId : string) : Promise<JobApplication[] | any>
}