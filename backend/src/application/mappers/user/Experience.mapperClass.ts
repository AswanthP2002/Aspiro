import Experience from '../../../domain/entities/user/experience.entity';
import CreateExperienceDTO, {
  EditExperienceDTO,
  ExperienceDTO,
  UpdateExperienceDto,
} from '../../DTOs/user/experience.dto.FIX';

export class ExperienceMapper {
  public dtoToExperience(dto: CreateExperienceDTO): Experience {
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

  public updateExperienceDtoToExperience(dto: EditExperienceDTO): Experience {
    return {
      _id: dto.experienceId,
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

  public experienceToExperienceDTO(experience: Experience): ExperienceDTO {
    return {
      _id: experience._id,
      jobRole: experience.jobRole,
      jobType: experience.jobType,
      isPresent: experience.isPresent,
      startDate: experience.startDate,
      endDate: experience.endDate,
      workMode: experience.workMode,
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,
      location: experience.location,
      organization: experience.organization,
      userId: experience.userId,
    };
  }
}
