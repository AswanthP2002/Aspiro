import { inject, injectable } from 'tsyringe';
import { RemoveSocialLinkDTO } from '../../DTOs/user/socialLink.dto';
import IDeleteSocialLinkUseCase from '../../interfaces/usecases/user/IDeleteSocialLink.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserDTO from '../../DTOs/user/user.dto';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';

@injectable()
export default class DeleteSocialLinkUseCase implements IDeleteSocialLinkUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<UserDTO | null> {
    const { userId, domain } = removeSocialLinkDto;
    const result = await this._userRepo.removeSocialLink(userId as string, domain)
  
    if(result){
      const dto = mapUserToUserDTO(result)
      return dto
    }

    return null
  }
}
