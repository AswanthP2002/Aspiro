import Experience from '../../../domain/entities/experience/experience.entity';
import CreateExperienceDTO, {
  EditExperienceDTO,
  ExperienceDTO,
} from '../../DTOs/experience/experience.dto.FIX';

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
      description: dto.description,
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
      endDate: dto.endDate ? new Date(dto.endDate as string) : '',
      description: dto.description,
    };
  }

  public experienceToExperienceDTO(experience: Experience): ExperienceDTO {
    console.log('-- checking upcoming experience from the database --', experience);
    return {
      _id: experience._id,
      jobRole: experience.jobRole,
      jobType: experience.jobType,
      isPresent: experience.isPresent,
      startDate: experience.startDate,
      endDate: experience.endDate as string,
      workMode: experience.workMode,
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,
      location: experience.location,
      organization: experience.organization,
      userId: experience.userId,
      description: experience.description,
    };
  }
}
