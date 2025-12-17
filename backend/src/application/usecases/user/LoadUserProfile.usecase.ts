import UserDTO from '../../DTOs/user/user.dto';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import ILoadUserProfileUsecase from '../../interfaces/usecases/user/ILoadUserProfile.usecase';

@injectable()
export class LoadUserProfileUsecase implements ILoadUserProfileUsecase {
  constructor(@inject('IUserRepository') private _userRepo : IUserRepository) {}

  async execute(id: string): Promise<UserDTO | null> {
    const userDetails = await this._userRepo.findById(id);

    if(userDetails){
      const userDto = mapUserToUserDTO(userDetails)
      return userDto
    }

    return null

  }
}
