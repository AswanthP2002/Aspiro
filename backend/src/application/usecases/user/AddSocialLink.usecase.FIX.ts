import SocialLinks from '../../../domain/entities/SocialLinks';
import AddSocialLinkDTO from '../../DTOs/user/socialLink.dto.FIX';
import IAddSocialLinkUsecase from '../../interfaces/usecases/user/IAddSocialLink.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class AddSocialLinkUseCase implements IAddSocialLinkUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(addSocialLinkDto: AddSocialLinkDTO): Promise<UserDto | null> {
    const { userId, domain, url } = addSocialLinkDto;
    const saveLink: SocialLinks = {
      domain: domain,
      url: url,
    };

    const result = await this._userRepo.addSocialLink(userId as string, saveLink);

    if (result) {
      const userDdo = plainToInstance(UserDto, result);
      return userDdo;
    }

    return null;
  }
}
