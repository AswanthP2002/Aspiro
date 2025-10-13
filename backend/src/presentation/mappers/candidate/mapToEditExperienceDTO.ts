import { EditExperienceDTO } from '../../../application/DTOs/candidate/experience.dto';
import EditExperienceRequestDTO from '../../DTOs/candidate/editExperienceRequestDTO';

export default function mapToEditExperienceDTO(
  dto: EditExperienceRequestDTO
): EditExperienceDTO {
  return {
    experienceId: dto.experienceId,
    role: dto.editableRole,
    organization: dto.editableOrganization,
    jobtype: dto.editableJobType,
    location: dto.editableLocation,
    locationtype: dto.editableLocationType,
    ispresent: dto.editableIsPresent,
    startdate: dto.editableStartDate,
    enddate: dto.editableEndDate,
  };
}
