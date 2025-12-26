import Experience from '../../../domain/entities/user/experience.entity';
import CreateExperienceDTO from '../../DTOs/user/experience.dto.FIX';

export default function mapToExperience(dto: CreateExperienceDTO): Experience {
  return {
    userId: dto.userId?.toString(),
    jobRole: dto.jobRole,
    organization: dto.organization,
    location: dto.location,
    workMode: dto.workMode,
    startDate: dto.startDate,
    endDate: dto.endDate,
    isPresent: dto.isPresent,
    jobType: dto.jobType,
  };
}
