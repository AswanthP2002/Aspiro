import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { UpdataeUserDto } from '../../DTOs/user/updateUser.dto.FIX';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import { inject, injectable } from 'tsyringe';
import ISaveUserBasicsUsecase from '../../interfaces/usecases/user/ISaveUsersBasics.usecase.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export default class SaveUserBasicsUsecase implements ISaveUserBasicsUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(updateUserDto: UpdataeUserDto): Promise<UserDTO | null> {
    const updateData = this._mapper.updateDtoToUser(updateUserDto);
    const result = await this._userRepository.update(updateUserDto._id as string, updateData);

    if (result) {
      const dto = this._mapper.userToUserDto(result);
      return dto;
    }
    return null;
  }
}
