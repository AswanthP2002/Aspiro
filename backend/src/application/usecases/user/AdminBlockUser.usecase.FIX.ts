import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminBlockUserUsecase from '../../interfaces/usecases/user/IAdminBlockUser.usecase.FIX';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';

@injectable()
export class AdminBlockUserUsecase implements IAdminBlockUserUsecase {
  constructor(
    @inject('IUserRepository') private _userRepoistory: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(usrId: string): Promise<UserDTO | null> {
    const result = await this._userRepoistory.update(usrId, { isBlocked: true });

    if (result) {
      await this._userRepoistory.updateAccountAction(usrId, {
        action: 'Blocked',
        actor: 'Admin',
        date: new Date(),
      });
      return this._mapper.userToUserDto(result);
    }
    return result;
  }
}
