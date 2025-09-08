import { CreateEducationDTO } from "../../../application/DTOs/candidate/educationDTO";
import AddEducationRequestDTO from "../../DTOs/candidate/addEducationRequestDTO";

export default function mapToCreateEducationDTOFromRequest(requestDto : AddEducationRequestDTO) : CreateEducationDTO {
    return {
        candidateId:requestDto.candidateId,
        stream:requestDto.stream,
        level:requestDto.level,
        organization:requestDto.organization,
        location:requestDto.location,
        isPresent:requestDto.isPresent,
        startYear:requestDto.startYear,
        endYear:requestDto.endYear
    }
}