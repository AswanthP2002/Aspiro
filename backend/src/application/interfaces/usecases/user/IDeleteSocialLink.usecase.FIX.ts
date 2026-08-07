import { RemoveSocialLinkDTO } from '../../../DTOs/user/socialLink.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IDeleteSocialLinkUseCase {
  execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<UserDTO | null>;
}
