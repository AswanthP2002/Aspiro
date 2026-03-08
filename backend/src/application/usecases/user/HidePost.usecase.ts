import { inject, injectable } from 'tsyringe';
import { IHidePostUsecase } from '../../interfaces/usecases/user/IHidePost.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UserDTO from '../../DTOs/user/user.dto.FIX';

@injectable()
export default class HidePostUsecase implements IHidePostUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}

  async execute(userId: string, postId: string): Promise<UserDTO | null> {
    console.log('hiden request reached inside the usecase', userId, postId)
    const result = await this._userRepository.addToHiddenPost(userId, postId);

    if (result) {
      return result as UserDTO;
    }

    return null;
  }
}
