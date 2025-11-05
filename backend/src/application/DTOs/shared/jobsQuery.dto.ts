export interface JobsQueryDTO {
    search: string,
    limit: number,
    skip: number,
    page: number,
    sortOption:string,
    filter:{
        status:string,
        workMode:string
    }
}