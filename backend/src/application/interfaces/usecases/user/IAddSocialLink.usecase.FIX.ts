import AddSocialLinkDTO from '../../../DTOs/user/socialLink.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IAddSocialLinkUsecase {
  execute(addSocialLinkDto: AddSocialLinkDTO): Promise<UserDTO | null>;
}
