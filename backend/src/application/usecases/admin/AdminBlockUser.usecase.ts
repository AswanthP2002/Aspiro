import { inject, injectable } from 'tsyringe';
import IBlockCandidateUseCase from '../../interfaces/usecases/admin/IAdminBlockUser.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IAdminBlockUserUsecase from '../../interfaces/usecases/admin/IAdminBlockUser.usecase';
import UserDTO from '../../DTOs/user/user.dto';

@injectable()
export class AdminBlockUserUsecase implements IAdminBlockUserUsecase {
  constructor(@inject("IUserRepository") private _userRepoistory : IUserRepository) {}

  async execute(usrId: string): Promise<UserDTO | null> {
    const result = await this._userRepoistory.update(usrId, {isBlocked:true})
    return result;
  }
}
