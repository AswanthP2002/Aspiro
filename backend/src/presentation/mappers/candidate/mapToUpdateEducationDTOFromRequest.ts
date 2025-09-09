import { UpdateEducationDTO } from "../../../application/DTOs/candidate/educationDTO";
import { UpdateEducationRequestDto } from "../../DTOs/candidate/updateEducationRequestDTO";

export default function mapToUpdateEducationDTOFromRequest(requestDto : UpdateEducationRequestDto) : UpdateEducationDTO {
    return {
        _id:requestDto.id,
        stream:requestDto.stream,
        level:requestDto.level,
        organization:requestDto.organization,
        location:requestDto.location,
        isPresent:requestDto.isPresent,
        startYear:requestDto.startYear,
        endYear:requestDto.endYear
    }
}