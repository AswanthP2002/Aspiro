import Experience from '../../../domain/entities/user/experience.entity';
import { ExperienceDTO } from '../../DTOs/user/experience.dto';

export default function mapToExperienceDTO(
  experience: Experience
): ExperienceDTO {
  return {
    _id: experience._id,
    userId: experience.userId,
    isPresent: experience.isPresent,
    jobType: experience.jobType,
    location: experience.location,
    workMode: experience.workMode,
    organization: experience.organization,
    jobRole: experience.jobRole,
    startDate: experience.startDate,
    endDate: experience.endDate,
  };
}
