import { inject, injectable } from 'tsyringe';
import ILoadUserMetaDataUsecase from '../../interfaces/usecases/user/ILoadUserMetaData.usecase.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { UserMetadataDto } from '../../DTOs/user/userMetaData.dto.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class LoadUserMetaData implements ILoadUserMetaDataUsecase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(userId: string): Promise<UserMetadataDto | null> {
    const user = await this._userRepo.findById(userId);

    if (user) {
      const dto = plainToInstance(UserMetadataDto, user);
      return dto;
    }

    return null;
  }
}
