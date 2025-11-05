import { JobDTO } from "./createJob.dto";

export default interface PaginatedJobsDTO {
    jobs: JobDTO[]
    totalPages: number
    limit: number
    page: number
}