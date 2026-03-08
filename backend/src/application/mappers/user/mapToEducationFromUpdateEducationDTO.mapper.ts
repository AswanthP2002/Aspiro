import Education from '../../../domain/entities/user/educations.entity';
import { UpdateEducationDTO } from '../../DTOs/user/education.dto.FIX';

export default function mapToEducationFromUpdateEducationDTO(
  updateEducationDto: UpdateEducationDTO
): Education {
  return {
    _id: updateEducationDto._id,
    educationStream: updateEducationDto.educationStream,
    educationLevel: updateEducationDto.educationLevel,
    institution: updateEducationDto.institution,
    location: updateEducationDto.location,
    isPresent: updateEducationDto.isPresent,
    startYear: updateEducationDto.startYear,
    endYear: updateEducationDto.endYear,
  };
}
