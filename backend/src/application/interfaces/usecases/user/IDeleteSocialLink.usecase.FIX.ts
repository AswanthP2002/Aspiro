import { RemoveSocialLinkDTO } from '../../../DTOs/user/socialLink.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IDeleteSocialLinkUseCase {
  execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<UserDTO | null>;
}
