import Experience from '../../../domain/entities/candidate/experience.entity';
import { EditExperienceDTO } from '../../DTOs/candidate/experience.dto';

export default function mapToEditExperienceFromDTO(
  dto: EditExperienceDTO
): Experience {
  return {
    ispresent: dto.ispresent,
    jobtype: dto.jobtype,
    location: dto.location,
    locationtype: dto.locationtype,
    organization: dto.organization,
    role: dto.role,
    startdate: dto.startdate,
    enddate: dto.enddate,
  };
}
