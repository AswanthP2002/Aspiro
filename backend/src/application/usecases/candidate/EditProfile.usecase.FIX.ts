import { inject, injectable } from 'tsyringe';
import IEditProfileUseCase from '../../interfaces/usecases/user/IEditProfile.usecase.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { UpdataeUserDto } from '../../DTOs/user/updateUser.dto.FIX';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class EditProfileUseCase implements IEditProfileUseCase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(editUserDto: UpdataeUserDto): Promise<UserDTO | null> {
    const updatedUser = this._mapper.updateDtoToUser(editUserDto);

    const result = await this._userRepo.update(updatedUser._id as string, updatedUser);

    if (result) {
      const userDto = this._mapper.userToUserDto(result);
      return userDto;
    }
    return null;
  }
}
