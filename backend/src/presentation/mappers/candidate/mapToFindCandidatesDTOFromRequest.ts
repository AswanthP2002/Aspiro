import { FindCandidatesDTO } from "../../../application/DTOs/candidate/candidateDTO";
import { FindCandidatesRequestDTO } from "../../DTOs/candidate/findCandidatesRequestDTO";

export default function mapToFindCandidatesDTOFromRequest(requestDto : FindCandidatesRequestDTO) : FindCandidatesDTO {
    return {
        search:requestDto.search,
        page:requestDto.page,
        limit:requestDto.limit,
        filter:requestDto.filter,
        sort:requestDto.sort
    }
}