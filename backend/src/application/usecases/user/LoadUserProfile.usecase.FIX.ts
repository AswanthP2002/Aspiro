import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import ILoadUserProfileUsecase from '../../interfaces/usecases/user/ILoadUserProfile.usecase.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export class LoadUserProfileUsecase implements ILoadUserProfileUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(id: string): Promise<UserDto | null> {
    const userDetails = await this._userRepo.findById(id);

    if (userDetails) {
      const userDto = plainToInstance(UserDto, userDetails);
      return userDto;
    }

    return null;
  }
}
