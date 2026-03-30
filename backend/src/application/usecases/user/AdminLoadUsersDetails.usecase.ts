import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminLoadUserDetailsUsecase from '../../interfaces/usecases/user/IAdminLoadUsersDetails.usecase';
import { AdminUserDetailsDTO } from '../../DTOs/user/userProfileAggregated.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export class AdminLoadUsersDetailsUsecase implements IAdminLoadUserDetailsUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(userId: string): Promise<AdminUserDetailsDTO | null> {
    const result = await this._userRepo.getUserAggregatedProfile(userId);

    if (result) {
      const dto = this._mapper.userProfileAggregatedToAdminUserDetailsDTO(result);
      return dto;
    }

    return null;
  }
}
