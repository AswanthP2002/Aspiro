import { RemoveSocialLinkDTO } from '../../../DTOs/candidate -LEGACY/socialLink.dto';

export default interface IDeleteSocialLinkUseCase {
  execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<void>;
}
