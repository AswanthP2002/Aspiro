import { RemoveSocialLinkDTO } from '../../../DTOs/candidate/socialLink.dto';

export default interface IDeleteSocialLinkUseCase {
  execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<void>;
}
