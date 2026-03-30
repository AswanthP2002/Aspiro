import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminUnblockUserUsecase from '../../interfaces/usecases/user/IAdminUnblockUser.usecase.FIX';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export class AdminUnblockUserUsecase implements IAdminUnblockUserUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(userId: string): Promise<UserDTO | null> {
    const result = await this._userRepository.update(userId, { isBlocked: false });

    if (result) {
      await this._userRepository.updateAccountAction(userId, {
        action: 'Un blocked',
        actor: 'Admin',
        date: new Date(),
      });
      return this._mapper.userToUserDto(result);
    }
    return result;
  }
}
