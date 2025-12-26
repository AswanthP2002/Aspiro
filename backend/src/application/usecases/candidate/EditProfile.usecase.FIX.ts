import { inject, injectable } from 'tsyringe';
import IEditProfileUseCase from '../../interfaces/usecases/user/IEditProfile.usecase.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto.FIX';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class EditProfileUseCase implements IEditProfileUseCase {
  private _mapper: UserMapper;
  constructor(@inject('IUserRepository') private userRepo: IUserRepository) {
    this._mapper = new UserMapper();
  }

  async execute(editUserDto: UpdateUserDTO): Promise<UserDto | null> {
    const updatedUser = this._mapper.updateDtoToUser(editUserDto);

    const result = await this.userRepo.update(updatedUser._id as string, updatedUser);

    if (result) {
      const userDto = plainToInstance(UserDto, result);
      return userDto;
    }
    return null;
  }
}
