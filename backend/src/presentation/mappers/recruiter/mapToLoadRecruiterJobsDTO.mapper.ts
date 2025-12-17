import LoadRecruiterJobsDTO from "../../../application/DTOs/recruiter/loadRecruiterJobs.dto";

export default function mapToLoadRecruiterJobsDTO(
    data: {recruiterId: string, search: string, page: number, limit: number,filter:{status: string, workMode: string}, sortOption: string}
) : LoadRecruiterJobsDTO {
    return {
        recruiterId: data.recruiterId,
        search: data.search,
        page: data.page,
        limit: data.limit,
        sortOption: data.sortOption,
        filter:data.filter
    }
}