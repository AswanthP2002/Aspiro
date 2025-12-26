import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { UpdataeUserDto } from '../../DTOs/user/updateUser.dto.FIX';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { inject, injectable } from 'tsyringe';
import mapUpdateUserDtoToUser from '../../mappers/user/mapUpdateUserDtoToUser.refactored.mapper';
import ISaveUserBasicsUsecase from '../../interfaces/usecases/user/ISaveUsersBasics.usecase.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class SaveUserBasicsUsecase implements ISaveUserBasicsUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}

  async execute(updateUserDto: UpdataeUserDto): Promise<UserDto | null> {
    const updateData = mapUpdateUserDtoToUser(updateUserDto);
    const result = await this._userRepository.update(updateUserDto._id as string, updateData);

    if (result) {
      const dto = plainToInstance(UserDto, result);
      return dto;
    }
    return null;
  }
}
