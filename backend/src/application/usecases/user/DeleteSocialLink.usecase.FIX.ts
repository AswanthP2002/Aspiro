import { inject, injectable } from 'tsyringe';
import { RemoveSocialLinkDTO } from '../../DTOs/user/socialLink.dto.FIX';
import IDeleteSocialLinkUseCase from '../../interfaces/usecases/user/IDeleteSocialLink.usecase.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class DeleteSocialLinkUseCase implements IDeleteSocialLinkUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<UserDto | null> {
    const { userId, domain } = removeSocialLinkDto;
    const result = await this._userRepo.removeSocialLink(userId as string, domain);

    if (result) {
      const dto = plainToInstance(UserDto, result);
      return dto;
    }

    return null;
  }
}
