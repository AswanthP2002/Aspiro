import { inject, injectable } from 'tsyringe';
import IAdminPermanentBanUserUsecase from '../../interfaces/usecases/user/IAdminPermanentBanUser.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserMapper from '../../mappers/user/User.mapperClass';
import UserDTO from '../../DTOs/user/user.dto.FIX';

@injectable()
export default class AdminPermanentBanUserUsecase implements IAdminPermanentBanUserUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(userId: string): Promise<UserDTO | null> {
    const updatedUser = await this._userRepo.update(userId, { isBanned: true });
    if (updatedUser) {
      await this._userRepo.updateAccountAction(userId, {
        action: 'Permanent Ban',
        actor: 'Admin',
        date: new Date(),
      });
      const userDto = this._mapper.userToUserDto(updatedUser);
      return userDto;
    }

    return null;
  }
}
