import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminLoadUserDetailsUsecase from '../../interfaces/usecases/admin/IAdminLoadUsersDetails.usecase';
import userProfileAggregatedAdminDTO from '../../DTOs/userProfileAggregatedDTO';
import mapToUserProfileAggregatedAdminDTO from '../../mappers/admin/mapToUserProfileAggregatedAdminDTO';

@injectable()
export class AdminLoadUsersDetailsUsecase implements IAdminLoadUserDetailsUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(userId: string): Promise<userProfileAggregatedAdminDTO | null> {
    const result = await this._userRepo.getUserAggregatedProfile(userId)

    if (result) {
      const dto = mapToUserProfileAggregatedAdminDTO(result)
      return dto;
    }

    return null;
  }
}
