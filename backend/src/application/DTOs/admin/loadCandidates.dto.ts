export default interface LoadCandidateDTO {
    search : string
     page : number
     limit : number
     sort : string
     filter? : any
}


export interface LoadCandidateResDTO {
        jobs : any
        page  : number
        totalPages : number
        currentSort : string
}