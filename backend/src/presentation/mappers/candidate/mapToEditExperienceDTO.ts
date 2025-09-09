import { EditExperienceDTO } from "../../../application/DTOs/candidate/experienceDTO";
import EditExperienceRequestDTO from "../../DTOs/candidate/editExperienceRequestDTO";

export default function mapToEditExperienceDTO(dto : EditExperienceRequestDTO) : EditExperienceDTO {
    return {
        role:dto.editableRole,
        organization:dto.editableOrganization,
        jobtype:dto.editableJobType,
        location:dto.editableLocation,
        locationtype:dto.editableLocationType,
        ispresent:dto.editableIsPresent,
        startdate:new Date(dto.editableStartDate),
        enddate:dto.editableEndDate

    }
}