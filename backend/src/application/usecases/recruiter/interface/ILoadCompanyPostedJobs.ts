import Job from "../../../../domain/entities/job";

export default interface ILoadCompanyPostedJobsUseCase {
    execute(id : string) : Promise<Job[]>
}