export default interface LoadJobDTO {
    search : string 
    page : number
    limit : number
    sort : string
    filters : any
    minSalary : string
    maxSalary : string
}

export interface LoadJobResDTO {
    jobs : any
    page  : number
    totalPages : number
    currentSort : string
}

export interface LoadJobRes {
    jobs : any
    page : number
    totalPages : number
    currentSort : string
}