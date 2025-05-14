import Job from "../entities/job";
export interface SaveJob {
    acknowledged : boolean
    insertedId : Object
}
export default interface IJobRepo {
    create(job : Job) : Promise<SaveJob>
    findCompanyJobsById(id : string) : Promise<Job[]>
}