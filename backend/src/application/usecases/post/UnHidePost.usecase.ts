import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import { IUnHidePostUsecase } from '../../interfaces/usecases/user/IUnHidePost.usecase';

@injectable()
export default class UnHidePostUsecase implements IUnHidePostUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}

  async execute(userId: string, postId: string): Promise<UserDTO | null> {
    const result = await this._userRepository.removeFromHiddenPost(userId, postId);

    if (result) {
      return result as UserDTO;
    }

    return null;
  }
}
