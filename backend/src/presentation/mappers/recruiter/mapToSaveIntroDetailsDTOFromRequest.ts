import SaveIntroDetailsDTO from '../../../application/DTOs/recruiter/saveIntroDetails.dto';
import SaveIntroDetailsRequestDTO from '../../DTOs/recruiter/saveIntroDetailsRequestDTO';

export default function mapToSaveIntroDetailsDTOFromRequest(
  requestDto: SaveIntroDetailsRequestDTO
): SaveIntroDetailsDTO {
  return {
    id: requestDto.id,
    about: requestDto.about,
    benefits: requestDto.benefits,
    city: requestDto.city,
    state: requestDto.state,
    country: requestDto.country,
    companyName: requestDto.companyName,
    industryType: requestDto.industryType,
    companyType: requestDto.companyType,
    mobile: requestDto.mobile,
    teamStrength: requestDto.teamStrength,
    vision: requestDto.vision,
    website: requestDto.website,
    yearOfEstablishment: requestDto.yearOfEstablishment,
  };
}
