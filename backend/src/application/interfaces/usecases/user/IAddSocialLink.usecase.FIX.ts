import AddSocialLinkDTO from '../../../DTOs/user/socialLink.dto.FIX';
import UserDTO, { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IAddSocialLinkUsecase {
  execute(addSocialLinkDto: AddSocialLinkDTO): Promise<UserDto | null>;
}
