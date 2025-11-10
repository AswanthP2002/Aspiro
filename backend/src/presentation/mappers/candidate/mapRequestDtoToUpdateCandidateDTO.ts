import UpdateCandidateDTO from '../../../application/DTOs/candidate -LEGACY/updateCandidate.dto';
import SaveBasicsRequestDTO from '../../DTOs/candidate/saveBasicsRequest.dto';
import UpdateCandidateRequestDTO from '../../DTOs/candidate/updateCandidateRequest.dto';

export default function mapRequestDtoToUpdateCandidateDTO(
  requestDto: SaveBasicsRequestDTO
): UpdateCandidateDTO {
  return {
    _id: requestDto.id,
    about: requestDto.about,
    jobTitle: requestDto.role,
    location: {
      city: requestDto.city,
      country: requestDto.country,
      district: requestDto.district,
      pincode: requestDto.pincode,
      state: requestDto.state,
    },
  };
}
