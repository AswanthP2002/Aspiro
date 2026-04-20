import { inject, injectable } from 'tsyringe';
import IUpdateProfileViewUsecase from '../../interfaces/usecases/user/IUpdateProfileView.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import UpdateProfileViewDTO from '../../DTOs/user/updateProfileView.dto';

@injectable()
export default class UpdateProfileViewUsecase implements IUpdateProfileViewUsecase {
  constructor(@inject('IUserRepository') private _repo: IUserRepository) {}

  async execute(dto: UpdateProfileViewDTO): Promise<{ _id: string; views: string[] } | null> {
    const { viewerId, profileId } = dto;
    const result = await this._repo.updateProfileView(viewerId, profileId);
    return result;
  }
}
