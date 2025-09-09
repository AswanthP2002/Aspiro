export default interface RejectJobApplicationRequestDTO {
    title:string
    rejector:string
    rejectee:string
    message:string
    relatedId:string
    type:string
}