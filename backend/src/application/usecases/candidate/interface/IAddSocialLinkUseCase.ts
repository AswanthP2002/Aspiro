import CandidateDTO from "../../../DTOs/candidate/candidateDTO";
import AddSocialLinkDTO from "../../../DTOs/candidate/socialLinkDTO";

export default interface IAddSocialLinkUsecase {
    execute(addSocialLinkDto : AddSocialLinkDTO) : Promise<CandidateDTO | null>
}