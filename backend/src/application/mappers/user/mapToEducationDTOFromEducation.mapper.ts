import Education from '../../../domain/entities/user/educations.entity';
import { EducationDTO } from '../../DTOs/user/education.dto';

export default function mapToEducationDTOFromEducation(
  education: Education
): EducationDTO {
  return {
    _id: education._id,
    educationStream: education.educationStream,
    educationLevel: education.educationLevel,
    institution: education.institution,
    location: education.location,
    isPresent: education.isPresent,
    startYear: education.startYear,
    endYear: education.endYear,
    userId: education.userId,
    createdAt: education.createdAt,
    updatedAt: education.updatedAt,
  };
}
