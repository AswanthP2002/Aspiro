import Job from "../entities/job";
export interface SaveJob {
    acknowledged : boolean
    insertedId : Object
}
export default interface IJobRepo {
    create(job : Job) : Promise<SaveJob>
    findCompanyJobsById(id : string) : Promise<Job[]>
    getJobs() : Promise<any[]>
    getJobDetails(id : string) : Promise<any[]>
    blockJob(id : string) : Promise<boolean>
    unblockJob(id : string) : Promise<boolean>
    rejectJob(id : string) : Promise<boolean>
    unrejectJob(id : string) : Promise<boolean>
}