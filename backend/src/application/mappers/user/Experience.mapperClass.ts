import Experience from '../../../domain/entities/user/experience.entity';
import { CreateExperienceDto, UpdateExperienceDto } from '../../DTOs/user/experience.dto.FIX';

export class ExperienceMapper {
  public dtoToExperience(dto: CreateExperienceDto): Experience {
    return {
      userId: dto.userId,
      jobRole: dto.jobRole,
      jobType: dto.jobType,
      organization: dto.organization,
      isPresent: dto.isPresent,
      workMode: dto.workMode,
      location: dto.location,
      startDate: dto.startDate,
      endDate: dto.endDate,
    };
  }

  public updateExperienceDtoToExperience(dto: UpdateExperienceDto): Experience {
    return {
      userId: dto.userId,
      jobRole: dto.jobRole,
      jobType: dto.jobType,
      organization: dto.organization,
      isPresent: dto.isPresent,
      workMode: dto.workMode,
      location: dto.location,
      startDate: dto.startDate,
      endDate: dto.endDate,
    };
  }
}
