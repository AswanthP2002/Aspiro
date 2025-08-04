import Job from "../../../../domain/entities/job";

export default interface ISearchJobsFromHomeUseCase {
    execute(search : string) : Promise<Job[]>
}