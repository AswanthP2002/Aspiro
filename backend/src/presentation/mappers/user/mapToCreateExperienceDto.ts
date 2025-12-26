import CreateExperienceDTO from '../../../application/DTOs/user/experience.dto.FIX';
import addExperienceRequestDTO from '../../DTOs/candidate/addExperienceRequestDTO';

export default function MapToAddExperienceDTO(
  requestDto: addExperienceRequestDTO
): CreateExperienceDTO {
  return {
    userId: requestDto.userId,
    jobRole: requestDto.jobRole,
    organization: requestDto.organization,
    jobType: requestDto.jobType,
    location: requestDto.location,
    workMode: requestDto.workMode,
    isPresent: requestDto.isPresent,
    startDate: requestDto.startDate,
    endDate: requestDto.endDate,
  };
}
