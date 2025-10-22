export default interface LoadUsersQueryRequestDTO {
    search : string
    page : number
    limit : number
    sort : string
    filter? : any
}