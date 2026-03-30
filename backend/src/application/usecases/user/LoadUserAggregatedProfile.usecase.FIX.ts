import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { UserPublicProfileDTO } from '../../DTOs/user/userProfileAggregated.dto.FIX';
import ILoadUserPublicProfileUsecase from '../../interfaces/usecases/user/ILoadUserAggregatedProfile.usecase.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class LoadUserpublicProfileUsecase implements ILoadUserPublicProfileUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(userId: string): Promise<UserPublicProfileDTO | null> {
    const userProfileDetails = await this._userRepo.getUserAggregatedProfile(userId);

    if (userProfileDetails) {
      const dto = this._mapper.userAggregatedToPublicProfileDTO(userProfileDetails);
      return dto;
    }

    return null;
  }
}
