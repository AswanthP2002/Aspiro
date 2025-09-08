import Candidate from "../../../domain/entities/candidate/candidates"

export default interface CandidatePaginatedDTO {
    candidates:Candidate[]
    currentPage : number
    totalPages : number
    currentSort : string
}