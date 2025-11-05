import LoadJobsAggregatedQueryDTO from "../../../application/DTOs/user/loadJobsAggregatedQuery.dto"

export default function mapToLoadJobsQueryDTOFromRequest(
    data: {
        search: string,
        page: number,
        limit: number
        sortOption: string,
        filter:{
            status: string,
            workMode: string,
            jobType?: string,
            jobLevel?: string
        },
        locationSearch?: string
    }
): LoadJobsAggregatedQueryDTO {
    return {
        search: data.search,
        page: data.page,
        limit: data.limit,
        sortOption: data.sortOption,
        filter:{
            status: data.filter.status,
            workMode: data.filter.workMode,
            jobType: data.filter.jobType,
            jobLevel: data.filter.jobLevel
        },
        locationSearch: data.locationSearch
    
        
    
    }
}