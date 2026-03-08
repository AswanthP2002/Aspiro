import Education from '../../../domain/entities/user/educations.entity';
import { CreateEducationDTO } from '../../DTOs/user/education.dto.FIX';

export default function mapToEducationFromCreateEducationDTO(
  createEducationDto: CreateEducationDTO
): Education {
  return {
    educationStream: createEducationDto.educationStream,
    educationLevel: createEducationDto.educationLevel,
    institution: createEducationDto.institution,
    location: createEducationDto.location,
    isPresent: createEducationDto.isPresent,
    startYear: createEducationDto.startYear,
    endYear: createEducationDto.endYear,
    userId: createEducationDto.userId,
  };
}
