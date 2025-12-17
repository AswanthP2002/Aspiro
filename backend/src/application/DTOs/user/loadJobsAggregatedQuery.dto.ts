export default interface LoadJobsAggregatedQueryDTO {
    search: string,
    page: number,
    limit: number,
    sortOption: string,
    filter:{
        status: string,
        workMode: string,
        jobType?: string,
        jobLevel?: string,
    },
    locationSearch?: string
}