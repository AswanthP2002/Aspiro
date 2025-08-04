import Job from "../entities/job";
import IBaseRepo from "./IBaseRepo";
export interface SaveJob {
    acknowledged : boolean
    insertedId : Object
}
export default interface IJobRepo extends IBaseRepo<Job>{
    //create(job : Job) : Promise<SaveJob>
    findCompanyJobsById(id : string) : Promise<Job[]>
    getJobs(search : string, page : number, limit : number, sort? : string, filters? : any) : Promise<any> //change strict later
    searchJobsFromHome(search : string) : Promise<Job[]>
    getJobDetails(id : string) : Promise<any[]>
    blockJob(id : string) : Promise<boolean>
    unblockJob(id : string) : Promise<boolean>
    rejectJob(id : string) : Promise<boolean>
    unrejectJob(id : string) : Promise<boolean>
}