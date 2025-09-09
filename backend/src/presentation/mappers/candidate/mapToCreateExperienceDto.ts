import CreateExperienceDTO from "../../../application/DTOs/candidate/experienceDTO";
import addExperienceRequestDTO from "../../DTOs/candidate/addExperienceRequestDTO";

export default function MapToAddExperienceDTO(requestDto : addExperienceRequestDTO) : CreateExperienceDTO {
    return {
        candidateId:requestDto.candidateId,
        role:requestDto.role,
        organization:requestDto.organization,
        jobtype:requestDto.jobtype,
        location:requestDto.location,
        locationtype:requestDto.locationtype,
        ispresent:requestDto.ispresent,
        startdate:requestDto.startdate,
        enddate:requestDto.enddate
    }
}