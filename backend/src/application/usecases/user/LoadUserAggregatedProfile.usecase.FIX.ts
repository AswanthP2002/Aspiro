import { inject, injectable } from 'tsyringe';
import ILoadUserAggregatedProfileUsecase from '../../interfaces/usecases/user/ILoadUserAggregatedProfile.usecase.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserProfileAggregatedDTO from '../../DTOs/user/userProfileAggregated.dto.FIX';
import mapToUserProfileAggregatedDTO from '../../mappers/admin/mapToUserProfileAggregatedAdminDTO';
import Follow from '../../../domain/entities/follow.entity';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class LoadUserAggregatedProfileUsecase implements ILoadUserAggregatedProfileUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(userId: string): Promise<UserProfileAggregatedDTO | null> {
    const userProfileDetails = await this._userRepo.getUserAggregatedProfile(userId);

    if (userProfileDetails) {
      const dto = plainToInstance(UserProfileAggregatedDTO, userProfileDetails);

      //format followers (instead of follow object, make them as string of object id array)
      //   const followers: string[] = [];
      //   dto.followers.forEach((follower: Follow) => {
      //     followers.push(follower);
      //   });

      //   dto.followers = followers;
      return dto;
    }

    return null;
  }
}
