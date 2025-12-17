export default interface LoadRecruiterJobsDTO {
    recruiterId: string,
    search: string,
    page: number,
    limit: number,
    sortOption: string,
    filter:{
        status: string,
        workMode: string
    }
}