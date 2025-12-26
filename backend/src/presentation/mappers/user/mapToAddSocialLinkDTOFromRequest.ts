import AddSocialLinkDTO from '../../../application/DTOs/user/socialLink.dto.FIX';
import AddSocialLinkRequestDTO from '../../DTOs/user/addSocialLinkRequestDTO';

export default function mapToAddsocialLinkDTOFromRequest(
  requestDto: AddSocialLinkRequestDTO
): AddSocialLinkDTO {
  return {
    userId:requestDto.userId,
    domain: requestDto.domain,
    url: requestDto.url,
  };
}
