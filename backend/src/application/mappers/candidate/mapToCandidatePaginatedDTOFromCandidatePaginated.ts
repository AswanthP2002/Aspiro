import CandidatePaginated from "../../../domain/entities/candidate/candidatePaginated";
import CandidatePaginatedDTO from "../../DTOs/candidate/candidatePaginatedDTO";

export default function mapToCandidatePaginatedDTO(candiatePaginated : CandidatePaginated) : CandidatePaginatedDTO {
    return {
        candidates:candiatePaginated.candidates,
        currentPage:candiatePaginated.currentPage,
        totalPages:candiatePaginated.totalPages,
        currentSort:candiatePaginated.currentSort
    }
}