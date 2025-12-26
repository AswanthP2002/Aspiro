import Education from '../../../domain/entities/user/educations.entity';
import { CreateEducationDTO, UpdateEducationDTO } from '../../DTOs/user/education.dto.FIX';

export default class EducationMapper {
  public createEducationDtoToEducation(dto: CreateEducationDTO): Education {
    return {
      userId: dto.userId,
      educationStream: dto.educationStream,
      educationLevel: dto.educationLevel,
      institution: dto.institution,
      isPresent: dto.isPresent,
      location: dto.location,
      startYear: dto.startYear,
      endYear: dto.endYear,
    };
  }

  public updateEducationDtoToEducation(dto: UpdateEducationDTO): Education {
    return {
      _id: dto._id,
      educationLevel: dto.educationLevel,
      educationStream: dto.educationStream,
      startYear: dto.startYear,
      isPresent: dto.isPresent,
      endYear: dto.endYear,
      institution: dto.institution,
      location: dto.location,
    };
  }
}
