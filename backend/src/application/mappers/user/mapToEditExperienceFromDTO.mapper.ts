import Experience from '../../../domain/entities/user/experience.entity';
import { EditExperienceDTO } from '../../DTOs/user/experience.dto';

export default function mapToEditExperienceFromDTO(
  dto: EditExperienceDTO
): Experience {
  return {
    isPresent: dto.isPresent,
    jobType: dto.jobType,
    location: dto.location,
    workMode: dto.workMode,
    organization: dto.organization,
    jobRole: dto.jobRole,
    startDate: dto.startDate,
    endDate: dto.endDate,
  };
}
