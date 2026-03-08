import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminUnblockUserUsecase from '../../interfaces/usecases/admin/IAdminUnblockUser.usecase.FIX';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export class AdminUnblockUserUsecase implements IAdminUnblockUserUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserDto | null> {
    const result = await this._userRepository.update(userId, { isBlocked: false });

    if (result) {
      return plainToInstance(UserDto, result);
    }
    return result;
  }
}
