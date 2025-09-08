import AddSocialLinkDTO from "../../../application/DTOs/candidate/socialLinkDTO";
import AddSocialLinkRequestDTO from "../../DTOs/candidate/addSocialLinkRequestDTO";

export default function mapToAddsocialLinkDTOFromRequest(requestDto : AddSocialLinkRequestDTO) : AddSocialLinkDTO {
    return {
        candidateId:requestDto.candidateId,
        domain:requestDto.domain,
        url:requestDto.url
    }
}