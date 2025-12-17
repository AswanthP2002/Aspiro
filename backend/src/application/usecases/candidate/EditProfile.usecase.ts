import { inject, injectable } from 'tsyringe';
import IEditProfileUseCase from './interface/IEditProfile.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto';
import UserDTO from '../../DTOs/user/user.dto';
import mapUpdateUserDtoToUser from '../../mappers/user/mapUpdateUserDtoToUser.refactored.mapper';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';

@injectable()
export default class EditProfileUseCase implements IEditProfileUseCase {
  constructor(@inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(editUserDto: UpdateUserDTO): Promise<UserDTO | null> {
    const updatedUser = mapUpdateUserDtoToUser(editUserDto)

    const result = await this.userRepo.update(updatedUser._id as string, updatedUser)

    if (result) {
      const userDto = mapUserToUserDTO(result)
    }
    return null;
  }
}
