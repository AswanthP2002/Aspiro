import { inject, injectable } from 'tsyringe';
import ILoadUserMetaDataUsecase from '../../interfaces/usecases/user/ILoadUserMetaData.usecase.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserMetaDataDTO from '../../DTOs/user/userMetaData.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class LoadUserMetaDataUsecase implements ILoadUserMetaDataUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(userId: string): Promise<UserMetaDataDTO | null> {
    //console.log('--checking userId inside usecase--', userId);
    const user = await this._userRepo.getUserMetaData(userId);
    console.log('--Checking user metadata before mapping--', user);

    if (user) {
      const dto = this._mapper.userToUserMetaDataDTO(user);
      return dto;
    }

    return null;
  }
}
