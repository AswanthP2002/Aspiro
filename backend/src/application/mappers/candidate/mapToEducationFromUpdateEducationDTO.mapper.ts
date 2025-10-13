import Education from '../../../domain/entities/candidate/educations.entity';
import { UpdateEducationDTO } from '../../DTOs/candidate/education.dto';

export default function mapToEducationFromUpdateEducationDTO(
  updateEducationDto: UpdateEducationDTO
): Education {
  return {
    _id: updateEducationDto._id,
    stream: updateEducationDto.stream,
    level: updateEducationDto.level,
    organization: updateEducationDto.organization,
    location: updateEducationDto.location,
    isPresent: updateEducationDto.isPresent,
    startYear: updateEducationDto.startYear,
    endYear: updateEducationDto.endYear,
  };
}
