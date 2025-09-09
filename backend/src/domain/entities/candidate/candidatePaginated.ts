import Candidate from "./candidates";

export default interface CandidatePaginated {
    candidates:Candidate[],
    currentPage : number
    totalPages : number
    currentSort : string
}