import CandidateDTO from '../../../DTOs/candidate -LEGACY/candidate.dto';
import AddSocialLinkDTO from '../../../DTOs/candidate -LEGACY/socialLink.dto';

export default interface IAddSocialLinkUsecase {
  execute(addSocialLinkDto: AddSocialLinkDTO): Promise<CandidateDTO | null>;
}
