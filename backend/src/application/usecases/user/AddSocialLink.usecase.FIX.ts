import SocialLinks from '../../../domain/entities/user/SocialLinks';
import AddSocialLinkDTO from '../../DTOs/user/socialLink.dto.FIX';
import IAddSocialLinkUsecase from '../../interfaces/usecases/user/IAddSocialLink.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class AddSocialLinkUseCase implements IAddSocialLinkUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(addSocialLinkDto: AddSocialLinkDTO): Promise<UserDTO | null> {
    const { userId, domain, url } = addSocialLinkDto;
    const saveLink: SocialLinks = {
      domain: domain,
      url: url,
    };

    const result = await this._userRepo.addSocialLink(userId as string, saveLink);

    if (result) {
      const userDdo = this._mapper.userToUserDto(result);
      return userDdo;
    }

    return null;
  }
}
