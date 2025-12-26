import { EditExperienceDTO } from '../../../application/DTOs/user/experience.dto.FIX';
import EditExperienceRequestDTO from '../../DTOs/candidate/editExperienceRequestDTO';

export default function mapToEditExperienceDTO(
  dto: EditExperienceRequestDTO
): EditExperienceDTO {
  return {
    experienceId: dto.experienceId,
    jobRole: dto.jobRole,
    organization: dto.organization,
    jobType: dto.jobType,
    location: dto.location,
    workMode: dto.workMode,
    isPresent: dto.isPresent,
    startDate: dto.startDate,
    endDate: dto.endDate,
  };
}
