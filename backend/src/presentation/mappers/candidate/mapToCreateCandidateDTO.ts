import CreateCandidateDTO from "../../../application/DTOs/candidate/createCandidateDTO";
import CreateCandidateRequestDTO from "../../DTOs/candidate/createCandidateRequestDTO";

export default function mapToCreateCandidateDTO(requestDto : CreateCandidateRequestDTO) : CreateCandidateDTO {
    return {
        name:requestDto.name,
        email:requestDto.email,
        phone:requestDto.phone,
        password:requestDto.password
    }
}