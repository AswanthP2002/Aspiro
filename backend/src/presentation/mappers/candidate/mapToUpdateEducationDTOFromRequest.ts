import { UpdateEducationDTO } from '../../../application/DTOs/user/education.dto.FIX';
import { UpdateEducationRequestDto } from '../../DTOs/candidate/updateEducationRequestDTO';

export default function mapToUpdateEducationDTOFromRequest(
  requestDto: UpdateEducationRequestDto
): UpdateEducationDTO {
  return {
    _id: requestDto.id,
    educationStream: requestDto.educationStream,
    educationLevel: requestDto.educationLevel,
    institution: requestDto.institution,
    location: requestDto.location,
    isPresent: requestDto.isPresent,
    startYear: requestDto.startYear,
    endYear: requestDto.endYear,
  };
}
