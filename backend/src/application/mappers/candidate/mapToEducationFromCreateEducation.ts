import Education from "../../../domain/entities/candidate/educations";
import { CreateEducationDTO } from "../../DTOs/candidate/educationDTO";

export default function mapToEducationFromCreateEducationDTO(createEducationDto : CreateEducationDTO) : Education {
    return {
        stream:createEducationDto.stream,
        level:createEducationDto.level,
        organization:createEducationDto.organization,
        location:createEducationDto.location,
        isPresent:createEducationDto.isPresent,
        startYear:createEducationDto.startYear,
        endYear:createEducationDto.endYear,
        candidateId:createEducationDto.candidateId
    }
}