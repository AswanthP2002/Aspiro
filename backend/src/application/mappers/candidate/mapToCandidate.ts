import Candidate from "../../../domain/entities/candidate/candidates";
import CreateCandidateDTO from "../../DTOs/candidate/createCandidateDTO";

export default function mapToCandidate(createCandidateDto : CreateCandidateDTO) : Candidate {
    return {
        name:createCandidateDto.name,
        email:createCandidateDto.email,
        password:createCandidateDto.password,
        phone:createCandidateDto.phone
    }
}