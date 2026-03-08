import { MyProfileDTO } from '../../DTOs/user/user.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserMapper from '../../mappers/user/User.mapperClass';
import ILoadMyProfileUsecase from '../../interfaces/usecases/user/ILoadMyProfile.usecase.FIX';

@injectable()
export class LoadMyProfileUsecase implements ILoadMyProfileUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(id: string): Promise<MyProfileDTO | null> {
    const userDetails = await this._userRepo.findByUserId(id);
    console.log('-- what i got from the database--', userDetails);
    if (userDetails) {
      const userDto = this._mapper.myProfileAggregatedToDTO(userDetails);
      console.log('-- what im going to send the frontend--', userDto);
      return userDto;
    }

    return null;
  }
}
