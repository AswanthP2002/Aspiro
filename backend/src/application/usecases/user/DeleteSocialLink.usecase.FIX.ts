import { inject, injectable } from 'tsyringe';
import { RemoveSocialLinkDTO } from '../../DTOs/user/socialLink.dto.FIX';
import IDeleteSocialLinkUseCase from '../../interfaces/usecases/user/IDeleteSocialLink.usecase.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class DeleteSocialLinkUseCase implements IDeleteSocialLinkUseCase {
  private _mapper: UserMapper;
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {
    this._mapper = new UserMapper();
  }

  async execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<UserDTO | null> {
    const { userId, domain } = removeSocialLinkDto;
    const result = await this._userRepo.removeSocialLink(userId as string, domain);

    if (result) {
      const dto = this._mapper.userToUserDto(result);
      return dto;
    }

    return null;
  }
}
