import Education from '../../../domain/entities/education/educations.entity';
import {
  CreateEducationDTO,
  EducationDTO,
  UpdateEducationDTO,
} from '../../DTOs/education/education.dto.FIX';

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
      educationLevel: dto.educationLevel as string,
      educationStream: dto.educationStream as string,
      startYear: dto.startYear,
      isPresent: dto.isPresent as boolean,
      endYear: dto.endYear,
      institution: dto.institution as string,
      location: dto.location as string,
    };
  }

  public educationToEducationDTO(education: Education): EducationDTO {
    return {
      _id: education._id,
      educationLevel: education.educationLevel,
      educationStream: education.educationStream,
      institution: education.institution,
      isPresent: education.isPresent,
      startYear: education.startYear,
      endYear: education.endYear,
      createdAt: education.createdAt,
      updatedAt: education.updatedAt,
      location: education.location,
      userId: education.userId,
    };
  }
}
