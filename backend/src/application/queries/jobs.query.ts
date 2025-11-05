export interface JobsQuery {
    search: string,
    limit: number,
    skip: number,
    page: number,
    sortOption:{[key: string]: number},
    filter:{
        status:string[],
        workMode:string[]
    }
}