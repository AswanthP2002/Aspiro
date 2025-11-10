import { inject, injectable } from 'tsyringe';
import IUnblockCandidateUseCase from '../../interfaces/usecases/admin/IAdminUnblockUser.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminUnblockUserUsecase from '../../interfaces/usecases/admin/IAdminUnblockUser.usecase';
import UserDTO from '../../DTOs/user/user.dto';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';

@injectable()
export class AdminUnblockUserUsecase implements IAdminUnblockUserUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<UserDTO | null> {
    const result = await this._userRepository.update(userId, {isBlocked:false})

    if(result){
      const userDto = mapUserToUserDTO(result)
      return userDto
    }
    return result;
  }
}
