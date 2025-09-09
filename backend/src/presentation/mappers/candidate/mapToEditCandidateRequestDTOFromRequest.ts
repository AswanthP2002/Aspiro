import { EditCandidateDTO } from "../../../application/DTOs/candidate/candidateDTO";
import { EditCandidateRequestDTO } from "../../DTOs/candidate/editCandidateRequestDTO";

export default function mapToEditCandidateDTOFromRequest(requestDto : EditCandidateRequestDTO) : EditCandidateDTO {
    return {
        id:requestDto.id,
        name:requestDto.name,
        role:requestDto.role,
        about:requestDto.about,
        city:requestDto.city,
        district:requestDto.district,
        state:requestDto.state,
        country:requestDto.country  
    }
}