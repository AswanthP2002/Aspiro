import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminBlockUserUsecase from '../../interfaces/usecases/admin/IAdminBlockUser.usecase.FIX';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export class AdminBlockUserUsecase implements IAdminBlockUserUsecase {
  constructor(@inject('IUserRepository') private _userRepoistory: IUserRepository) {}

  async execute(usrId: string): Promise<UserDto | null> {
    const result = await this._userRepoistory.update(usrId, { isBlocked: true });

    if (result) {
      return plainToInstance(UserDto, result);
    }
    return result;
  }
}
