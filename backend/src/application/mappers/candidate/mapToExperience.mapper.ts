import Experience from '../../../domain/entities/candidate/experience.entity';
import CreateExperienceDTO from '../../DTOs/candidate/experience.dto';

export default function mapToExperience(dto: CreateExperienceDTO): Experience {
  return {
    candidateId: dto.candidateId,
    role: dto.role,
    organization: dto.organization,
    location: dto.location,
    locationtype: dto.locationtype,
    startdate: dto.startdate,
    enddate: dto.enddate,
    ispresent: dto.ispresent,
    jobtype: dto.jobtype,
  };
}
