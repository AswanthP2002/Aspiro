import AddSocialLinkDTO from '../../../DTOs/user/socialLink.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IAddSocialLinkUsecase {
  execute(addSocialLinkDto: AddSocialLinkDTO): Promise<UserDTO | null>;
}
