import { CreateEducationDTO } from '../../../application/DTOs/user/education.dto.FIX';
import AddEducationRequestDTO from '../../DTOs/candidate/addEducationRequestDTO';

export default function mapToCreateEducationDTOFromRequest(
  requestDto: AddEducationRequestDTO
): CreateEducationDTO {
  return {
    userId: requestDto.userId,
    educationStream: requestDto.educationStream,
    educationLevel: requestDto.educationLevel,
    institution: requestDto.institution,
    location: requestDto.location,
    isPresent: requestDto.isPresent,
    startYear: requestDto.startYear,
    endYear: requestDto.endYear,
  };
}
