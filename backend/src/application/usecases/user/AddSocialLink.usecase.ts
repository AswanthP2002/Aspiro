import SocialLinks from '../../../domain/entities/SocialLinks';
import AddSocialLinkDTO from '../../DTOs/user/socialLink.dto';
import IAddSocialLinkUsecase from '../../interfaces/usecases/user/IAddSocialLink.usecase';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserDTO from '../../DTOs/user/user.dto';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';

@injectable()
export default class AddSocialLinkUseCase implements IAddSocialLinkUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}
  
  async execute(addSocialLinkDto: AddSocialLinkDTO): Promise<UserDTO | null> {
    const { userId, domain, url } = addSocialLinkDto;
    const saveLink: SocialLinks = {
      domain: domain,
      url: url,
    };

   const result = await this._userRepo.addSocialLink(userId as string, saveLink)

   if(result){
    const userDdo = mapUserToUserDTO(result)
    return userDdo
   }

   return null
  }
}
