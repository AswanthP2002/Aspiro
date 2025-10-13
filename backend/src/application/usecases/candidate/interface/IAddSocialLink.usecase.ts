import CandidateDTO from '../../../DTOs/candidate/candidate.dto';
import AddSocialLinkDTO from '../../../DTOs/candidate/socialLink.dto';

export default interface IAddSocialLinkUsecase {
  execute(addSocialLinkDto: AddSocialLinkDTO): Promise<CandidateDTO | null>;
}
