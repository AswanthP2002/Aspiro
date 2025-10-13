import Experience from '../../../domain/entities/candidate/experience.entity';
import { ExperienceDTO } from '../../DTOs/candidate/experience.dto';

export default function mapToExperienceDTO(
  experience: Experience
): ExperienceDTO {
  return {
    _id: experience._id,
    candidateId: experience.candidateId,
    ispresent: experience.ispresent,
    jobtype: experience.jobtype,
    location: experience.location,
    locationtype: experience.locationtype,
    organization: experience.organization,
    role: experience.role,
    startdate: experience.startdate,
    enddate: experience.enddate,
  };
}
